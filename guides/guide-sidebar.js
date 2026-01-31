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

    // Quick Reference Panel
    let quickRefHtml = '';
    if (quickRefItems.length > 0) {
        let items = '';
        quickRefItems.forEach(item => {
            items += `
                <div class="quick-ref-item ${item.type}">
                    <div class="quick-ref-icon">
                        <i class="fas ${item.icon}"></i>
                    </div>
                    <div class="quick-ref-content">
                        <div class="quick-ref-value">${item.value}</div>
                        <div class="quick-ref-label">${item.label}</div>
                    </div>
                </div>
            `;
        });

        quickRefHtml = `
            <div class="quick-ref-panel">
                <div class="quick-ref-header">
                    <i class="fas fa-bookmark"></i>
                    <h3>Quick Reference</h3>
                </div>
                ${items}
            </div>
        `;
    }

    // Clinical Pearls Panel
    let pearlsHtml = '';
    if (clinicalPearls.length > 0) {
        let pearls = '';
        clinicalPearls.forEach(pearl => {
            pearls += `
                <div class="pearl-mini">
                    <div class="pearl-mini-title">${pearl.title}</div>
                    <div class="pearl-mini-text">${pearl.text}</div>
                </div>
            `;
        });

        pearlsHtml = `
            <div class="clinical-pearl-panel">
                <div class="clinical-pearl-panel-header">
                    <i class="fas fa-gem"></i>
                    <h3>Clinical Pearls</h3>
                </div>
                ${pearls}
            </div>
        `;
    }

    sidebar.innerHTML = quickRefHtml + pearlsHtml;

    return sidebar;
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

// Auto-initialize if sidebarConfig is defined globally
document.addEventListener('DOMContentLoaded', function() {
    // Wait a tick to ensure guide-script.js has verified access
    setTimeout(function() {
        if (typeof sidebarConfig !== 'undefined') {
            initializeGuideSidebars(sidebarConfig);
        }
    }, 100);
});
