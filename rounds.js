/*
 * TNC Rounds — production engine.
 *
 * Backend-driven version of the prototype:
 *   - Scenario list comes from GET /api/rounds/scenarios (tier-gated server-side)
 *   - Full scenario_data fetched lazily on play via /api/rounds/scenarios/:id
 *   - Session result POSTed to /api/rounds/sessions on commit-submit, and
 *     the SERVER'S score (not the client's) drives the debrief — so a
 *     tampered client can't fake stars
 *   - Standard tier is one-shot per UTC day; the played-today notice
 *     shows their existing result instead of letting them replay
 *   - AI-Powered tier plays the full library, unlimited replays
 *
 * Auth + token refresh go through window.apiCall (api-service.js).
 */
(function () {
    'use strict';

    var NAME_STORAGE_KEY = 'roundsNurseName';
    var CATEGORY_ORDER = ['history', 'symptoms', 'exam', 'obstetric', 'peds', 'associated'];

    // ── State ──────────────────────────────────────────────
    var state = {
        scenario: null,            // full scenario object (with scenario_data merged in for game use)
        scenarioMeta: null,        // {id, title, is_daily, played_today, today_result, ...}
        scenarios: [],             // metadata list from /scenarios
        tier: null,                // 'ai-powered' | 'standard' | null
        dailyId: null,
        asked: [],
        activeTab: null,
        commitCondition: null,
        commitAction: null,
        pendingScenarioId: null,   // queued when name modal interrupts a start
        nurseName: '',
        serverResult: null         // populated when server scores the session
    };


    // ── Helpers ───────────────────────────────────────────
    function _escape(s) {
        if (s == null) return '';
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function $(id) { return document.getElementById(id); }

    function showError(msg) {
        var slot = $('error-slot');
        if (!slot) return;
        slot.innerHTML =
            '<div class="rounds-error">' +
                '<i class="fas fa-circle-exclamation"></i>' +
                '<span>' + _escape(msg) + '</span>' +
            '</div>';
    }
    function clearError() {
        var slot = $('error-slot');
        if (slot) slot.innerHTML = '';
    }

    function categoriesIn(scenario) {
        var seen = {};
        scenario.questions.forEach(function (q) { seen[q.category] = true; });
        var ordered = [];
        CATEGORY_ORDER.forEach(function (c) { if (seen[c]) ordered.push(c); });
        Object.keys(seen).forEach(function (c) {
            if (ordered.indexOf(c) === -1) ordered.push(c);
        });
        return ordered;
    }
    function questionsByCategory(scenario, cat) {
        return scenario.questions.filter(function (q) { return q.category === cat; });
    }
    function findQuestion(qid) {
        return state.scenario.questions.filter(function (q) { return q.id === qid; })[0];
    }


    // ── Screen routing ─────────────────────────────────────
    var SCREEN_OUT_MS = 220;
    function show(screenId) {
        var target = $(screenId);
        if (!target) return;
        var current = document.querySelector('.rounds-screen.active');
        if (current === target) return;

        var playing = (screenId === 'screen-play');
        document.body.classList.toggle('is-playing', playing);
        document.body.classList.toggle('has-sticky-ask', playing);

        if (current) {
            current.classList.add('is-leaving');
            setTimeout(function () {
                current.classList.remove('active', 'is-leaving');
                target.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'instant' });
            }, SCREEN_OUT_MS);
        } else {
            target.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
    }
    function isMobileLayout() { return window.innerWidth <= 980; }


    // ── Identity / nurse name ─────────────────────────────
    //
    // Resolution order: profile first_name → cached localStorage → modal prompt.
    // The profile fetch is also our "is the user authenticated" probe.
    function loadName() {
        try {
            var cached = localStorage.getItem(NAME_STORAGE_KEY) || '';
            state.nurseName = cached.trim();
        } catch (e) { state.nurseName = ''; }
        renderNurseBadge();

        if (!window.isAuthenticated || !window.isAuthenticated()) return Promise.resolve(null);

        return window.apiCall('/api/user/profile').then(function (data) {
            var first = data && data.user && data.user.first_name;
            if (first && typeof first === 'string' && first.trim()) {
                saveName(first.trim());
            }
            return data && data.user;
        }).catch(function () {
            // anonymous, expired, or transient — fine, fall back to cache / modal
            return null;
        });
    }
    function saveName(name) {
        var trimmed = (name || '').trim().slice(0, 24);
        if (!trimmed) return;
        state.nurseName = trimmed;
        try { localStorage.setItem(NAME_STORAGE_KEY, trimmed); } catch (e) {}
        renderNurseBadge();
    }
    function renderNurseBadge() {
        var badge = $('nurse-badge');
        var nameSpan = $('nurse-badge-name');
        if (!badge || !nameSpan) return;
        if (state.nurseName) {
            badge.hidden = false;
            nameSpan.textContent = state.nurseName;
        } else {
            badge.hidden = true;
        }
    }
    function openNameModal() {
        var modal = $('name-modal');
        var input = $('name-input');
        if (!modal) return;
        input.value = state.nurseName || '';
        modal.hidden = false;
        setTimeout(function () { input.focus(); input.select(); }, 80);
    }
    function closeNameModal() {
        var modal = $('name-modal');
        if (modal) modal.hidden = true;
    }
    function handleNameSave(e) {
        if (e) e.preventDefault();
        var input = $('name-input');
        var name = (input && input.value || '').trim();
        if (!name) return;
        saveName(name);
        closeNameModal();
        if (state.pendingScenarioId) {
            var id = state.pendingScenarioId;
            state.pendingScenarioId = null;
            startScenario(id);
        }
    }


    // ── Tier badge + gates ────────────────────────────────
    function renderTierBadge() {
        var badge = $('tier-badge');
        if (!badge) return;
        if (state.tier === 'ai-powered') {
            badge.hidden = false;
            badge.textContent = 'AI-Powered · Unlimited';
        } else if (state.tier === 'standard') {
            badge.hidden = false;
            badge.textContent = 'Standard · 1 free / day';
        } else {
            badge.hidden = true;
        }
    }

    function renderGate(reason) {
        var slot = $('gate-slot');
        var cards = $('scenario-cards');
        if (!slot) return;

        var iconHtml = '<div class="rounds-gate-icon"><i class="fas fa-' +
            (reason === 'signed-out' ? 'arrow-right-to-bracket' : 'lock') + '"></i></div>';

        var html;
        if (reason === 'signed-out') {
            html =
                '<div class="rounds-gate">' +
                    iconHtml +
                    '<h2>Sign in to play Rounds</h2>' +
                    '<p>Rounds is part of your Nursing Collective subscription. Sign in to play today\'s free scenario.</p>' +
                    '<div class="rounds-gate-actions">' +
                        '<a class="rounds-gate-btn primary" href="login.html?next=rounds.html">Sign in <i class="fas fa-arrow-right"></i></a>' +
                        '<a class="rounds-gate-btn ghost" href="pricing.html">See plans</a>' +
                    '</div>' +
                '</div>';
        } else {
            html =
                '<div class="rounds-gate">' +
                    iconHtml +
                    '<h2>Subscribe to play Rounds</h2>' +
                    '<p>Rounds is included with every paid plan. Standard gets today\'s free scenario every day. AI-Powered unlocks the full library with unlimited replays.</p>' +
                    '<div class="rounds-gate-actions">' +
                        '<a class="rounds-gate-btn primary" href="pricing.html">See pricing <i class="fas fa-arrow-right"></i></a>' +
                        '<a class="rounds-gate-btn ghost" href="dashboard.html">Back to dashboard</a>' +
                    '</div>' +
                '</div>';
        }
        slot.innerHTML = html;
        if (cards) cards.innerHTML = '';  // hide the loading state
    }

    function clearGate() {
        var slot = $('gate-slot');
        if (slot) slot.innerHTML = '';
    }


    // ── Played-today notice (Standard tier) ───────────────
    function renderPlayedToday(dailyMeta, result) {
        var slot = $('played-today-slot');
        if (!slot) return;
        if (!result) { slot.innerHTML = ''; return; }

        var stars = '';
        for (var i = 0; i < 3; i++) {
            stars += '<i class="fas fa-star ' + (i < (result.stars || 0) ? 'on' : 'off') + '"></i>';
        }
        var ccChip = result.condition_correct ? 'Right call' : 'Wrong call';
        var acChip = result.action_correct ? 'Right action' : 'Wrong action';

        var html =
            '<div class="played-today-card">' +
                '<h4><i class="fas fa-circle-check"></i> You played today\'s scenario</h4>' +
                '<p><strong>' + _escape(dailyMeta.title) + '</strong> · ' +
                    '<span class="played-today-stars">' + stars + '</span>' +
                    _escape(ccChip) + ' · ' + _escape(acChip) +
                    (result.efficiency_pct != null ? ' · ' + result.efficiency_pct + '% efficient' : '') +
                '</p>' +
                '<p>Come back tomorrow for a new scenario' +
                    (state.tier === 'standard' ? ', or upgrade to AI-Powered for unlimited replays.' : '.') +
                '</p>' +
                '<a class="replay-cta" href="#" data-action="view-debrief">' +
                    'View today\'s debrief <i class="fas fa-arrow-right"></i>' +
                '</a>' +
            '</div>';
        slot.innerHTML = html;

        var link = slot.querySelector('[data-action="view-debrief"]');
        if (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                viewPlayedDebrief(dailyMeta.id);
            });
        }
    }


    // ── Scenario list rendering ───────────────────────────
    function renderScenarioCards() {
        var container = $('scenario-cards');
        if (!container) return;
        container.innerHTML = '';

        if (!state.scenarios.length) {
            container.innerHTML =
                '<div class="rounds-loading"><i class="fas fa-clipboard-list"></i><span>No scenarios available yet — check back soon.</span></div>';
            return;
        }

        state.scenarios.forEach(function (s) {
            var card = document.createElement('button');
            card.type = 'button';
            card.className = 'scenario-card' + (s.unlocked ? '' : ' locked');
            card.setAttribute('data-scenario-id', s.id);

            var badgeHtml = '';
            if (s.is_daily && s.unlocked) {
                badgeHtml = '<span class="daily-badge"><i class="fas fa-bolt"></i> Today</span>';
            } else if (!s.unlocked) {
                badgeHtml = '<span class="lock-badge"><i class="fas fa-lock"></i> AI-Powered</span>';
            }

            card.innerHTML =
                badgeHtml +
                '<div class="scenario-meta">' +
                    '<span>' + _escape(s.specialty || '') + '</span>' +
                    (s.difficulty ? '<span class="dot">·</span><span class="scenario-pill diff-' + _escape((s.difficulty || '').toLowerCase()) + '">' + _escape(s.difficulty) + '</span>' : '') +
                '</div>' +
                '<div class="scenario-title">' + _escape(s.title) + '</div>' +
                '<div class="scenario-blurb">' + _escape(s.blurb || '') + '</div>' +
                '<div class="scenario-cta">' +
                    (s.unlocked ? 'Start <i class="fas fa-arrow-right"></i>' : 'Locked <i class="fas fa-lock"></i>') +
                '</div>';

            if (s.unlocked) {
                card.addEventListener('click', function () {
                    if (!state.nurseName) {
                        state.pendingScenarioId = s.id;
                        openNameModal();
                        return;
                    }
                    startScenario(s.id);
                });
            }
            container.appendChild(card);
        });
    }


    // ── Bootstrap: fetch tier + scenarios on page load ────
    function bootstrap() {
        // Profile-fetch doubles as auth probe — wait for it before
        // deciding which gate (if any) to show.
        return loadName().then(function (profile) {
            if (!window.isAuthenticated || !window.isAuthenticated()) {
                renderGate('signed-out');
                return;
            }
            return window.apiCall('/api/rounds/scenarios').then(function (data) {
                state.tier = data.tier;
                state.dailyId = data.daily_scenario_id;
                state.scenarios = data.scenarios || [];
                renderTierBadge();

                if (!data.has_access) {
                    renderGate('no-subscription');
                    return;
                }

                clearGate();
                renderScenarioCards();

                // Standard tier: surface played-today notice for the daily scenario
                if (state.tier === 'standard' && state.dailyId) {
                    return window.apiCall('/api/rounds/daily').then(function (daily) {
                        if (daily && daily.daily && daily.played_today && daily.today_result) {
                            renderPlayedToday(daily.daily, daily.today_result);
                        }
                    }).catch(function () { /* non-blocking */ });
                }
            });
        }).catch(function (err) {
            console.error('Rounds bootstrap failed:', err);
            showError('Couldn\'t load Rounds right now. Refresh the page or try again in a minute.');
            var cards = $('scenario-cards');
            if (cards) cards.innerHTML = '';
        });
    }


    // ── Screen 2 · Play ────────────────────────────────────
    function startScenario(id) {
        var loading = $('scenario-cards');
        // Tiny inline feedback while we fetch
        if (loading) {
            var card = loading.querySelector('[data-scenario-id="' + id + '"]');
            if (card) {
                card.style.opacity = '0.5';
                card.style.pointerEvents = 'none';
            }
        }
        clearError();

        window.apiCall('/api/rounds/scenarios/' + encodeURIComponent(id)).then(function (data) {
            // The scenario_data is the full prototype-shape object —
            // merge top-level metadata into it so the rest of the engine
            // (which expects a single 'scenario' object) just works.
            var sd = data.scenario_data || {};
            sd.id = data.id;
            sd.title = data.title;
            sd.specialty = data.specialty;
            sd.difficulty = data.difficulty;
            sd.questionBudget = data.question_budget || sd.questionBudget;

            state.scenario = sd;
            state.scenarioMeta = data;
            state.asked = [];
            state.commitCondition = null;
            state.commitAction = null;
            state.serverResult = null;

            var cats = categoriesIn(sd);
            state.activeTab = cats[0] || null;

            renderPatient();
            renderTabs();
            renderQuestionPool();
            renderLog();
            updateCommitButton();
            updateBudgetCounter();
            show('screen-play');
        }).catch(function (err) {
            console.error('startScenario failed:', err);
            // Re-enable the card and surface the reason
            if (loading) {
                var c = loading.querySelector('[data-scenario-id="' + id + '"]');
                if (c) { c.style.opacity = ''; c.style.pointerEvents = ''; }
            }
            var msg = (err && err.message) || 'Could not start that scenario.';
            showError(msg);
        });
    }

    // View-only debrief for a session the user already played today
    // (Standard tier replay-block). We have the result chip values from
    // /api/rounds/daily; fetch the full scenario for the debrief content.
    function viewPlayedDebrief(scenarioId) {
        clearError();
        Promise.all([
            window.apiCall('/api/rounds/scenarios/' + encodeURIComponent(scenarioId)),
            window.apiCall('/api/rounds/sessions?limit=10')
        ]).then(function (results) {
            var sData = results[0];
            var sessions = (results[1] && results[1].sessions) || [];
            var lastForScenario = sessions.filter(function (s) { return s.scenario_id === scenarioId; })[0];
            if (!lastForScenario) {
                showError('No previous attempt found.');
                return;
            }

            var sd = sData.scenario_data || {};
            sd.id = sData.id;
            sd.title = sData.title;
            sd.specialty = sData.specialty;
            sd.difficulty = sData.difficulty;
            sd.questionBudget = sData.question_budget || sd.questionBudget;
            state.scenario = sd;
            state.scenarioMeta = sData;

            // Reconstruct enough state for renderDebrief to work.
            // We don't have asked_question_ids from /sessions list; degrade
            // gracefully — the verdict + cards still render from server result.
            state.asked = [];
            state.commitCondition = null;
            state.commitAction = null;
            state.serverResult = {
                stars: lastForScenario.stars,
                efficiency_pct: lastForScenario.efficiency_pct,
                high_yield_count: lastForScenario.high_yield_count,
                redherring_count: lastForScenario.redherring_count,
                condition_correct: lastForScenario.condition_correct,
                action_correct: lastForScenario.action_correct,
                view_only: true
            };
            renderDebrief();
            show('screen-debrief');
        }).catch(function (err) {
            console.error('viewPlayedDebrief failed:', err);
            showError('Could not load your previous attempt.');
        });
    }

    function renderPatient() {
        var s = state.scenario;
        var p = s.patient;

        function asList(arr, emptyText) {
            if (!arr || !arr.length) return '<div class="rail-empty">' + _escape(emptyText) + '</div>';
            return '<ul class="rail-list">' + arr.map(function (i) {
                return '<li>' + _escape(i) + '</li>';
            }).join('') + '</ul>';
        }
        function section(label, html, icon) {
            return '<div class="rail-section">' +
                       '<div class="rail-section-label">' +
                           (icon ? '<i class="fas ' + icon + '"></i>' : '') +
                           '<span>' + _escape(label) + '</span>' +
                       '</div>' + html +
                   '</div>';
        }

        var vitalsHtml = '<div class="rail-vitals">';
        if (p.vitals) {
            Object.keys(p.vitals).forEach(function (k) {
                vitalsHtml += '<div class="rail-vital">' +
                    '<span class="vital-label">' + _escape(k) + '</span>' +
                    '<span class="vital-value">' + _escape(p.vitals[k]) + '</span>' +
                    '</div>';
            });
        }
        vitalsHtml += '</div>';

        var allergiesText = p.allergies || 'NKDA';
        var allergyClass = (String(allergiesText).toUpperCase() === 'NKDA') ? '' : 'is-allergy';

        var optionalCtx = '';
        if (p.obHistory) {
            optionalCtx += section('OB History', '<div class="rail-body">' + _escape(p.obHistory) + '</div>', 'fa-baby');
        } else if (p.pediatricHistory) {
            optionalCtx += section('Pediatric History', '<div class="rail-body">' + _escape(p.pediatricHistory) + '</div>', 'fa-child');
        }
        var pshSection = (p.psh && p.psh.length)
            ? section('Surgical History', asList(p.psh, ''), 'fa-scalpel') : '';
        var familySection = p.familyHistory
            ? section('Family History', '<div class="rail-body">' + _escape(p.familyHistory) + '</div>', 'fa-people-roof') : '';
        var socialSection = p.social
            ? section('Social', '<div class="rail-body">' + _escape(p.social) + '</div>', 'fa-house-user') : '';

        var coreHtml =
            '<div class="rail-header">' +
                '<div class="rail-demo">' + _escape(p.demographics) + '</div>' +
                '<div class="rail-tags">' +
                    '<span class="rail-tag ' + allergyClass + '">' +
                        '<i class="fas fa-triangle-exclamation"></i> ' +
                        '<span class="rt-label">Allergies</span>' +
                        '<span class="rt-val">' + _escape(allergiesText) + '</span>' +
                    '</span>' +
                    '<span class="rail-tag">' +
                        '<i class="fas fa-heart-pulse"></i> ' +
                        '<span class="rt-label">Code</span>' +
                        '<span class="rt-val">' + _escape(p.codeStatus || 'Full code') + '</span>' +
                    '</span>' +
                '</div>' +
            '</div>' +
            '<div class="rail-cc">' +
                '<i class="fas fa-quote-left"></i>' +
                '<span>' + _escape(p.cc) + '</span>' +
            '</div>' +
            section('Vital Signs', vitalsHtml, 'fa-heartbeat');

        var expandableHtml = '<div class="rail-expandable" id="rail-expandable">' +
            section('Past Medical History', asList(p.pmhx, 'No significant history'), 'fa-notes-medical') +
            section('Home Medications', asList(p.medications, 'None reported'), 'fa-pills') +
            optionalCtx + pshSection + familySection + socialSection +
        '</div>';

        var toggleHtml =
            '<button type="button" class="rail-toggle" id="rail-toggle" aria-expanded="false">' +
                '<i class="fas fa-chevron-down rail-toggle-chevron"></i>' +
                '<span class="rail-toggle-label">Show full chart</span>' +
            '</button>';

        $('play-patient').innerHTML = coreHtml + toggleHtml + expandableHtml;

        var toggleBtn = $('rail-toggle');
        var expandable = $('rail-expandable');
        if (toggleBtn && expandable) {
            toggleBtn.addEventListener('click', function () {
                var isExpanded = expandable.classList.toggle('is-expanded');
                toggleBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
                var labelEl = toggleBtn.querySelector('.rail-toggle-label');
                if (labelEl) labelEl.textContent = isExpanded ? 'Hide full chart' : 'Show full chart';
            });
        }

        var sheetBody = $('chart-sheet-body');
        if (sheetBody) {
            sheetBody.innerHTML =
                '<div class="rail-header">' +
                    '<div class="rail-demo">' + _escape(p.demographics) + '</div>' +
                    '<div class="rail-tags">' +
                        '<span class="rail-tag ' + allergyClass + '">' +
                            '<i class="fas fa-triangle-exclamation"></i> ' +
                            '<span class="rt-label">Allergies</span>' +
                            '<span class="rt-val">' + _escape(allergiesText) + '</span>' +
                        '</span>' +
                        '<span class="rail-tag">' +
                            '<i class="fas fa-heart-pulse"></i> ' +
                            '<span class="rt-label">Code</span>' +
                            '<span class="rt-val">' + _escape(p.codeStatus || 'Full code') + '</span>' +
                        '</span>' +
                    '</div>' +
                '</div>' +
                '<div class="rail-cc">' +
                    '<i class="fas fa-quote-left"></i>' +
                    '<span>' + _escape(p.cc) + '</span>' +
                '</div>' +
                section('Vital Signs', vitalsHtml, 'fa-heartbeat') +
                section('Past Medical History', asList(p.pmhx, 'No significant history'), 'fa-notes-medical') +
                section('Home Medications', asList(p.medications, 'None reported'), 'fa-pills') +
                optionalCtx + pshSection + familySection + socialSection;
        }

        var topbarSummary = $('topbar-summary');
        if (topbarSummary) {
            var brief = p.demographics;
            if (p.vitals && p.vitals.Temp) brief += ' · ' + p.vitals.Temp;
            topbarSummary.textContent = brief;
        }
    }

    var TAB_CONTAINERS  = ['play-q-tabs', 'picker-tabs'];
    var POOL_CONTAINERS = ['play-q-pool', 'picker-pool'];

    function renderTabs() {
        var s = state.scenario;
        var cats = categoriesIn(s);
        TAB_CONTAINERS.forEach(function (id) {
            var container = $(id);
            if (!container) return;
            container.innerHTML = '';
            cats.forEach(function (cat) {
                var qs = questionsByCategory(s, cat);
                var remaining = qs.filter(function (q) { return state.asked.indexOf(q.id) === -1; }).length;
                var btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'play-q-tab' + (cat === state.activeTab ? ' active' : '');
                btn.innerHTML = _escape(cat) + ' <span class="count">' + remaining + '/' + qs.length + '</span>';
                btn.addEventListener('click', function () {
                    state.activeTab = cat;
                    renderTabs();
                    renderQuestionPool();
                });
                container.appendChild(btn);
            });
        });
    }

    function renderQuestionPool() {
        var budget = state.scenario.questionBudget || 999;
        var budgetSpent = state.asked.length >= budget;
        var qs = state.activeTab ? questionsByCategory(state.scenario, state.activeTab) : [];

        POOL_CONTAINERS.forEach(function (id) {
            var container = $(id);
            if (!container) return;
            container.innerHTML = '';
            if (!state.activeTab) {
                container.innerHTML = '<p class="play-q-empty">No questions available.</p>';
                return;
            }
            if (!qs.length) {
                container.innerHTML = '<p class="play-q-empty">No questions in this category.</p>';
                return;
            }
            qs.forEach(function (q) {
                var asked = state.asked.indexOf(q.id) !== -1;
                var locked = !asked && budgetSpent;
                var btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'q-option' + (asked ? ' asked' : '') + (locked ? ' locked' : '');
                btn.disabled = asked || locked;
                btn.textContent = q.text;
                if (!asked && !locked) {
                    btn.addEventListener('click', function () { askQuestion(q.id); });
                }
                container.appendChild(btn);
            });
        });
    }

    function askQuestion(qid) {
        if (state.asked.indexOf(qid) !== -1) return;
        var budget = state.scenario.questionBudget || 999;
        if (state.asked.length >= budget) return;
        state.asked.push(qid);
        renderLog();
        renderTabs();
        renderQuestionPool();
        updateCommitButton();
        updateBudgetCounter();

        if (isMobileLayout()) {
            requestAnimationFrame(function () {
                var log = $('play-log');
                if (!log || !log.lastElementChild) return;
                var rect = log.lastElementChild.getBoundingClientRect();
                var target = window.pageYOffset + rect.top - 120;
                window.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
            });
        }
    }

    function updateBudgetCounter() {
        var budget = state.scenario.questionBudget || 0;
        var used = state.asked.length;
        var remaining = Math.max(0, budget - used);

        var icon, label, stateClass;
        if (remaining <= 0)        { icon = 'fa-circle-exclamation'; label = 'No more questions'; stateClass = 'is-spent'; }
        else if (remaining <= 2)   { icon = 'fa-bolt'; label = remaining + ' left'; stateClass = 'is-low'; }
        else                       { icon = 'fa-list-check'; label = remaining + ' / ' + budget + ' left'; stateClass = ''; }

        ['play-q-counter', 'sheet-counter', 'askbar-counter'].forEach(function (id) {
            var el = $(id);
            if (!el) return;
            el.innerHTML = '<i class="fas ' + icon + '"></i> ' + label;
            var baseClass = id === 'play-q-counter' ? 'play-q-counter' :
                            id === 'sheet-counter' ? 'sheet-counter' : 'askbar-counter';
            el.className = baseClass + (stateClass ? ' ' + stateClass : '');
        });
    }

    function renderLog() {
        var log = $('play-log');
        log.innerHTML = '';
        if (!state.scenario) return;

        var nurseLabel = state.nurseName ? 'Nurse ' + state.nurseName : 'You';
        var p = state.scenario.patient;

        var allergyText = p.allergies || 'NKDA';
        var allergyHas = String(allergyText).toUpperCase() !== 'NKDA';
        var vitalsLine = '';
        if (p.vitals) {
            var bits = [];
            Object.keys(p.vitals).forEach(function (k) {
                bits.push('<span class="handoff-vital"><span class="hv-label">' + _escape(k) + '</span> ' + _escape(p.vitals[k]) + '</span>');
            });
            vitalsLine = bits.join('');
        }
        var handoffHtml =
            '<div class="handoff-card">' +
                '<div class="handoff-head">' +
                    '<i class="fas fa-clipboard-user"></i> <span>Patient handoff</span>' +
                '</div>' +
                '<div class="handoff-demo">' + _escape(p.demographics) + '</div>' +
                '<div class="handoff-tags">' +
                    '<span class="handoff-tag ' + (allergyHas ? 'is-allergy' : '') + '">' +
                        '<i class="fas fa-triangle-exclamation"></i> ' + _escape(allergyText) +
                    '</span>' +
                    '<span class="handoff-tag">' +
                        '<i class="fas fa-heart-pulse"></i> ' + _escape(p.codeStatus || 'Full code') +
                    '</span>' +
                '</div>' +
                '<div class="handoff-vitals">' + vitalsLine + '</div>' +
                '<button type="button" class="handoff-chart-btn" id="handoff-chart-btn">' +
                    '<i class="fas fa-clipboard-list"></i> Tap for full chart' +
                '</button>' +
            '</div>';

        var ccHtml =
            '<div class="chat-pair">' +
                '<div class="bubble-row from-patient">' +
                    '<div class="bubble-author">Patient</div>' +
                    '<div class="bubble bubble-patient">' + _escape(p.cc) + '</div>' +
                '</div>' +
            '</div>';

        log.innerHTML = handoffHtml + ccHtml;

        var handoffBtn = $('handoff-chart-btn');
        if (handoffBtn) handoffBtn.addEventListener('click', function () { openSheet('chart-sheet'); });

        state.asked.forEach(function (qid) {
            var q = findQuestion(qid);
            if (!q) return;
            var pair = document.createElement('div');
            pair.className = 'chat-pair';
            pair.innerHTML =
                '<div class="bubble-row from-nurse">' +
                    '<div class="bubble-author">' + _escape(nurseLabel) + '</div>' +
                    '<div class="bubble bubble-nurse">' + _escape(q.text) + '</div>' +
                '</div>' +
                '<div class="bubble-row from-patient">' +
                    '<div class="bubble-author">Patient</div>' +
                    '<div class="bubble bubble-patient">' + _escape(q.response) + '</div>' +
                '</div>';
            log.appendChild(pair);
        });

        log.scrollTop = log.scrollHeight;
    }

    function updateCommitButton() {
        var btn = $('btn-commit');
        var hint = $('play-commit-hint');
        var asked = state.asked.length;
        var budget = state.scenario.questionBudget || 0;
        var spent = budget > 0 && asked >= budget;
        var enabled = asked >= 2;

        var hintText;
        if (asked < 2) hintText = 'Ask at least 2 questions first';
        else if (spent) hintText = 'Budget spent — time to commit';
        else hintText = asked + ' asked · ' + (budget - asked) + ' left if you want them';

        if (btn) {
            btn.disabled = !enabled;
            btn.classList.toggle('is-urgent', enabled && spent);
        }
        if (hint) hint.textContent = hintText;

        ['askbar-commit', 'picker-commit'].forEach(function (id) {
            var el = $(id);
            if (!el) return;
            el.disabled = !enabled;
            el.classList.toggle('is-urgent', enabled && spent);
        });
    }


    // ── Screen 3 · Commit ──────────────────────────────────
    function openCommit() {
        renderCommitScreen();
        show('screen-commit');
    }
    function renderCommitScreen() {
        state.commitCondition = null;
        state.commitAction = null;
        renderCommitOptions('commit-conditions', state.scenario.commit.conditions, function (id) {
            state.commitCondition = id; updateCommitSubmit();
        });
        renderCommitOptions('commit-actions', state.scenario.commit.actions, function (id) {
            state.commitAction = id; updateCommitSubmit();
        });
        updateCommitSubmit();
    }
    function renderCommitOptions(containerId, options, onSelect) {
        var container = $(containerId);
        container.innerHTML = '';
        options.forEach(function (opt) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'commit-option';
            btn.setAttribute('data-opt-id', opt.id);
            btn.innerHTML = '<span class="ring"></span><span class="label">' + _escape(opt.label) + '</span>';
            btn.addEventListener('click', function () {
                var siblings = container.querySelectorAll('.commit-option');
                for (var i = 0; i < siblings.length; i++) siblings[i].classList.remove('selected');
                btn.classList.add('selected');
                onSelect(opt.id);
            });
            container.appendChild(btn);
        });
    }
    function updateCommitSubmit() {
        var btn = $('btn-commit-submit');
        btn.disabled = !(state.commitCondition && state.commitAction);
    }


    // ── Screen 4 · Debrief ─────────────────────────────────
    //
    // Two paths in:
    //   1. Normal commit-submit → POST /api/rounds/sessions, server scores,
    //      we render using server's result and POST returns the session row.
    //   2. View-only (already played today) → server result preloaded into
    //      state.serverResult with view_only:true. No POST.
    function submitCommit() {
        var btn = $('btn-commit-submit');
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Scoring…';
        }
        window.apiCall('/api/rounds/sessions', {
            method: 'POST',
            body: JSON.stringify({
                scenario_id: state.scenario.id,
                asked_question_ids: state.asked,
                committed_condition_id: state.commitCondition,
                committed_action_id: state.commitAction
            })
        }).then(function (data) {
            state.serverResult = data.session;
            renderDebrief();
            show('screen-debrief');
        }).catch(function (err) {
            console.error('submitCommit failed:', err);
            // Fall back to local-only scoring so the user isn't stuck.
            // Will show the debrief, just without server-side persistence.
            state.serverResult = null;
            renderDebrief();
            show('screen-debrief');
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = 'See the debrief <i class="fas fa-arrow-right"></i>';
            }
            // Surface the error briefly on the debrief screen
            setTimeout(function () {
                showError('Saved offline — your result wasn\'t recorded to your history.');
            }, 200);
        }).finally(function () {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = 'See the debrief <i class="fas fa-arrow-right"></i>';
            }
        });
    }

    function renderDebrief() {
        var s = state.scenario;
        var d = s.debrief || {};
        var conds = s.commit.conditions;
        var acts = s.commit.actions;

        var correctCond = conds.filter(function (c) { return c.correct; })[0];
        var correctAct  = acts.filter(function (a) { return a.correct; })[0];
        var yourCond    = conds.filter(function (c) { return c.id === state.commitCondition; })[0];
        var yourAct     = acts.filter(function (a) { return a.id === state.commitAction; })[0];

        // Prefer server's scoring; fall back to client-side compute if the
        // POST failed AND we have asked-questions state.
        var sr = state.serverResult;
        var stars, condRight, actRight, efficiencyPct, highCount, mediumCount, lowCount, redCount, askedCount;

        if (sr) {
            stars = sr.stars;
            condRight = sr.condition_correct;
            actRight = sr.action_correct;
            efficiencyPct = sr.efficiency_pct;
            highCount = sr.high_yield_count || 0;
            redCount = sr.redherring_count || 0;
            askedCount = state.asked.length;
            // medium / low not returned individually; back-derive when possible
            var askedQs = s.questions.filter(function (q) { return state.asked.indexOf(q.id) !== -1; });
            mediumCount = askedQs.filter(function (q) { return q.value === 'medium'; }).length;
            lowCount = askedQs.filter(function (q) { return q.value === 'low'; }).length;
        } else {
            // Offline fallback — same formula as server
            var askedQs2 = s.questions.filter(function (q) { return state.asked.indexOf(q.id) !== -1; });
            askedCount = askedQs2.length;
            highCount   = askedQs2.filter(function (q) { return q.value === 'high';       }).length;
            mediumCount = askedQs2.filter(function (q) { return q.value === 'medium';     }).length;
            lowCount    = askedQs2.filter(function (q) { return q.value === 'low';        }).length;
            redCount    = askedQs2.filter(function (q) { return q.value === 'redherring'; }).length;
            if (askedCount) {
                var usefulShare = (highCount + mediumCount) / askedCount;
                var redPenalty  = (redCount * 0.6) / askedCount;
                efficiencyPct = Math.max(0, Math.min(100, Math.round((usefulShare - redPenalty) * 100)));
            } else { efficiencyPct = 0; }
            condRight = yourCond && yourCond.correct;
            actRight  = yourAct && yourAct.correct;
            if (condRight && actRight && efficiencyPct >= 70) stars = 3;
            else if (condRight && actRight) stars = 2;
            else if ((condRight || actRight) && efficiencyPct >= 70) stars = 2;
            else if (condRight || actRight) stars = 1;
            else stars = 0;
        }

        var verdictClass, verdictHeadline, verdictSub;
        if (stars === 3) {
            verdictClass = 'win';
            verdictHeadline = 'Nailed it.';
            verdictSub = 'Right read, right action — and you got there efficiently.';
        } else if (stars === 2) {
            verdictClass = 'win';
            verdictHeadline = 'Strong work.';
            verdictSub = condRight && actRight
                ? 'Right read and right action. A few of your questions could have been more targeted.'
                : 'You got partway there — and the questions you chose were efficient.';
        } else if (stars === 1) {
            verdictClass = 'partial';
            verdictHeadline = 'Close — but not quite.';
            verdictSub = condRight
                ? 'Right read on the situation, but the priority action wasn\'t the strongest one.'
                : 'The action you picked makes sense — but for a different underlying problem.';
        } else {
            verdictClass = 'miss';
            verdictHeadline = 'Different read this time.';
            verdictSub = 'The actual picture and priority were elsewhere. The debrief below walks through why.';
        }

        var starsHtml = '';
        for (var i = 0; i < 3; i++) {
            starsHtml += '<i class="fas fa-star ' + (i < stars ? 'on' : 'off') + '"></i>';
        }
        var condChip = condRight
            ? '<span class="score-chip ok"><i class="fas fa-check"></i> Right call</span>'
            : '<span class="score-chip miss"><i class="fas fa-xmark"></i> Wrong call</span>';
        var actChip = actRight
            ? '<span class="score-chip ok"><i class="fas fa-check"></i> Right action</span>'
            : '<span class="score-chip miss"><i class="fas fa-xmark"></i> Wrong action</span>';

        var effLabel, effClass;
        if (redCount >= 2)         { effLabel = 'Watch the red herrings'; effClass = 'miss'; }
        else if (efficiencyPct >= 70) { effLabel = 'Sharp picks'; effClass = 'ok'; }
        else if (efficiencyPct >= 40) { effLabel = 'Mostly useful'; effClass = 'partial'; }
        else                       { effLabel = 'Lots of filler'; effClass = 'miss'; }
        var effChip = '<span class="score-chip ' + effClass + '"><i class="fas fa-bullseye"></i> ' + effLabel + '</span>';

        var detailBits = [
            askedCount + ' asked',
            highCount + ' high-yield',
            mediumCount + ' useful'
        ];
        if (redCount > 0) detailBits.push(redCount + ' red herring' + (redCount === 1 ? '' : 's'));
        var efficiencyDetail = detailBits.join(' · ');

        var auditRows = s.questions.map(function (q) {
            var wasAsked = state.asked.indexOf(q.id) !== -1;
            var tagLabel = ({ high:'High yield', medium:'Useful', low:'Low yield', redherring:'Red herring' })[q.value] || q.value;
            return '<div class="q-audit-row ' + q.value + (wasAsked ? '' : ' unasked') + '">' +
                       '<span class="tag">' + _escape(tagLabel) + '</span>' +
                       '<span class="text">' + _escape(q.text) + '</span>' +
                   '</div>';
        }).join('');

        var missesHtml = (d.commonMisses || []).map(function (m) {
            return '<div class="debrief-miss">' +
                       '<div class="debrief-miss-label">' + _escape(m.label) + '</div>' +
                       '<div class="debrief-miss-why">' + _escape(m.why) + '</div>' +
                   '</div>';
        }).join('');

        // Standard tier replay vs AI-tier next-scenario: change the
        // action row depending on what's available.
        var canReplay = (state.tier === 'ai-powered');
        var replayBtnHtml = canReplay
            ? '<button type="button" class="btn-ghost" data-action="replay"><i class="fas fa-rotate-right"></i> Try this one again</button>'
            : '';
        var nextBtnHtml = canReplay
            ? '<button type="button" class="btn-primary" data-action="next">Next scenario <i class="fas fa-arrow-right"></i></button>'
            : '<button type="button" class="btn-primary" data-action="back-to-select">Back to scenarios <i class="fas fa-arrow-right"></i></button>';

        var viewOnlyBanner = (sr && sr.view_only)
            ? '<div class="rounds-error" style="margin:0 0 16px;">' +
                  '<i class="fas fa-eye"></i><span>Viewing your earlier attempt — question audit is not available for past sessions.</span>' +
              '</div>' : '';

        var html =
            viewOnlyBanner +
            '<div class="debrief-verdict ' + verdictClass + '">' +
                '<div class="verdict-stars">' + starsHtml + '</div>' +
                '<div class="verdict-headline">' + _escape(verdictHeadline) + '</div>' +
                '<div class="verdict-sub">' + _escape(verdictSub) + '</div>' +
                '<div class="verdict-chips">' + condChip + actChip + effChip + '</div>' +
                '<div class="verdict-efficiency">' + _escape(efficiencyDetail) + '</div>' +
                (yourCond ? (
                    '<div class="verdict-yours">' +
                        '<div class="yours-block">' +
                            '<div class="yours-label">Your read</div>' +
                            '<div class="yours-value ' + (condRight ? 'yours-correct' : 'yours-wrong') + '">' +
                                _escape(yourCond.label) +
                            '</div>' +
                            (!condRight ? '<div class="yours-label" style="margin-top:8px;">Actual</div><div class="yours-value yours-correct">' + _escape(correctCond.label) + '</div>' : '') +
                        '</div>' +
                        '<div class="yours-block">' +
                            '<div class="yours-label">Your action</div>' +
                            '<div class="yours-value ' + (actRight ? 'yours-correct' : 'yours-wrong') + '">' +
                                _escape(yourAct.label) +
                            '</div>' +
                            (!actRight ? '<div class="yours-label" style="margin-top:8px;">Optimal</div><div class="yours-value yours-correct">' + _escape(correctAct.label) + '</div>' : '') +
                        '</div>' +
                    '</div>'
                ) : '') +
            '</div>' +
            '<div class="debrief-card">' +
                '<h3><i class="fas fa-stethoscope"></i> What was actually going on</h3>' +
                '<p><strong>' + _escape(d.diagnosis || correctCond.label) + '.</strong></p>' +
                (d.reasoning ? '<p style="margin-top:10px;">' + d.reasoning + '</p>' : '') +
            '</div>' +
            (state.asked.length ?
                '<div class="debrief-card">' +
                    '<h3><i class="fas fa-bullseye"></i> Which questions actually mattered</h3>' +
                    (d.highYieldExplanation ? '<p>' + d.highYieldExplanation + '</p>' : '') +
                    '<div class="q-audit">' + auditRows + '</div>' +
                '</div>' : '') +
            (missesHtml ?
                '<div class="debrief-card">' +
                    '<h3><i class="fas fa-shuffle"></i> Why it wasn\'t the other answers</h3>' +
                    missesHtml +
                '</div>' : '') +
            (d.actionRationale ?
                '<div class="debrief-card">' +
                    '<h3><i class="fas fa-bolt"></i> Why this action</h3>' +
                    '<p>' + d.actionRationale + '</p>' +
                '</div>' : '') +
            (d.teachingPoint ?
                '<div class="debrief-card teaching">' +
                    '<h3><i class="fas fa-lightbulb"></i> Take this with you</h3>' +
                    '<p>' + d.teachingPoint + '</p>' +
                '</div>' : '') +
            '<div class="debrief-actions">' +
                '<div class="left">' +
                    replayBtnHtml +
                    '<button type="button" class="btn-ghost" data-action="back-to-select">' +
                        '<i class="fas fa-grip"></i> Back to scenarios' +
                    '</button>' +
                '</div>' +
                nextBtnHtml +
            '</div>';

        var wrap = $('debrief-wrap');
        wrap.innerHTML = html;

        var replayBtn = wrap.querySelector('[data-action="replay"]');
        if (replayBtn) {
            replayBtn.addEventListener('click', function () { startScenario(s.id); });
        }
        var backBtns = wrap.querySelectorAll('[data-action="back-to-select"]');
        backBtns.forEach(function (b) {
            b.addEventListener('click', function () {
                // Re-render the select screen — the played-today notice may need updating
                bootstrap();
                show('screen-select');
            });
        });
        var nextBtn = wrap.querySelector('[data-action="next"]');
        if (nextBtn && canReplay) {
            nextBtn.addEventListener('click', function () {
                // Find the next unlocked scenario after the current one
                var ids = state.scenarios.filter(function (x) { return x.unlocked; }).map(function (x) { return x.id; });
                if (!ids.length) { show('screen-select'); return; }
                var idx = ids.indexOf(s.id);
                var next = ids[(idx + 1) % ids.length];
                if (next === s.id) { show('screen-select'); return; }
                startScenario(next);
            });
        }
    }


    // ── Bottom sheet helpers ──────────────────────────────
    function openSheet(id) {
        var sheet = $(id);
        if (!sheet) return;
        sheet.hidden = false;
        var bodies = sheet.querySelectorAll('.sheet-body');
        bodies.forEach(function (b) { b.scrollTop = 0; });
        requestAnimationFrame(function () { sheet.classList.add('is-open'); });
        if (id === 'picker-sheet') document.body.classList.add('picker-open');
        else                       document.body.classList.add('sheet-open');
    }
    function closeSheet(id) {
        var sheet = $(id);
        if (!sheet) return;
        sheet.classList.remove('is-open');
        setTimeout(function () { sheet.hidden = true; }, 220);
        if (id === 'picker-sheet') {
            document.body.classList.remove('picker-open');
        } else {
            var any = document.querySelector('.bottom-sheet.is-open:not(#picker-sheet)');
            if (!any) document.body.classList.remove('sheet-open');
        }
    }
    function closeAllSheets() {
        ['chart-sheet', 'picker-sheet'].forEach(closeSheet);
    }


    // ── Wire up ─────────────────────────────────────────────
    function init() {
        bootstrap();
        show('screen-select');

        $('btn-commit').addEventListener('click', openCommit);
        $('btn-back-to-select').addEventListener('click', function () { show('screen-select'); });
        $('btn-commit-back').addEventListener('click', function () { show('screen-play'); });
        $('btn-commit-submit').addEventListener('click', submitCommit);

        $('name-form').addEventListener('submit', handleNameSave);
        $('nurse-badge').addEventListener('click', openNameModal);

        var topbarBack = $('topbar-back');
        if (topbarBack) topbarBack.addEventListener('click', function () { show('screen-select'); });
        var topbarChart = $('topbar-chart');
        if (topbarChart) topbarChart.addEventListener('click', function () { openSheet('chart-sheet'); });

        var askbarTrigger = $('askbar-trigger');
        if (askbarTrigger) askbarTrigger.addEventListener('click', function () { openSheet('picker-sheet'); });
        var askbarCommit = $('askbar-commit');
        if (askbarCommit) askbarCommit.addEventListener('click', openCommit);
        var pickerCommit = $('picker-commit');
        if (pickerCommit) pickerCommit.addEventListener('click', function () {
            closeSheet('picker-sheet');
            openCommit();
        });

        document.querySelectorAll('[data-sheet-close]').forEach(function (el) {
            el.addEventListener('click', function () {
                var sheet = el.closest('.bottom-sheet');
                if (sheet) closeSheet(sheet.id);
            });
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeAllSheets();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
