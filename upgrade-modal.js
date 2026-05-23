/**
 * Standard → AI-Powered upgrade modal (shared)
 *
 * Exposes window.openUpgradeAiModal() so any page can open the modal
 * in place — no navigation to /settings or /pricing required.
 *
 * The modal markup is injected on first open so individual pages don't
 * need to ship the HTML. Depends on api-service.js (apiCall) and
 * optionally modal.js (showAlert — falls back to a toast otherwise).
 *
 * Originally lived in settings-script.js as openUpgradeAiModal /
 * loadUpgradeDetails / proceedToUpgrade. Extracted so the sidebar
 * widget can trigger it from dashboard, my-guides, etc.
 */
(function () {
    'use strict';

    var MODAL_ID = 'upgrade-ai-modal';
    var injected = false;

    function ensureInjected() {
        if (injected) return;
        if (document.getElementById(MODAL_ID)) { injected = true; return; }

        var html =
            '<div id="' + MODAL_ID + '" class="delete-modal-overlay" style="display:none;">' +
                '<div class="delete-modal-content" style="max-width: 480px;">' +
                    '<div class="delete-modal-header">' +
                        '<div class="delete-modal-icon" style="background: rgba(139, 92, 246, 0.1);">' +
                            '<i class="fas fa-bolt" style="color: #7c3aed;"></i>' +
                        '</div>' +
                        '<h3>Upgrade to AI-Powered</h3>' +
                        '<p style="color: var(--text-secondary); font-size: 0.9rem;">Unlock AI study tools with your current billing cycle.</p>' +
                    '</div>' +
                    '<div id="upgrade-ai-summary" style="margin-bottom: 20px;">' +
                        '<div style="text-align:center; padding: 16px; color: var(--text-secondary);">' +
                            '<i class="fas fa-spinner fa-spin"></i> Loading upgrade details...' +
                        '</div>' +
                    '</div>' +
                    '<div id="upgrade-ai-error" class="delete-modal-error" style="display:none;"></div>' +
                    '<div class="delete-modal-actions">' +
                        '<button id="upgrade-ai-close-btn" class="delete-modal-btn-cancel">Close</button>' +
                        '<button id="upgrade-ai-confirm-btn" class="delete-modal-btn-confirm" ' +
                            'style="background: linear-gradient(135deg, #7c3aed, #a855f7); display:none;">' +
                            '<i class="fas fa-credit-card"></i> Continue to Payment' +
                        '</button>' +
                    '</div>' +
                '</div>' +
            '</div>';

        var wrap = document.createElement('div');
        wrap.innerHTML = html;
        document.body.appendChild(wrap.firstChild);
        injected = true;
    }

    function openModal() {
        ensureInjected();
        var modal = document.getElementById(MODAL_ID);
        if (!modal) return;

        var summaryEl = document.getElementById('upgrade-ai-summary');
        var confirmBtn = document.getElementById('upgrade-ai-confirm-btn');
        var errorEl = document.getElementById('upgrade-ai-error');
        var closeBtn = document.getElementById('upgrade-ai-close-btn');

        // Reset state
        if (confirmBtn) {
            confirmBtn.style.display = 'none';
            confirmBtn.disabled = false;
            confirmBtn.innerHTML = '<i class="fas fa-credit-card"></i> Continue to Payment';
        }
        if (errorEl) { errorEl.style.display = 'none'; errorEl.textContent = ''; }
        if (summaryEl) {
            summaryEl.innerHTML = '<div style="text-align:center; padding: 16px; color: var(--text-secondary);">' +
                '<i class="fas fa-spinner fa-spin"></i> Loading upgrade details...</div>';
        }

        modal.style.display = 'flex';

        if (closeBtn) {
            closeBtn.innerHTML = 'Close';
            closeBtn.onclick = function () { modal.style.display = 'none'; };
        }
        modal.onclick = function (e) {
            if (e.target === modal) modal.style.display = 'none';
        };

        loadUpgradeDetails(summaryEl, confirmBtn, modal);
    }

    async function loadUpgradeDetails(summaryEl, confirmBtn, modal) {
        try {
            if (typeof apiCall !== 'function') throw new Error('apiCall not available');
            var optsResp = await apiCall('/api/upgrade-options');
            if (!optsResp) throw new Error('Failed to load upgrade options');

            var currentPlanId = optsResp.current_plan_id || '';
            var currentPlanNames = {
                'monthly-access': 'Standard Monthly',
                'semester-access': 'Standard Semester',
                'lifetime-access': 'Standard Lifetime'
            };
            var currentName = currentPlanNames[currentPlanId] || currentPlanId || 'Current Plan';

            if (!optsResp.upgrade_available || !optsResp.upgrade) {
                var reason = optsResp.reason;
                var noUpgradeMsg = 'No upgrade available for your current plan.';
                if (reason === 'already_ai') noUpgradeMsg = 'You\'re already on an AI-Powered plan.';
                else if (reason === 'no_active_subscription') noUpgradeMsg = 'Subscribe to a Standard plan first to upgrade to AI-Powered.';
                if (summaryEl) {
                    summaryEl.innerHTML =
                        '<div style="background: var(--navy-3); border: 0.5px solid var(--border); border-radius: 12px; padding: 20px; text-align:center; color: var(--text-dim);">' +
                            '<i class="fas fa-info-circle" style="color:#a78bfa; margin-right:6px;"></i>' + esc(noUpgradeMsg) +
                        '</div>';
                }
                return;
            }

            var upgrade = optsResp.upgrade;
            var aiName = upgrade.target_plan_name || 'AI-Powered';
            var upgradePriceText;
            if (upgrade.type === 'subscription-modify') {
                upgradePriceText = 'Prorated upgrade · billed by Stripe';
            } else if (typeof upgrade.price === 'number') {
                upgradePriceText = '$' + upgrade.price.toFixed(2) + ' one-time upgrade';
            } else {
                upgradePriceText = '';
            }

            if (summaryEl) {
                summaryEl.innerHTML =
                    '<div style="background: var(--navy-3); border: 0.5px solid var(--border); border-radius: 12px; padding: 20px;">' +
                    '  <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px;">' +
                    '    <div style="flex:1; text-align:center;">' +
                    '      <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-dimmer); font-weight:600; letter-spacing:0.06em; margin-bottom:4px;">Current Plan</div>' +
                    '      <div style="font-weight:600; color:var(--text);">' + esc(currentName) + '</div>' +
                    '    </div>' +
                    '    <div style="color:#a78bfa; font-size:1.2rem;"><i class="fas fa-arrow-right"></i></div>' +
                    '    <div style="flex:1; text-align:center;">' +
                    '      <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-dimmer); font-weight:600; letter-spacing:0.06em; margin-bottom:4px;">New Plan</div>' +
                    '      <div style="font-weight:600; color:#a78bfa;">' + esc(aiName) + '</div>' +
                    (upgradePriceText ? '      <div style="font-size:0.9rem; color:var(--text-dim); margin-top:2px;">' + esc(upgradePriceText) + '</div>' : '') +
                    '    </div>' +
                    '  </div>' +
                    '  <div style="font-size:0.82rem; color:var(--text-dim); text-align:center; border-top:1px solid var(--border); padding-top:12px;">' +
                    '    <i class="fas fa-bolt" style="color:#a78bfa; margin-right:4px;"></i> Includes AI note uploads, NCLEX question generation, and more.' +
                    '  </div>' +
                    '  <div style="font-size:0.82rem; color:var(--text-dim); text-align:center; margin-top:8px;">' +
                    '    <i class="fas fa-lock" style="margin-right:4px;"></i> You\'ll be redirected to Stripe to confirm payment.' +
                    '  </div>' +
                    '</div>';
            }

            if (confirmBtn) {
                confirmBtn.style.display = 'inline-flex';
                confirmBtn.onclick = function () { proceedToUpgrade(modal); };
            }
        } catch (error) {
            console.error('[UpgradeModal] Error loading upgrade details:', error);
            if (summaryEl) {
                summaryEl.innerHTML = '<p style="text-align:center; color:var(--text-secondary); padding: 16px;">Unable to load upgrade details. Please try again.</p>';
            }
        }
    }

    async function proceedToUpgrade(modal) {
        var confirmBtn = document.getElementById('upgrade-ai-confirm-btn');
        var errorEl = document.getElementById('upgrade-ai-error');

        if (confirmBtn) {
            confirmBtn.disabled = true;
            confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
        }

        try {
            if (typeof apiCall !== 'function') throw new Error('apiCall not available');
            var response = await apiCall('/api/ai/upgrade', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    success_url: window.location.origin + '/success.html?session_id={CHECKOUT_SESSION_ID}&type=upgrade',
                    cancel_url: window.location.href
                })
            });

            if (response.upgraded) {
                // Monthly upgrade completed instantly — reload the page so the
                // sidebar widget + any settings UI reflect the new AI plan.
                if (modal) modal.style.display = 'none';
                if (typeof showAlert === 'function') {
                    showAlert('Upgrade Complete!', response.message || 'Your plan has been upgraded to AI-Powered!', 'success');
                }
                setTimeout(function () { window.location.reload(); }, 1500);
            } else if (response.url) {
                window.location.href = response.url;
            } else {
                throw new Error('Unexpected response');
            }
        } catch (error) {
            console.error('[UpgradeModal] Error upgrading plan:', error);
            if (errorEl) {
                errorEl.textContent = error.message || 'Unable to process the upgrade. Please try again.';
                errorEl.style.display = 'block';
            }
            if (confirmBtn) {
                confirmBtn.disabled = false;
                confirmBtn.innerHTML = '<i class="fas fa-credit-card"></i> Continue to Payment';
            }
        }
    }

    function esc(s) {
        if (s == null) return '';
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    window.openUpgradeAiModal = openModal;
})();
