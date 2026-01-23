// Store Page JavaScript
// Sidebar Filter Functionality, Shop Type Toggle & Cart Integration

console.log('=== STORE-SCRIPT.JS FILE LOADED ===');

document.addEventListener('DOMContentLoaded', function() {
    console.log('Store script DOMContentLoaded fired');

    // Initialize dynamic savings badges
    initializeSavingsBadges();

    // Convert "Buy Guide" links to "Add to Cart" buttons
    initializeAddToCartButtons();

    // Initialize package add-to-cart buttons
    initializePackageButtons();

    // Initialize Quick View feature
    initializeQuickView();

    const filterButtons = document.querySelectorAll('.filter-item[data-filter]');
    const shopTypeButtons = document.querySelectorAll('.filter-item[data-shop-type]');
    const guideCards = document.querySelectorAll('.guide-card');
    const packageCards = document.querySelectorAll('.package-card');
    const guidesGrid = document.getElementById('guides-grid');
    const packagesGrid = document.getElementById('packages-grid');
    const categoryTitle = document.getElementById('category-title');
    const categoryDescription = document.getElementById('category-description');
    const categoryFilterSection = document.getElementById('category-filter-section');
    const packageCalloutSection = document.getElementById('package-callout-section');
    const packageComparison = document.getElementById('package-comparison');
    const switchToPackagesBtn = document.getElementById('switch-to-packages-btn');

    // Search elements
    const searchContainer = document.getElementById('search-container');
    const searchInput = document.getElementById('guide-search');
    const searchClear = document.getElementById('search-clear');
    const searchResultsCount = document.getElementById('search-results-count');

    // Empty state elements
    const emptyState = document.getElementById('empty-state');
    const emptyStateTerm = document.getElementById('empty-state-term');
    const clearSearchBtn = document.getElementById('clear-search-btn');

    // Sub-category elements
    const subcategoryChips = document.getElementById('subcategory-chips');
    const subcategoryButtons = document.querySelectorAll('.subcategory-chip');

    console.log('Search input found:', !!searchInput);
    console.log('Guide cards found:', guideCards.length);
    console.log('Subcategory chips found:', subcategoryButtons.length);

    let currentShopType = 'guides'; // Default to individual guides
    let currentFilter = 'all';
    let currentSubcategory = 'all';
    let currentSearchTerm = '';
    let currentSort = 'default';

    // Sort dropdown
    const sortSelect = document.getElementById('sort-select');

    // Popular guides (based on typical high-interest nursing topics)
    const popularGuides = [
        'heart-failure', 'diabetes-type2', 'copd', 'stroke', 'pneumonia',
        'cardiac-medications', 'pain-management', 'depression-anxiety',
        'labor-delivery', 'pediatric-emergencies', 'assessment-skills'
    ];

    // Quick filter state
    let currentQuickFilter = null; // 'popular', 'recently-viewed', or null

    // Quick filter elements
    const popularBtn = document.getElementById('popular-btn');
    const recentlyViewedBtn = document.getElementById('recently-viewed-btn');
    const recentlyViewedCount = document.getElementById('recently-viewed-count');
    const quickFiltersSection = document.getElementById('quick-filters-section');

    // Recently viewed guides (stored in localStorage)
    const RECENTLY_VIEWED_KEY = 'nursingCollective_recentlyViewed';
    const MAX_RECENTLY_VIEWED = 20;

    // Get recently viewed guides from localStorage
    function getRecentlyViewed() {
        try {
            const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            return [];
        }
    }

    // Add guide to recently viewed
    function addToRecentlyViewed(productId) {
        if (!productId) return;

        let recentlyViewed = getRecentlyViewed();

        // Remove if already exists (to move to front)
        recentlyViewed = recentlyViewed.filter(id => id !== productId);

        // Add to front
        recentlyViewed.unshift(productId);

        // Limit to max
        if (recentlyViewed.length > MAX_RECENTLY_VIEWED) {
            recentlyViewed = recentlyViewed.slice(0, MAX_RECENTLY_VIEWED);
        }

        try {
            localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(recentlyViewed));
        } catch (e) {
            console.warn('Could not save recently viewed to localStorage');
        }

        updateRecentlyViewedCount();
    }

    // Update recently viewed count badge
    function updateRecentlyViewedCount() {
        const count = getRecentlyViewed().length;
        if (recentlyViewedCount) {
            if (count > 0) {
                recentlyViewedCount.textContent = count;
                recentlyViewedCount.classList.add('visible');
                if (recentlyViewedBtn) recentlyViewedBtn.disabled = false;
            } else {
                recentlyViewedCount.classList.remove('visible');
                if (recentlyViewedBtn) recentlyViewedBtn.disabled = true;
            }
        }
    }

    // Initialize recently viewed count
    updateRecentlyViewedCount();

    // Expose addToRecentlyViewed globally for use by Quick View
    window.addToRecentlyViewed = addToRecentlyViewed;

    // Quick filter button handlers
    if (popularBtn) {
        popularBtn.addEventListener('click', function() {
            toggleQuickFilter('popular');
        });
    }

    if (recentlyViewedBtn) {
        recentlyViewedBtn.addEventListener('click', function() {
            if (!this.disabled) {
                toggleQuickFilter('recently-viewed');
            }
        });
    }

    // Toggle quick filter
    function toggleQuickFilter(filter) {
        if (currentQuickFilter === filter) {
            // Deactivate if clicking the same filter
            currentQuickFilter = null;
            if (popularBtn) popularBtn.classList.remove('active');
            if (recentlyViewedBtn) recentlyViewedBtn.classList.remove('active');

            // Reset header
            categoryTitle.textContent = categories[currentFilter]?.title || 'All Study Guides';
            categoryDescription.textContent = categories[currentFilter]?.description || 'Browse our complete collection of nursing study guides';
        } else {
            // Activate new filter
            currentQuickFilter = filter;

            if (popularBtn) popularBtn.classList.toggle('active', filter === 'popular');
            if (recentlyViewedBtn) recentlyViewedBtn.classList.toggle('active', filter === 'recently-viewed');

            // Update header
            if (filter === 'popular') {
                categoryTitle.textContent = 'Popular Guides';
                categoryDescription.textContent = 'Our most popular study guides chosen by nursing students';
            } else if (filter === 'recently-viewed') {
                categoryTitle.textContent = 'Recently Viewed';
                categoryDescription.textContent = 'Guides you\'ve looked at recently';
            }
        }

        filterGuides();
    }

    // Show More functionality for Guides
    const GUIDES_PER_PAGE = 12; // Number of guides to show initially and per "show more" click
    let visibleGuidesCount = GUIDES_PER_PAGE;
    const showMoreBtn = document.getElementById('show-more-btn');
    const showMoreContainer = document.getElementById('show-more-container');
    const showMoreCount = document.getElementById('show-more-count');

    // Show More functionality for Packages
    const PACKAGES_PER_PAGE = 3; // Number of packages to show initially
    let visiblePackagesCount = PACKAGES_PER_PAGE;
    const showMorePackagesBtn = document.getElementById('show-more-packages-btn');
    const showMorePackagesContainer = document.getElementById('show-more-packages-container');
    const showMorePackagesCount = document.getElementById('show-more-packages-count');

    // Category metadata
    const categories = {
        'all': {
            title: 'All Study Guides',
            description: 'Browse our complete collection of nursing study guides'
        },
        'med-surg': {
            title: 'Medical-Surgical Nursing',
            description: 'Complex disease management and critical care guides'
        },
        'pharmacology': {
            title: 'Pharmacology',
            description: 'Drug classes, calculations, and medication safety guides'
        },
        'fundamentals': {
            title: 'Fundamentals of Nursing',
            description: 'Essential skills and foundation nursing concepts'
        },
        'maternity': {
            title: 'Maternal & OB Nursing',
            description: 'Pregnancy, labor, delivery, and postpartum care guides'
        },
        'pediatrics': {
            title: 'Pediatric Nursing',
            description: 'Child development, pediatric conditions, and family care guides'
        },
        'mental-health': {
            title: 'Mental Health Nursing',
            description: 'Psychiatric disorders, therapeutic techniques, and crisis intervention guides'
        }
    };

    // Search functionality
    if (searchInput) {
        console.log('Adding search input listener');
        searchInput.addEventListener('input', function() {
            currentSearchTerm = this.value.toLowerCase().trim();
            console.log('Search term:', currentSearchTerm);

            // Show/hide clear button
            if (searchClear) {
                searchClear.style.display = currentSearchTerm ? 'flex' : 'none';
            }

            filterGuides();
        });
    } else {
        console.log('Search input NOT found!');
    }

    if (searchClear) {
        searchClear.addEventListener('click', function() {
            searchInput.value = '';
            currentSearchTerm = '';
            this.style.display = 'none';
            filterGuides();
            searchInput.focus();
        });
    }

    // Clear search button in empty state
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', function() {
            if (searchInput) {
                searchInput.value = '';
                currentSearchTerm = '';
                if (searchClear) searchClear.style.display = 'none';
                filterGuides();
                searchInput.focus();
            }
        });
    }

    // Sub-category chip functionality
    subcategoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentSubcategory = this.getAttribute('data-subcategory');

            // Update active state and inline styles
            subcategoryButtons.forEach(btn => {
                btn.classList.remove('active');
                // Reset to inactive style
                btn.style.background = '#ffffff';
                btn.style.color = '#1f2937';
                btn.style.borderColor = '#e5e7eb';
                btn.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.06)';
            });

            // Apply active style to clicked button
            this.classList.add('active');
            this.style.background = 'linear-gradient(135deg, #2E86AB 0%, #A23B72 100%)';
            this.style.color = '#ffffff';
            this.style.borderColor = 'transparent';
            this.style.boxShadow = '0 4px 14px rgba(46, 134, 171, 0.35)';

            filterGuides();
        });
    });

    // Master filter function with Show More pagination
    function filterGuides(resetPagination = true) {
        console.log('filterGuides called, search term:', currentSearchTerm, 'category:', currentFilter, 'subcategory:', currentSubcategory, 'sort:', currentSort);

        // Reset pagination when filter changes
        if (resetPagination) {
            visibleGuidesCount = GUIDES_PER_PAGE;
        }

        // Get all matching guides first
        const matchingGuides = [];

        guideCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const subcategory = card.getAttribute('data-subcategory') || '';
            const title = card.querySelector('h4')?.textContent.toLowerCase() || '';
            const description = card.querySelector('p')?.textContent.toLowerCase() || '';

            // Check category filter
            const matchesCategory = currentFilter === 'all' || category === currentFilter;

            // Check subcategory filter (only applies to med-surg)
            const matchesSubcategory = currentSubcategory === 'all' ||
                                       subcategory === currentSubcategory ||
                                       currentFilter !== 'med-surg';

            // Check search term
            const matchesSearch = !currentSearchTerm ||
                                  title.includes(currentSearchTerm) ||
                                  description.includes(currentSearchTerm);

            // Get product ID for quick filter checks
            const checkoutLink = card.querySelector('a[href*="checkout.html"]');
            let productId = '';
            if (checkoutLink) {
                try {
                    const url = new URL(checkoutLink.href, window.location.origin);
                    productId = url.searchParams.get('product') || '';
                } catch (e) {}
            }

            // Check quick filter (popular or recently viewed)
            let matchesQuickFilter = true;
            if (currentQuickFilter === 'popular') {
                matchesQuickFilter = popularGuides.includes(productId);
            } else if (currentQuickFilter === 'recently-viewed') {
                const recentlyViewed = getRecentlyViewed();
                matchesQuickFilter = recentlyViewed.includes(productId);
            }

            if (matchesCategory && matchesSubcategory && matchesSearch && matchesQuickFilter) {
                matchingGuides.push(card);
            }
        });

        // Sort matching guides
        sortGuides(matchingGuides);

        const totalMatching = matchingGuides.length;

        // Show/hide guides based on pagination
        guideCards.forEach(card => {
            card.style.display = 'none';
        });

        // Reorder guides in DOM based on sort order
        if (currentSort !== 'default' && guidesGrid) {
            matchingGuides.forEach(card => {
                guidesGrid.appendChild(card);
            });
        }

        matchingGuides.forEach((card, index) => {
            if (index < visibleGuidesCount) {
                card.style.display = 'flex';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10 + (index * 30)); // Staggered animation
            }
        });

        // Update Show More button for guides
        updateShowMoreButton(totalMatching);

        // Update search results count
        if (searchResultsCount) {
            if (currentSearchTerm) {
                searchResultsCount.textContent = `${totalMatching} guide${totalMatching !== 1 ? 's' : ''} found`;
                searchResultsCount.style.display = 'inline';
            } else {
                searchResultsCount.style.display = 'none';
            }
        }

        // Show/hide empty state
        if (emptyState) {
            if (totalMatching === 0 && currentSearchTerm) {
                emptyState.style.display = 'flex';
                if (emptyStateTerm) {
                    emptyStateTerm.textContent = currentSearchTerm;
                }
                if (guidesGrid) {
                    guidesGrid.style.display = 'none';
                }
                if (showMoreContainer) {
                    showMoreContainer.style.display = 'none';
                }
            } else {
                emptyState.style.display = 'none';
                if (guidesGrid && currentShopType === 'guides') {
                    guidesGrid.style.display = 'grid';
                }
            }
        }
    }

    // Sort guides based on current sort option
    function sortGuides(guides) {
        if (currentSort === 'default') {
            // Keep original DOM order by not sorting
            return;
        }

        guides.sort((a, b) => {
            const titleA = a.querySelector('h4')?.textContent || '';
            const titleB = b.querySelector('h4')?.textContent || '';
            const priceA = parseFloat(a.querySelector('.guide-price')?.textContent.replace('$', '') || 5.99);
            const priceB = parseFloat(b.querySelector('.guide-price')?.textContent.replace('$', '') || 5.99);

            // Get product IDs for popularity check
            const linkA = a.querySelector('a[href*="checkout.html"]');
            const linkB = b.querySelector('a[href*="checkout.html"]');
            let productIdA = '';
            let productIdB = '';

            if (linkA) {
                try {
                    const urlA = new URL(linkA.href, window.location.origin);
                    productIdA = urlA.searchParams.get('product') || '';
                } catch (e) {}
            }
            if (linkB) {
                try {
                    const urlB = new URL(linkB.href, window.location.origin);
                    productIdB = urlB.searchParams.get('product') || '';
                } catch (e) {}
            }

            switch (currentSort) {
                case 'name-asc':
                    return titleA.localeCompare(titleB);
                case 'name-desc':
                    return titleB.localeCompare(titleA);
                case 'price-asc':
                    return priceA - priceB;
                case 'price-desc':
                    return priceB - priceA;
                case 'popular':
                    // Popular items first
                    const isPopularA = popularGuides.includes(productIdA);
                    const isPopularB = popularGuides.includes(productIdB);
                    if (isPopularA && !isPopularB) return -1;
                    if (!isPopularA && isPopularB) return 1;
                    // Secondary sort by name
                    return titleA.localeCompare(titleB);
                default:
                    return 0;
            }
        });
    }

    // Sort select change handler
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            currentSort = this.value;
            filterGuides();
        });
    }

    // Update Show More button state for guides
    function updateShowMoreButton(totalMatching) {
        if (!showMoreContainer || !showMoreBtn) return;

        const remainingItems = totalMatching - visibleGuidesCount;

        if (remainingItems > 0) {
            showMoreContainer.style.display = 'block';
            showMoreBtn.disabled = false;
            showMoreBtn.innerHTML = '<i class="fas fa-chevron-down"></i> Show More Guides';
            if (showMoreCount) {
                showMoreCount.textContent = `Showing ${Math.min(visibleGuidesCount, totalMatching)} of ${totalMatching} guides`;
            }
        } else {
            if (totalMatching > GUIDES_PER_PAGE) {
                // All items shown
                showMoreContainer.style.display = 'block';
                showMoreBtn.disabled = true;
                showMoreBtn.innerHTML = '<i class="fas fa-check"></i> All Guides Shown';
                if (showMoreCount) {
                    showMoreCount.textContent = `Showing all ${totalMatching} guides`;
                }
            } else {
                // Few items, hide button entirely
                showMoreContainer.style.display = 'none';
            }
        }
    }

    // Filter packages with Show More pagination
    function filterPackages(resetPagination = true) {
        if (resetPagination) {
            visiblePackagesCount = PACKAGES_PER_PAGE;
        }

        // Get all matching packages
        const matchingPackages = [];

        packageCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const matchesCategory = currentFilter === 'all' || category === currentFilter;

            if (matchesCategory) {
                matchingPackages.push(card);
            }
        });

        const totalMatching = matchingPackages.length;

        // Show/hide packages based on pagination
        packageCards.forEach(card => {
            card.style.display = 'none';
        });

        matchingPackages.forEach((card, index) => {
            if (index < visiblePackagesCount) {
                card.style.display = 'block';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10 + (index * 50)); // Staggered animation
            }
        });

        // Update Show More button for packages
        updateShowMorePackagesButton(totalMatching);
    }

    // Update Show More button state for packages
    function updateShowMorePackagesButton(totalMatching) {
        if (!showMorePackagesContainer || !showMorePackagesBtn) return;

        const remainingItems = totalMatching - visiblePackagesCount;

        if (remainingItems > 0) {
            showMorePackagesContainer.style.display = 'block';
            showMorePackagesBtn.disabled = false;
            showMorePackagesBtn.innerHTML = '<i class="fas fa-chevron-down"></i> Show More Classes';
            if (showMorePackagesCount) {
                showMorePackagesCount.textContent = `Showing ${Math.min(visiblePackagesCount, totalMatching)} of ${totalMatching} classes`;
            }
        } else {
            if (totalMatching > PACKAGES_PER_PAGE) {
                // All items shown
                showMorePackagesContainer.style.display = 'block';
                showMorePackagesBtn.disabled = true;
                showMorePackagesBtn.innerHTML = '<i class="fas fa-check"></i> All Classes Shown';
                if (showMorePackagesCount) {
                    showMorePackagesCount.textContent = `Showing all ${totalMatching} classes`;
                }
            } else {
                // Few items, hide button entirely
                showMorePackagesContainer.style.display = 'none';
            }
        }
    }

    // Show More button click handler for guides
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', function() {
            visibleGuidesCount += GUIDES_PER_PAGE;
            filterGuides(false); // Don't reset pagination
        });
    }

    // Show More button click handler for packages
    if (showMorePackagesBtn) {
        showMorePackagesBtn.addEventListener('click', function() {
            visiblePackagesCount += PACKAGES_PER_PAGE;
            filterPackages(false); // Don't reset pagination
        });
    }

    // Shop Type Toggle (Guides vs Packages)
    shopTypeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const shopType = this.getAttribute('data-shop-type');
            currentShopType = shopType;

            // Update active state on shop type buttons
            shopTypeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Toggle grid visibility
            if (shopType === 'guides') {
                guidesGrid.style.display = 'grid';
                packagesGrid.style.display = 'none';
                categoryFilterSection.style.display = 'block';
                if (packageCalloutSection) packageCalloutSection.style.display = 'block';
                if (packageComparison) packageComparison.style.display = 'none';
                if (emptyState) emptyState.style.display = 'none';
                if (searchContainer) searchContainer.style.display = 'flex';
                if (quickFiltersSection) quickFiltersSection.style.display = 'block';
                // Show guides Show More, hide packages Show More
                if (showMorePackagesContainer) showMorePackagesContainer.style.display = 'none';

                // Update header
                categoryTitle.textContent = 'All Study Guides';
                categoryDescription.textContent = 'Browse our complete collection of nursing study guides';

                // Reset filters and sort
                currentFilter = 'all';
                currentSubcategory = 'all';
                currentSearchTerm = '';
                currentSort = 'default';
                if (searchInput) searchInput.value = '';
                if (searchClear) searchClear.style.display = 'none';
                if (searchResultsCount) searchResultsCount.style.display = 'none';
                if (sortSelect) sortSelect.value = 'default';
                // Reset quick filters
                currentQuickFilter = null;
                if (popularBtn) popularBtn.classList.remove('active');
                if (recentlyViewedBtn) recentlyViewedBtn.classList.remove('active');
                if (subcategoryChips) {
                    subcategoryChips.classList.remove('visible');
                }

                // Reset filter buttons
                filterButtons.forEach(btn => {
                    if (btn.getAttribute('data-filter') === 'all') {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });

                // Reset subcategory buttons
                subcategoryButtons.forEach(btn => {
                    if (btn.getAttribute('data-subcategory') === 'all') {
                        btn.classList.add('active');
                        btn.style.background = 'linear-gradient(135deg, #2E86AB 0%, #A23B72 100%)';
                        btn.style.color = '#ffffff';
                        btn.style.borderColor = 'transparent';
                        btn.style.boxShadow = '0 4px 14px rgba(46, 134, 171, 0.35)';
                    } else {
                        btn.classList.remove('active');
                        btn.style.background = '#ffffff';
                        btn.style.color = '#1f2937';
                        btn.style.borderColor = '#e5e7eb';
                        btn.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.06)';
                    }
                });

                // Hide subcategory chips
                if (subcategoryChips) {
                    subcategoryChips.style.display = 'none';
                }

                filterGuides();
            } else if (shopType === 'packages') {
                guidesGrid.style.display = 'none';
                packagesGrid.style.display = 'grid';
                categoryFilterSection.style.display = 'block';
                if (packageCalloutSection) packageCalloutSection.style.display = 'none';
                if (packageComparison) packageComparison.style.display = 'block';
                if (emptyState) emptyState.style.display = 'none';
                if (searchContainer) searchContainer.style.display = 'none';
                if (quickFiltersSection) quickFiltersSection.style.display = 'none';
                // Hide guides Show More (it's inside guides-grid-wrapper which is hidden, but ensure it's hidden)
                if (showMoreContainer) showMoreContainer.style.display = 'none';

                // Update header
                categoryTitle.textContent = 'Class Packages';
                categoryDescription.textContent = 'Choose Full ($49.99) or Lite ($24.99) packages for each nursing class';

                // Reset filter to "All"
                currentFilter = 'all';
                filterButtons.forEach(btn => {
                    if (btn.getAttribute('data-filter') === 'all') {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });

                // Hide subcategory chips for packages
                if (subcategoryChips) {
                    subcategoryChips.style.display = 'none';
                    subcategoryChips.classList.remove('visible');
                }

                // Filter packages with pagination
                filterPackages();
            }
        });
    });

    // "View Packages" button click handler
    if (switchToPackagesBtn) {
        switchToPackagesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Trigger click on packages button
            const packagesBtn = document.getElementById('shop-packages-btn');
            if (packagesBtn) packagesBtn.click();
        });
    }

    // Update filter functionality to work with both guides and packages
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            currentFilter = filter;

            // Clear quick filter when category is selected
            currentQuickFilter = null;
            if (popularBtn) popularBtn.classList.remove('active');
            if (recentlyViewedBtn) recentlyViewedBtn.classList.remove('active');

            // Update active state on filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Update category header
            if (categories[filter]) {
                if (currentShopType === 'packages') {
                    categoryTitle.textContent = filter === 'all' ? 'Class Packages' : categories[filter].title + ' Package';
                    categoryDescription.textContent = filter === 'all'
                        ? 'Choose Full ($49.99) or Lite ($24.99) packages for each nursing class'
                        : 'Full Package ($49.99) or Lite Package ($24.99)';
                } else {
                    categoryTitle.textContent = categories[filter].title;
                    categoryDescription.textContent = categories[filter].description;
                }
            }

            // Show/hide subcategory chips based on filter
            if (subcategoryChips) {
                if (filter === 'med-surg' && currentShopType === 'guides') {
                    subcategoryChips.style.setProperty('display', 'flex', 'important');
                    subcategoryChips.classList.add('visible');
                } else {
                    subcategoryChips.style.display = 'none';
                    subcategoryChips.classList.remove('visible');
                    // Reset subcategory filter when leaving med-surg
                    currentSubcategory = 'all';
                    subcategoryButtons.forEach(btn => {
                        if (btn.getAttribute('data-subcategory') === 'all') {
                            btn.classList.add('active');
                            // Apply active style
                            btn.style.background = 'linear-gradient(135deg, #2E86AB 0%, #A23B72 100%)';
                            btn.style.color = '#ffffff';
                            btn.style.borderColor = 'transparent';
                            btn.style.boxShadow = '0 4px 14px rgba(46, 134, 171, 0.35)';
                        } else {
                            btn.classList.remove('active');
                            // Reset to inactive style
                            btn.style.background = '#ffffff';
                            btn.style.color = '#1f2937';
                            btn.style.borderColor = '#e5e7eb';
                            btn.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.06)';
                        }
                    });
                }
            }

            // Filter cards based on current shop type
            if (currentShopType === 'guides') {
                filterGuides();
            } else if (currentShopType === 'packages') {
                // Filter packages with pagination
                filterPackages();
            }

        });
    });

    // Initialize pagination on page load - show only first 12 guides
    filterGuides();
});

/**
 * Convert existing "Buy Guide" links to "Add to Cart" buttons
 */
function initializeAddToCartButtons() {
    // Product ID to name mapping (for individual guides)
    const productNames = {
        // Cardiovascular (6)
        'heart-failure': 'Heart Failure Guide',
        'myocardial-infarction': 'Myocardial Infarction Guide',
        'arrhythmias': 'Arrhythmias Guide',
        'hypertension': 'Hypertension Guide',
        'coronary-artery-disease': 'Coronary Artery Disease Guide',
        'peripheral-vascular-disease': 'Peripheral Vascular Disease Guide',
        // Respiratory (6)
        'copd': 'COPD Guide',
        'asthma': 'Asthma Guide',
        'pneumonia': 'Pneumonia Guide',
        'oxygen-therapy': 'Oxygen Therapy Guide',
        'tuberculosis': 'Tuberculosis Guide',
        'chest-tubes': 'Chest Tubes & Thoracic Care Guide',
        // Endocrine (5)
        'diabetes-type1': 'Diabetes Type 1 Guide',
        'diabetes-type2': 'Diabetes Type 2 Guide',
        'thyroid-disorders': 'Thyroid Disorders Guide',
        'adrenal-disorders': 'Adrenal Disorders Guide',
        'pituitary-disorders': 'Pituitary Disorders Guide',
        // Neurological (6)
        'stroke': 'Stroke Guide',
        'seizures': 'Seizures & Epilepsy Guide',
        'spinal-cord-injury': 'Spinal Cord Injuries Guide',
        'traumatic-brain-injury': 'Traumatic Brain Injury Guide',
        'meningitis': 'Meningitis & Encephalitis Guide',
        'parkinsons-ms': "Parkinson's & Multiple Sclerosis Guide",
        // Renal (6)
        'acute-kidney-injury': 'Acute Kidney Injury Guide',
        'chronic-kidney-disease': 'Chronic Kidney Disease Guide',
        'dialysis': 'Dialysis Guide',
        'urinary-tract-infections': 'Urinary Tract Infections Guide',
        'kidney-stones': 'Kidney Stones Guide',
        'fluid-electrolytes': 'Fluid & Electrolyte Imbalances Guide',
        // Gastrointestinal (6)
        'gi-bleeding': 'GI Bleeding Guide',
        'bowel-obstruction': 'Bowel Obstruction Guide',
        'liver-disease': 'Liver Disease & Cirrhosis Guide',
        'pancreatitis': 'Pancreatitis Guide',
        'inflammatory-bowel-disease': 'Inflammatory Bowel Disease Guide',
        'gerd-peptic-ulcer': 'GERD & Peptic Ulcer Disease Guide',
        // Musculoskeletal (5)
        'fractures': 'Fractures Guide',
        'arthritis': 'Arthritis Guide',
        'hip-knee-replacement': 'Hip & Knee Replacement Guide',
        'osteoporosis': 'Osteoporosis Guide',
        'amputation-care': 'Amputation Care Guide',
        // Medications (6)
        'cardiac-medications': 'Cardiac Medications Guide',
        'antibiotics-antivirals': 'Antibiotics & Antivirals Guide',
        'pain-management': 'Pain Management Guide',
        'iv-medications': 'IV Medications & Solutions Guide',
        'psychotropic-medications': 'Psychotropic Medications Guide',
        'emergency-medications': 'Emergency Medications Guide',
        // Fundamentals (5)
        'assessment-skills': 'Assessment Skills Guide',
        'infection-control': 'Infection Control Guide',
        'documentation-charting': 'Documentation & Charting Guide',
        'patient-safety': 'Patient Safety Guide',
        'mobility-transfers': 'Mobility & Transfers Guide',
        // Maternal/OB (4)
        'labor-delivery': 'Labor & Delivery Guide',
        'postpartum-care': 'Postpartum Care Guide',
        'high-risk-pregnancy': 'High-Risk Pregnancy Guide',
        'antepartum-care': 'Antepartum Care Guide',
        // Pediatric (4)
        'growth-development': 'Growth & Development Guide',
        'pediatric-emergencies': 'Pediatric Emergencies Guide',
        'infant-care': 'Infant Care Guide',
        'adolescent-health': 'Adolescent Health Guide',
        // Mental Health (5)
        'depression-anxiety': 'Depression & Anxiety Guide',
        'crisis-intervention': 'Crisis Intervention Guide',
        'therapeutic-communication': 'Therapeutic Communication Guide',
        'substance-abuse': 'Substance Abuse Guide',
        'eating-disorders': 'Eating Disorders Guide'
    };

    // Find all "Buy Guide" links in guide cards
    const buyLinks = document.querySelectorAll('.guide-card .guide-footer a[href^="checkout.html"]');

    buyLinks.forEach(link => {
        // Extract product ID from URL
        const url = new URL(link.href, window.location.origin);
        const productId = url.searchParams.get('product');

        if (!productId) return;

        // Create new button
        const button = document.createElement('button');
        button.className = 'add-to-cart-btn';
        button.setAttribute('data-product-id', productId);
        button.setAttribute('data-product-name', productNames[productId] || productId);
        button.setAttribute('data-product-type', 'individual');
        button.setAttribute('data-product-price', '5.99');
        button.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';

        // Add click handler
        button.addEventListener('click', handleAddToCartClick);

        // Replace link with button
        link.parentNode.replaceChild(button, link);
    });

    // Update button states based on cart contents
    if (typeof cartUI !== 'undefined') {
        setTimeout(() => {
            cartUI.updateAddToCartButtons();
        }, 200);
    }
}

/**
 * Initialize package add-to-cart buttons
 */
function initializePackageButtons() {
    // Package product data
    const packages = {
        'fundamentals-full': { name: 'Fundamentals Full Package', type: 'full-package', price: 49.99 },
        'fundamentals-lite': { name: 'Fundamentals Lite Package', type: 'lite-package', price: 24.99 },
        'medsurg-full': { name: 'Med-Surg Full Package', type: 'full-package', price: 49.99 },
        'medsurg-lite': { name: 'Med-Surg Lite Package', type: 'lite-package', price: 24.99 },
        'pharmacology-full': { name: 'Pharmacology Full Package', type: 'full-package', price: 49.99 },
        'pharmacology-lite': { name: 'Pharmacology Lite Package', type: 'lite-package', price: 24.99 },
        'maternal-full': { name: 'Maternal/OB Full Package', type: 'full-package', price: 49.99 },
        'maternal-lite': { name: 'Maternal/OB Lite Package', type: 'lite-package', price: 24.99 },
        'pediatrics-full': { name: 'Pediatrics Full Package', type: 'full-package', price: 49.99 },
        'pediatrics-lite': { name: 'Pediatrics Lite Package', type: 'lite-package', price: 24.99 },
        'mental-health-full': { name: 'Mental Health Full Package', type: 'full-package', price: 49.99 },
        'mental-health-lite': { name: 'Mental Health Lite Package', type: 'lite-package', price: 24.99 }
    };

    // Find all package links
    const packageLinks = document.querySelectorAll('.package-card a[href^="checkout.html"]');

    packageLinks.forEach(link => {
        // Extract product ID from URL
        const url = new URL(link.href, window.location.origin);
        const productId = url.searchParams.get('product');

        if (!productId || !packages[productId]) return;

        const pkg = packages[productId];

        // Create new button
        const button = document.createElement('button');
        button.className = 'add-to-cart-btn';
        button.setAttribute('data-product-id', productId);
        button.setAttribute('data-product-name', pkg.name);
        button.setAttribute('data-product-type', pkg.type);
        button.setAttribute('data-product-price', pkg.price.toString());

        // Preserve original button text for packages
        const isFullPackage = productId.includes('-full');
        button.innerHTML = isFullPackage
            ? '<i class="fas fa-cart-plus"></i> Get Full Package'
            : '<i class="fas fa-cart-plus"></i> Get Lite Package';

        // Add click handler
        button.addEventListener('click', handleAddToCartClick);

        // Replace link with button
        link.parentNode.replaceChild(button, link);
    });
}

/**
 * Handle add to cart button click
 * @param {Event} e - Click event
 */
async function handleAddToCartClick(e) {
    const button = e.currentTarget;
    const productId = button.dataset.productId;
    const productName = button.dataset.productName;
    const productType = button.dataset.productType;
    const price = parseFloat(button.dataset.price || button.dataset.productPrice);

    if (typeof cartUI !== 'undefined') {
        await cartUI.addToCart(productId, productName, productType, price, button);
    } else {
        // Fallback if cart UI not loaded
        console.error('Cart UI not available');
        alert('Unable to add to cart. Please try again.');
    }
}

/**
 * Initialize Quick View buttons on guide cards
 */
function initializeQuickView() {
    const guideCards = document.querySelectorAll('.guide-card');
    const modal = document.getElementById('quick-view-modal');
    const overlay = document.getElementById('quick-view-overlay');
    const closeBtn = document.getElementById('quick-view-close');
    const addToCartBtn = document.getElementById('quick-view-add-to-cart');

    // Category display names
    const categoryNames = {
        'med-surg': 'Medical-Surgical',
        'pharmacology': 'Pharmacology',
        'fundamentals': 'Fundamentals',
        'maternity': 'Maternity/OB',
        'pediatrics': 'Pediatrics',
        'mental-health': 'Mental Health'
    };

    // Subcategory display names
    const subcategoryNames = {
        'cardiovascular': 'Cardiovascular',
        'respiratory': 'Respiratory',
        'endocrine': 'Endocrine',
        'neurological': 'Neurological',
        'renal': 'Renal',
        'gastrointestinal': 'Gastrointestinal',
        'musculoskeletal': 'Musculoskeletal'
    };

    let currentProductId = null;
    let currentProductName = null;

    // Add Quick View button to each guide card
    guideCards.forEach(card => {
        // Create quick view button
        const quickViewBtn = document.createElement('button');
        quickViewBtn.className = 'quick-view-btn';
        quickViewBtn.title = 'Quick View';
        quickViewBtn.innerHTML = '<i class="fas fa-eye"></i>';

        // Insert at the beginning of the card
        card.insertBefore(quickViewBtn, card.firstChild);

        // Click handler for quick view button
        quickViewBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            openQuickView(card);
        });
    });

    // Open Quick View modal
    function openQuickView(card) {
        const title = card.querySelector('h4')?.textContent || 'Study Guide';
        const description = card.querySelector('p')?.textContent || '';
        const category = card.getAttribute('data-category') || '';
        const subcategory = card.getAttribute('data-subcategory') || '';
        const iconImg = card.querySelector('.guide-icon img');
        const iconI = card.querySelector('.guide-icon i');

        // Get product ID from the checkout link
        const checkoutLink = card.querySelector('a[href*="checkout.html"]');
        let productId = '';
        if (checkoutLink) {
            const url = new URL(checkoutLink.href, window.location.origin);
            productId = url.searchParams.get('product') || '';
        }

        currentProductId = productId;
        currentProductName = title;

        // Track as recently viewed
        if (productId && typeof window.addToRecentlyViewed === 'function') {
            window.addToRecentlyViewed(productId);
        }

        // Update modal content
        document.getElementById('quick-view-title').textContent = title;
        document.getElementById('quick-view-description').textContent = description;

        // Set category badge
        let categoryDisplay = categoryNames[category] || category;
        if (subcategory && subcategoryNames[subcategory]) {
            categoryDisplay = subcategoryNames[subcategory];
        }
        document.getElementById('quick-view-category').textContent = categoryDisplay;

        // Set icon
        const iconContainer = document.getElementById('quick-view-icon');
        if (iconImg) {
            iconContainer.innerHTML = `<img src="${iconImg.src}" alt="${title}">`;
        } else if (iconI) {
            iconContainer.innerHTML = `<i class="${iconI.className}"></i>`;
        } else {
            iconContainer.innerHTML = '<i class="fas fa-book-medical"></i>';
        }

        // Show modal
        modal.classList.add('visible');
        document.body.style.overflow = 'hidden';

        // Update add to cart button state
        updateQuickViewCartButton();
    }

    // Update cart button state in modal
    function updateQuickViewCartButton() {
        if (!addToCartBtn || !currentProductId) return;

        // Check if item is already in cart
        if (typeof cartService !== 'undefined' && cartService.isInCart && cartService.isInCart(currentProductId)) {
            addToCartBtn.innerHTML = '<i class="fas fa-check"></i> In Cart';
            addToCartBtn.classList.add('added');
            addToCartBtn.disabled = true;
        } else {
            addToCartBtn.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
            addToCartBtn.classList.remove('added');
            addToCartBtn.disabled = false;
        }
    }

    // Close Quick View modal
    function closeQuickView() {
        modal.classList.remove('visible');
        document.body.style.overflow = '';
        currentProductId = null;
        currentProductName = null;
    }

    // Event listeners for closing modal
    if (closeBtn) {
        closeBtn.addEventListener('click', closeQuickView);
    }
    if (overlay) {
        overlay.addEventListener('click', closeQuickView);
    }

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('visible')) {
            closeQuickView();
        }
    });

    // Add to cart from modal
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', async function() {
            if (!currentProductId || !currentProductName) return;

            if (typeof cartUI !== 'undefined') {
                await cartUI.addToCart(currentProductId, currentProductName, 'individual', 5.99, addToCartBtn);
                updateQuickViewCartButton();
            }
        });
    }
}

/**
 * Initialize dynamic savings badges
 * Calculates savings based on actual guide count in each category
 */
function initializeSavingsBadges() {
    const GUIDE_PRICE = 5.99;
    const FULL_PACKAGE_PRICE = 49.99;

    // Count guides in each category
    const guideCards = document.querySelectorAll('.guide-card');
    const categoryCounts = {};

    guideCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (category) {
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        }
    });

    console.log('Guide counts by category:', categoryCounts);

    // Update savings badges
    const savingsBadges = document.querySelectorAll('.savings-badge[data-category]');

    savingsBadges.forEach(badge => {
        const category = badge.getAttribute('data-category');
        const guideCount = categoryCounts[category] || 0;

        if (guideCount === 0) {
            badge.style.display = 'none';
            return;
        }

        const individualTotal = guideCount * GUIDE_PRICE;
        const savings = individualTotal - FULL_PACKAGE_PRICE;
        const savingsPercent = Math.round((savings / individualTotal) * 100);

        // Only show badge if there are actual savings
        if (savingsPercent > 0) {
            badge.textContent = `Save ${savingsPercent}%`;
            badge.setAttribute('data-tooltip',
                `${guideCount} guides at $${GUIDE_PRICE} each = $${individualTotal.toFixed(2)}. You save $${savings.toFixed(2)}!`
            );

            // Add best-value class for highest savings (over 50%)
            if (savingsPercent >= 50) {
                badge.classList.add('best-value');
            }
        } else {
            // No savings - hide badge or show "Bundle Deal"
            badge.textContent = 'Bundle Deal';
            badge.setAttribute('data-tooltip',
                `Get all ${guideCount} ${category} guides plus NCLEX questions & reference sheets!`
            );
        }
    });
}
