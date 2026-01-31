// ============================================
// GUIDE SIDEBAR LOADER
// Dynamically generates sidebars from config
// ============================================

/**
 * Initialize sidebars for a study guide
 *
 * @param {Object} config - Sidebar configuration
 * @param {Array} config.sections - TOC sections [{id, icon, title}]
 * @param {Array} config.quickRef - Quick reference items [{type, icon, value, label}]
 * @param {Array} config.clinicalPearls - Clinical pearls [{title, text}]
 *
 * Example usage in guide HTML:
 *
 * <script>
 * const sidebarConfig = {
 *     sections: [
 *         { id: 'anatomy', icon: 'fa-brain', title: 'Brain Anatomy' },
 *         { id: 'types', icon: 'fa-code-branch', title: 'Stroke Types' },
 *     ],
 *     quickRef: [
 *         { type: 'time', icon: 'fa-clock', value: '4.5 hrs', label: 'tPA Window' },
 *         { type: 'critical', icon: 'fa-brain', value: '1.9M', label: 'Neurons lost/minute' },
 *     ],
 *     clinicalPearls: [
 *         { title: 'CT Before tPA!', text: 'Always get non-contrast CT to rule out hemorrhage.' },
 *     ]
 * };
 * </script>
 */

function initializeGuideSidebars(config) {
    if (!config) {
        console.warn('No sidebar config provided');
        return;
    }

    // Find the document container
    const documentContainer = document.querySelector('.document-container');
    if (!documentContainer) {
        console.warn('Document container not found');
        return;
    }

    // Create page wrapper
    const pageWrapper = document.createElement('div');
    pageWrapper.className = 'page-wrapper';

    // Create left sidebar (TOC)
    const leftSidebar = createLeftSidebar(config.sections || []);

    // Create right sidebar (Quick Ref + Clinical Pearls)
    const rightSidebar = createRightSidebar(config.quickRef || [], config.clinicalPearls || []);

    // Insert document container into page wrapper
    documentContainer.parentNode.insertBefore(pageWrapper, documentContainer);
    pageWrapper.appendChild(leftSidebar);
    pageWrapper.appendChild(documentContainer);
    pageWrapper.appendChild(rightSidebar);

    // Initialize TOC functionality (scroll tracking, progress bar)
    initializeTOCBehavior();

    // Initialize tip navigation (click on sidebar tips to scroll to inline callouts)
    initializeTipNavigation();
}

function createLeftSidebar(sections) {
    const sidebar = document.createElement('aside');
    sidebar.className = 'sidebar-left';

    let tocItems = '';
    sections.forEach(section => {
        tocItems += `
            <li class="toc-item">
                <a href="#${section.id}" class="toc-link" data-section="${section.id}">
                    <i class="fas ${section.icon}"></i>
                    <span>${section.title}</span>
                </a>
            </li>
        `;
    });

    sidebar.innerHTML = `
        <div class="toc-panel">
            <div class="toc-header">
                <i class="fas fa-list-ul"></i>
                <h3>Contents</h3>
            </div>
            <ul class="toc-list">
                ${tocItems}
            </ul>
            <div class="toc-progress">
                <div class="toc-progress-label">
                    <span>Reading Progress</span>
                    <span class="toc-progress-percent">0%</span>
                </div>
                <div class="toc-progress-bar">
                    <div class="toc-progress-fill"></div>
                </div>
            </div>
        </div>
    `;

    return sidebar;
}

function createRightSidebar(quickRefItems, clinicalPearls) {
    const sidebar = document.createElement('aside');
    sidebar.className = 'sidebar-right';

    // Get guide name for Florence's message
    const guideName = document.body.dataset.guideName || 'this topic';

    // Florence Study Buddy Card
    const florenceHtml = `
        <div class="florence-card">
            <div class="florence-header">
                <div class="florence-avatar">
                    <img src="../assets/images/healthcare.webp" alt="FlorenceBot">
                </div>
                <div class="florence-info">
                    <h3>FlorenceBot</h3>
                    <span>Your Study Buddy</span>
                </div>
            </div>
            <div class="florence-speech">
                <p>Hey! I pulled out the <strong>key numbers</strong> you need to memorize for ${guideName}. You've got this!</p>
            </div>
        </div>
    `;

    // Key Numbers Grid (Quick Reference)
    let keyNumbersHtml = '';
    if (quickRefItems.length > 0) {
        let items = '';
        quickRefItems.forEach(item => {
            items += `
                <div class="key-number ${item.type}">
                    <div class="key-number-value">${item.value}</div>
                    <div class="key-number-label">${item.label}</div>
                </div>
            `;
        });

        keyNumbersHtml = `
            <div class="key-numbers-card">
                <div class="key-numbers-title">
                    <i class="fas fa-star"></i>
                    Memorize These
                </div>
                <div class="key-numbers-grid">
                    ${items}
                </div>
            </div>
        `;
    }

    // FlorenceBot Tips (Clinical Pearls) - Clickable links to inline callouts
    let tipsHtml = '';
    if (clinicalPearls.length > 0) {
        let tips = '';
        clinicalPearls.forEach((pearl, index) => {
            // Generate tip ID from title (lowercase, hyphenated)
            const tipId = pearl.id || `tip-${pearl.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')}`;
            tips += `
                <div class="tip-item" data-tip-target="${tipId}" role="button" tabindex="0">
                    <div class="tip-item-title">${pearl.title}</div>
                </div>
            `;
        });

        tipsHtml = `
            <div class="florence-tips-card">
                <div class="florence-tips-header">
                    <div class="florence-tips-avatar">
                        <img src="../assets/images/healthcare.webp" alt="FlorenceBot">
                    </div>
                    <h4>FlorenceBot's Pro Tips</h4>
                </div>
                ${tips}
            </div>
        `;
    }

    sidebar.innerHTML = florenceHtml + keyNumbersHtml + tipsHtml;

    return sidebar;
}

// Handle clicking on sidebar tips to scroll to inline callouts
function initializeTipNavigation() {
    const tipItems = document.querySelectorAll('.tip-item[data-tip-target]');

    tipItems.forEach(item => {
        const handleClick = () => {
            const targetId = item.getAttribute('data-tip-target');
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Scroll to the tip
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Wait for scroll to finish, then flash the glow
                let scrollTimeout;
                const onScrollEnd = () => {
                    clearTimeout(scrollTimeout);
                    scrollTimeout = setTimeout(() => {
                        // Scrolling has stopped
                        window.removeEventListener('scroll', onScrollEnd);

                        // Flash the highlight
                        targetElement.classList.add('highlight');
                        setTimeout(() => {
                            targetElement.classList.remove('highlight');
                        }, 250);
                    }, 100); // Wait 100ms after last scroll event
                };

                window.addEventListener('scroll', onScrollEnd);
                onScrollEnd(); // Trigger once in case already at position
            }
        };

        item.addEventListener('click', handleClick);
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick();
            }
        });
    });
}

function initializeTOCBehavior() {
    const tocLinks = document.querySelectorAll('.toc-link');
    const sections = document.querySelectorAll('.guide-section');
    const progressFill = document.querySelector('.toc-progress-fill');
    const progressPercent = document.querySelector('.toc-progress-percent');

    if (!tocLinks.length || !sections.length) return;

    // Smooth scroll for TOC links
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Track active section and reading progress on scroll
    let ticking = false;

    function updateTOCState() {
        const scrollPosition = window.scrollY + 150;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min(Math.round((window.scrollY / documentHeight) * 100), 100);

        // Update progress bar
        if (progressFill) {
            progressFill.style.width = scrollPercent + '%';
        }
        if (progressPercent) {
            progressPercent.textContent = scrollPercent + '%';
        }

        // Find current active section
        let currentSection = null;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });

        // If past all sections, highlight the last one
        if (!currentSection && sections.length > 0) {
            const lastSection = sections[sections.length - 1];
            if (scrollPosition >= lastSection.offsetTop) {
                currentSection = lastSection.id;
            }
        }

        // Update active state on TOC links
        tocLinks.forEach(link => {
            const linkSection = link.getAttribute('data-section');
            if (linkSection === currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateTOCState);
            ticking = true;
        }
    });

    // Initial state
    updateTOCState();
}

// Note: Sidebars are initialized by guide-script.js after access verification
// This ensures sidebars only appear for users with valid access
