// Store Page JavaScript
// Sidebar Filter Functionality, Shop Type Toggle & Cart Integration

console.log('=== STORE-SCRIPT.JS FILE LOADED ===');

document.addEventListener('DOMContentLoaded', function() {
    console.log('Store script DOMContentLoaded fired');

    // Initialize mobile filter toggle
    initializeMobileFilterToggle();

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

    // Show More functionality for Packages - show all 6 packages
    const PACKAGES_PER_PAGE = 6; // Show all packages (no Show More needed)
    let visiblePackagesCount = PACKAGES_PER_PAGE;
    const showMorePackagesBtn = document.getElementById('show-more-packages-btn');
    const showMorePackagesContainer = document.getElementById('show-more-packages-container');
    const showMorePackagesCount = document.getElementById('show-more-packages-count');

    // Package type toggle (Lite vs Full)
    const packageToggleContainer = document.getElementById('package-toggle-container');
    const packageTypeToggle = document.getElementById('package-type-toggle');
    const toggleLabelLite = document.getElementById('toggle-label-lite');
    const toggleLabelFull = document.getElementById('toggle-label-full');
    let currentPackageType = 'lite'; // Default to lite packages

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

    // Package type toggle functionality (Lite vs Full)
    if (packageTypeToggle) {
        packageTypeToggle.addEventListener('change', function() {
            currentPackageType = this.checked ? 'full' : 'lite';
            updatePackageToggleLabels();
            updatePackageCards();
            updatePackageSavingsBadges();
        });
    }

    // Update toggle label styles
    function updatePackageToggleLabels() {
        if (toggleLabelLite && toggleLabelFull) {
            if (currentPackageType === 'lite') {
                toggleLabelLite.classList.add('active');
                toggleLabelFull.classList.remove('active');
            } else {
                toggleLabelLite.classList.remove('active');
                toggleLabelFull.classList.add('active');
            }
        }
    }

    // Update package cards based on toggle state
    function updatePackageCards() {
        packageCards.forEach(card => {
            const liteProduct = card.dataset.liteProduct;
            const fullProduct = card.dataset.fullProduct;
            const litePrice = card.dataset.litePrice;
            const fullPrice = card.dataset.fullPrice;
            const liteIncludes = card.dataset.liteIncludes;
            const fullIncludes = card.dataset.fullIncludes;
            const cardTitle = card.querySelector('h3')?.textContent || 'Package';

            const priceEl = card.querySelector('.package-price');
            const addToCartBtn = card.querySelector('.package-add-to-cart');
            const includesListEl = card.querySelector('.package-includes-list');

            if (currentPackageType === 'lite') {
                if (priceEl) priceEl.textContent = '$' + litePrice;
                if (includesListEl && liteIncludes) includesListEl.textContent = liteIncludes;
                if (addToCartBtn) {
                    addToCartBtn.dataset.product = liteProduct;
                    addToCartBtn.dataset.name = cardTitle + ' - Lite';
                    // Reset button state
                    addToCartBtn.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
                    addToCartBtn.classList.remove('added');
                    addToCartBtn.disabled = false;
                    // Check if already in cart
                    if (typeof cartService !== 'undefined' && cartService.isInCart && cartService.isInCart(liteProduct)) {
                        addToCartBtn.innerHTML = '<i class="fas fa-check"></i> In Cart';
                        addToCartBtn.classList.add('added');
                        addToCartBtn.disabled = true;
                    }
                }
            } else {
                if (priceEl) priceEl.textContent = '$' + fullPrice;
                if (includesListEl && fullIncludes) includesListEl.textContent = fullIncludes;
                if (addToCartBtn) {
                    addToCartBtn.dataset.product = fullProduct;
                    addToCartBtn.dataset.name = cardTitle + ' - Full';
                    // Reset button state
                    addToCartBtn.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
                    addToCartBtn.classList.remove('added');
                    addToCartBtn.disabled = false;
                    // Check if already in cart
                    if (typeof cartService !== 'undefined' && cartService.isInCart && cartService.isInCart(fullProduct)) {
                        addToCartBtn.innerHTML = '<i class="fas fa-check"></i> In Cart';
                        addToCartBtn.classList.add('added');
                        addToCartBtn.disabled = true;
                    }
                }
            }
        });
    }

    // Update savings badges based on toggle state
    function updatePackageSavingsBadges() {
        const GUIDE_PRICE = 5.99;
        const LITE_PRICE = 24.99;
        const FULL_PRICE = 49.99;

        // Count guides in each category
        const categoryCounts = {};
        document.querySelectorAll('.guide-card').forEach(card => {
            const category = card.getAttribute('data-category');
            if (category) {
                categoryCounts[category] = (categoryCounts[category] || 0) + 1;
            }
        });

        // Update each badge
        const badges = document.querySelectorAll('.package-pricing-simple .savings-badge');
        badges.forEach(badge => {
            const category = badge.getAttribute('data-category');
            const guideCount = categoryCounts[category] || 0;
            const individualTotal = guideCount * GUIDE_PRICE;

            if (currentPackageType === 'lite') {
                // Lite package savings calculation
                const savings = individualTotal - LITE_PRICE;
                const savingsPercent = Math.round((savings / individualTotal) * 100);

                if (savings > 0 && savingsPercent >= 50) {
                    badge.textContent = 'SAVE ' + savingsPercent + '%';
                    badge.classList.add('best-value');
                    badge.classList.remove('hidden');
                    badge.setAttribute('data-tooltip',
                        'Buying ' + guideCount + ' guides separately = $' + individualTotal.toFixed(2) + '. ' +
                        'Lite Package saves you $' + savings.toFixed(2) + '!'
                    );
                    badge.style.display = 'inline-block';
                } else if (savings > 0) {
                    badge.textContent = 'SAVE ' + savingsPercent + '%';
                    badge.classList.remove('best-value');
                    badge.classList.remove('hidden');
                    badge.setAttribute('data-tooltip',
                        'Buying ' + guideCount + ' guides separately = $' + individualTotal.toFixed(2) + '. ' +
                        'Lite Package saves you $' + savings.toFixed(2) + '!'
                    );
                    badge.style.display = 'inline-block';
                } else {
                    badge.textContent = 'BUNDLE DEAL';
                    badge.classList.remove('best-value');
                    badge.setAttribute('data-tooltip',
                        'Get core ' + category + ' guides plus essential topics covered!'
                    );
                    badge.style.display = 'inline-block';
                }
            } else {
                // Full package savings calculation
                const savings = individualTotal - FULL_PRICE;
                const savingsPercent = Math.round((savings / individualTotal) * 100);

                if (savings > 0 && savingsPercent >= 50) {
                    badge.textContent = 'SAVE ' + savingsPercent + '%';
                    badge.classList.add('best-value');
                    badge.classList.remove('hidden');
                    badge.setAttribute('data-tooltip',
                        'Buying ' + guideCount + ' guides separately = $' + individualTotal.toFixed(2) + '. ' +
                        'Full Package saves you $' + savings.toFixed(2) + '!'
                    );
                    badge.style.display = 'inline-block';
                } else if (savings > 0) {
                    badge.textContent = 'SAVE ' + savingsPercent + '%';
                    badge.classList.remove('best-value');
                    badge.classList.remove('hidden');
                    badge.setAttribute('data-tooltip',
                        'Buying ' + guideCount + ' guides separately = $' + individualTotal.toFixed(2) + '. ' +
                        'Full Package saves you $' + savings.toFixed(2) + '!'
                    );
                    badge.style.display = 'inline-block';
                } else {
                    badge.textContent = 'BUNDLE DEAL';
                    badge.classList.remove('best-value');
                    badge.setAttribute('data-tooltip',
                        'Get all ' + guideCount + ' ' + category + ' guides plus NCLEX questions & reference sheets!'
                    );
                    badge.style.display = 'inline-block';
                }
            }
        });
    }

    // Initialize toggle labels on load
    updatePackageToggleLabels();

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
                if (packageToggleContainer) packageToggleContainer.classList.remove('visible');
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
                if (packageToggleContainer) packageToggleContainer.classList.add('visible');
                if (emptyState) emptyState.style.display = 'none';
                if (searchContainer) searchContainer.style.display = 'none';
                if (quickFiltersSection) quickFiltersSection.style.display = 'none';
                // Hide guides Show More (it's inside guides-grid-wrapper which is hidden, but ensure it's hidden)
                if (showMoreContainer) showMoreContainer.style.display = 'none';

                // Update header
                categoryTitle.textContent = 'Class Packages';
                categoryDescription.textContent = 'Use the toggle below to switch between Lite ($24.99) and Full ($49.99) packages';

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

                // Update package cards and badges based on current toggle state
                updatePackageCards();
                updatePackageSavingsBadges();

                // Filter packages (show all 6)
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
    // Package product data mapping
    const packagePrices = {
        'fundamentals-full': 49.99, 'fundamentals-lite': 24.99,
        'medsurg-full': 49.99, 'medsurg-lite': 24.99,
        'pharmacology-full': 49.99, 'pharmacology-lite': 24.99,
        'maternal-full': 49.99, 'maternal-lite': 24.99,
        'pediatrics-full': 49.99, 'pediatrics-lite': 24.99,
        'mental-health-full': 49.99, 'mental-health-lite': 24.99
    };

    // Find all package add-to-cart buttons (new simplified structure)
    const packageButtons = document.querySelectorAll('.package-add-to-cart');

    packageButtons.forEach(button => {
        button.addEventListener('click', async function() {
            const productId = this.dataset.product;
            const productName = this.dataset.name;
            const price = packagePrices[productId] || (productId.includes('-full') ? 49.99 : 24.99);
            const productType = productId.includes('-full') ? 'full-package' : 'lite-package';

            if (!productId) return;

            // Use cartUI if available
            if (typeof cartUI !== 'undefined') {
                await cartUI.addToCart(productId, productName, productType, price, this);
            } else {
                console.error('Cart UI not available');
                alert('Unable to add to cart. Please try again.');
            }
        });
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

    // Custom topics for each guide (nursing-focused learning objectives)
    const guideTopics = {
        // Cardiovascular
        'heart-failure': ['Identify left vs right-sided heart failure symptoms', 'Differentiate systolic and diastolic dysfunction', 'Prioritize nursing interventions for fluid overload'],
        'myocardial-infarction': ['Recognize STEMI vs NSTEMI presentation', 'Interpret cardiac biomarkers (troponin, CK-MB)', 'Understand tPA administration criteria'],
        'arrhythmias': ['Interpret common ECG rhythms', 'Identify life-threatening dysrhythmias', 'Know when to defibrillate vs cardiovert'],
        'hypertension': ['Classify hypertension stages accurately', 'Teach lifestyle modifications effectively', 'Recognize hypertensive crisis signs'],
        'coronary-artery-disease': ['Explain stable vs unstable angina', 'Identify modifiable risk factors', 'Prepare patients for cardiac catheterization'],
        'peripheral-vascular-disease': ['Differentiate arterial vs venous insufficiency', 'Assess ankle-brachial index (ABI)', 'Implement DVT prevention strategies'],

        // Respiratory
        'copd': ['Distinguish chronic bronchitis from emphysema', 'Manage oxygen therapy safely (avoid CO2 retention)', 'Teach pursed-lip breathing technique'],
        'asthma': ['Classify asthma severity levels', 'Differentiate rescue vs controller medications', 'Recognize status asthmaticus emergency'],
        'pneumonia': ['Compare community vs hospital-acquired pneumonia', 'Identify high-risk patient populations', 'Interpret chest X-ray findings'],
        'oxygen-therapy': ['Select appropriate oxygen delivery devices', 'Calculate FiO2 for different devices', 'Monitor for oxygen toxicity signs'],
        'tuberculosis': ['Distinguish latent vs active TB infection', 'Implement airborne isolation precautions', 'Understand RIPE therapy regimen'],
        'chest-tubes': ['Manage chest drainage systems safely', 'Recognize air leak vs tidaling', 'Know when to clamp chest tubes'],

        // Endocrine
        'diabetes-type1': ['Understand autoimmune pathophysiology', 'Calculate insulin dosing accurately', 'Recognize and treat DKA emergency'],
        'diabetes-type2': ['Explain insulin resistance mechanism', 'Compare oral hypoglycemic agents', 'Identify hyperosmolar hyperglycemic state (HHS)'],
        'thyroid-disorders': ['Differentiate hypo vs hyperthyroidism symptoms', 'Recognize thyroid storm emergency', 'Manage myxedema coma'],
        'adrenal-disorders': ['Compare Addison\'s vs Cushing\'s syndrome', 'Manage adrenal crisis emergency', 'Understand steroid tapering importance'],
        'pituitary-disorders': ['Differentiate SIADH vs diabetes insipidus', 'Monitor fluid balance accurately', 'Recognize hormone imbalance signs'],

        // Neurological
        'stroke': ['Use FAST assessment correctly', 'Differentiate ischemic vs hemorrhagic stroke', 'Know tPA inclusion/exclusion criteria'],
        'seizures': ['Classify seizure types accurately', 'Manage status epilepticus emergency', 'Implement seizure precautions'],
        'spinal-cord-injury': ['Identify level of injury implications', 'Recognize autonomic dysreflexia emergency', 'Prevent secondary complications'],
        'traumatic-brain-injury': ['Calculate Glasgow Coma Scale accurately', 'Monitor for increased ICP signs', 'Implement brain injury precautions'],
        'meningitis': ['Differentiate bacterial vs viral meningitis', 'Assess for meningeal signs (Kernig, Brudzinski)', 'Implement droplet precautions'],
        'parkinsons-ms': ['Recognize cardinal Parkinson\'s symptoms', 'Understand MS relapse patterns', 'Manage medication timing for Parkinson\'s'],

        // Renal
        'acute-kidney-injury': ['Classify prerenal, intrarenal, postrenal causes', 'Interpret BUN/creatinine ratios', 'Monitor fluid balance strictly'],
        'chronic-kidney-disease': ['Identify CKD stages by GFR', 'Manage dietary restrictions (K+, Na+, phosphorus)', 'Recognize uremic symptoms'],
        'dialysis': ['Compare hemodialysis vs peritoneal dialysis', 'Assess AV fistula properly (thrill, bruit)', 'Recognize dialysis complications'],
        'urinary-tract-infections': ['Differentiate lower vs upper UTI', 'Implement CAUTI prevention bundles', 'Interpret urinalysis results'],
        'kidney-stones': ['Identify stone types and causes', 'Manage acute renal colic pain', 'Teach prevention strategies'],
        'fluid-electrolytes': ['Recognize electrolyte imbalance symptoms', 'Calculate IV fluid rates', 'Prioritize potassium safety'],

        // Gastrointestinal
        'gi-bleeding': ['Differentiate upper vs lower GI bleed', 'Recognize hematemesis vs melena vs hematochezia', 'Prioritize hemodynamic stabilization'],
        'bowel-obstruction': ['Distinguish small vs large bowel obstruction', 'Manage NG tube decompression', 'Recognize strangulation signs'],
        'liver-disease': ['Assess for hepatic encephalopathy', 'Manage ascites and paracentesis', 'Understand portal hypertension complications'],
        'pancreatitis': ['Recognize Cullen\'s and Grey Turner\'s signs', 'Manage NPO and pain control', 'Monitor for systemic complications'],
        'inflammatory-bowel-disease': ['Compare Crohn\'s vs ulcerative colitis', 'Manage acute flare-ups', 'Provide ostomy care education'],
        'gerd-peptic-ulcer': ['Identify H. pylori treatment regimen', 'Teach PPI administration timing', 'Recognize perforation signs'],

        // Musculoskeletal
        'fractures': ['Identify fracture types and healing stages', 'Recognize compartment syndrome early', 'Implement neurovascular checks (5 P\'s)'],
        'arthritis': ['Compare osteoarthritis vs rheumatoid arthritis', 'Understand DMARD therapy', 'Teach joint protection techniques'],
        'hip-knee-replacement': ['Implement hip precautions correctly', 'Prevent DVT post-operatively', 'Manage pain and early mobility'],
        'osteoporosis': ['Interpret DEXA scan results', 'Teach bisphosphonate administration', 'Implement fall prevention strategies'],
        'amputation-care': ['Manage stump positioning and wrapping', 'Address phantom limb pain', 'Support prosthetic readiness'],

        // Pharmacology
        'cardiac-medications': ['Understand beta blocker mechanisms', 'Monitor ACE inhibitor side effects', 'Calculate diuretic effectiveness'],
        'antibiotics-antivirals': ['Match antibiotic to infection type', 'Recognize antibiotic resistance patterns', 'Monitor for adverse reactions'],
        'pain-management': ['Apply WHO pain ladder correctly', 'Recognize opioid toxicity signs', 'Implement multimodal analgesia'],
        'iv-medications': ['Verify IV compatibility', 'Calculate drip rates accurately', 'Recognize infiltration vs extravasation'],
        'psychotropic-medications': ['Understand SSRI mechanisms and side effects', 'Monitor for serotonin syndrome', 'Recognize extrapyramidal symptoms'],
        'emergency-medications': ['Know ACLS drug dosages', 'Understand vasopressor actions', 'Prioritize code medications'],

        // Fundamentals
        'assessment-skills': ['Perform systematic head-to-toe assessment', 'Interpret vital sign trends', 'Document findings accurately'],
        'infection-control': ['Apply standard and transmission-based precautions', 'Perform proper hand hygiene technique', 'Don and doff PPE correctly'],
        'documentation-charting': ['Use proper nursing documentation format', 'Avoid common charting errors', 'Maintain legal and ethical standards'],
        'patient-safety': ['Implement fall prevention protocols', 'Perform medication reconciliation', 'Report errors using proper channels'],
        'mobility-transfers': ['Use proper body mechanics', 'Select appropriate assistive devices', 'Implement safe patient handling'],

        // Maternity
        'labor-delivery': ['Identify stages and phases of labor', 'Interpret fetal heart rate patterns', 'Recognize labor complications'],
        'postpartum-care': ['Assess uterine involution (BUBBLE-HE)', 'Support breastfeeding initiation', 'Recognize postpartum hemorrhage'],
        'high-risk-pregnancy': ['Identify preeclampsia warning signs', 'Manage gestational diabetes', 'Monitor for placental complications'],
        'antepartum-care': ['Calculate estimated due date', 'Perform Leopold\'s maneuvers', 'Interpret prenatal lab results'],

        // Pediatrics
        'growth-development': ['Identify age-appropriate milestones', 'Administer vaccines per schedule', 'Teach age-specific safety measures'],
        'pediatric-emergencies': ['Calculate pediatric medication doses', 'Recognize respiratory distress signs', 'Assess dehydration severity'],
        'infant-care': ['Teach safe sleep practices (SIDS prevention)', 'Assess feeding adequacy', 'Perform developmental screening'],
        'adolescent-health': ['Address confidentiality appropriately', 'Screen for mental health concerns', 'Discuss risk behavior prevention'],

        // Mental Health
        'depression-anxiety': ['Use validated screening tools (PHQ-9, GAD-7)', 'Recognize medication side effects', 'Implement therapeutic communication'],
        'crisis-intervention': ['Assess suicide risk accurately', 'Use de-escalation techniques', 'Know when to implement safety protocols'],
        'therapeutic-communication': ['Apply active listening techniques', 'Maintain professional boundaries', 'Use open-ended questions effectively'],
        'substance-abuse': ['Recognize withdrawal syndromes', 'Implement CIWA/COWS protocols', 'Support recovery-oriented care'],
        'eating-disorders': ['Differentiate anorexia vs bulimia', 'Monitor for refeeding syndrome', 'Support nutritional rehabilitation']
    };

    let currentProductId = null;
    let currentProductName = null;
    let currentCardIndex = -1;
    let visibleCards = [];

    // Touch/swipe tracking for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

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

    // Get currently visible guide cards (for navigation)
    function getVisibleCards() {
        return Array.from(guideCards).filter(card =>
            card.style.display !== 'none' && card.offsetParent !== null
        );
    }

    // Open Quick View modal
    function openQuickView(card) {
        // Update visible cards list and find current index
        visibleCards = getVisibleCards();
        currentCardIndex = visibleCards.indexOf(card);

        const title = card.querySelector('h4')?.textContent || 'Study Guide';
        const description = card.querySelector('p')?.textContent || '';
        const category = card.getAttribute('data-category') || '';
        const subcategory = card.getAttribute('data-subcategory') || '';
        const iconImg = card.querySelector('.guide-icon img');
        const iconI = card.querySelector('.guide-icon i');

        // Get product ID from the Add to Cart button (checkout links are replaced by initializeAddToCartButtons)
        const addToCartButton = card.querySelector('.add-to-cart-btn');
        let productId = '';
        if (addToCartButton) {
            productId = addToCartButton.getAttribute('data-product-id') || '';
        } else {
            // Fallback: try checkout link if button not found yet
            const checkoutLink = card.querySelector('a[href*="checkout.html"]');
            if (checkoutLink) {
                const url = new URL(checkoutLink.href, window.location.origin);
                productId = url.searchParams.get('product') || '';
            }
        }

        currentProductId = productId;
        currentProductName = title;

        // Track as recently viewed
        if (productId && typeof window.addToRecentlyViewed === 'function') {
            window.addToRecentlyViewed(productId);
        }

        // Update modal content
        document.getElementById('quick-view-title').textContent = title;

        // Update navigation buttons state
        updateNavButtons();

        // Set main category badge
        const mainCategoryEl = document.getElementById('quick-view-category-main');
        const subCategoryEl = document.getElementById('quick-view-category-sub');
        const separatorEl = document.getElementById('quick-view-category-separator');

        if (mainCategoryEl) {
            mainCategoryEl.textContent = categoryNames[category] || category;
        }

        // Set subcategory badge and separator (only show if subcategory exists)
        if (subCategoryEl && separatorEl) {
            if (subcategory && subcategoryNames[subcategory]) {
                subCategoryEl.textContent = subcategoryNames[subcategory];
                subCategoryEl.style.display = 'inline-flex';
                separatorEl.style.display = 'inline-flex';
            } else {
                subCategoryEl.style.display = 'none';
                separatorEl.style.display = 'none';
            }
        }

        // Use custom topics from guideTopics object
        const topicsList = document.getElementById('quick-view-topics-list');
        if (topicsList && productId) {
            const customTopics = guideTopics[productId];

            if (customTopics && customTopics.length > 0) {
                topicsList.innerHTML = customTopics.map(topic =>
                    `<li><i class="fas fa-circle"></i> ${topic}</li>`
                ).join('');
            } else {
                // Fallback to description if no custom topics
                const topics = description.split(',').map(t => t.trim()).filter(t => t.length > 0);
                const displayTopics = topics.slice(0, 3);
                topicsList.innerHTML = displayTopics.map(topic =>
                    `<li><i class="fas fa-circle"></i> ${topic.charAt(0).toUpperCase() + topic.slice(1)}</li>`
                ).join('');
            }
        }

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

    // Close Quick View modal with animation
    function closeQuickView() {
        const content = modal.querySelector('.quick-view-content');
        if (content) {
            content.classList.add('closing');
            setTimeout(() => {
                modal.classList.remove('visible');
                content.classList.remove('closing');
                document.body.style.overflow = '';
                currentProductId = null;
                currentProductName = null;
                currentCardIndex = -1;
            }, 150); // Match CSS animation duration
        } else {
            modal.classList.remove('visible');
            document.body.style.overflow = '';
            currentProductId = null;
            currentProductName = null;
            currentCardIndex = -1;
        }
    }

    // Navigate to previous guide
    function navigatePrev() {
        if (currentCardIndex > 0) {
            openQuickView(visibleCards[currentCardIndex - 1]);
        }
    }

    // Navigate to next guide
    function navigateNext() {
        if (currentCardIndex < visibleCards.length - 1) {
            openQuickView(visibleCards[currentCardIndex + 1]);
        }
    }

    // Update navigation button states
    function updateNavButtons() {
        const prevBtn = document.getElementById('quick-view-nav-prev');
        const nextBtn = document.getElementById('quick-view-nav-next');

        if (prevBtn) {
            prevBtn.disabled = currentCardIndex <= 0;
        }
        if (nextBtn) {
            nextBtn.disabled = currentCardIndex >= visibleCards.length - 1;
        }
    }

    // Add navigation buttons to modal (if not already present)
    function addNavButtons() {
        const content = modal.querySelector('.quick-view-content');
        if (!content || document.getElementById('quick-view-nav-prev')) return;

        const prevBtn = document.createElement('button');
        prevBtn.id = 'quick-view-nav-prev';
        prevBtn.className = 'quick-view-nav quick-view-nav-prev';
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.title = 'Previous guide (←)';
        prevBtn.addEventListener('click', navigatePrev);

        const nextBtn = document.createElement('button');
        nextBtn.id = 'quick-view-nav-next';
        nextBtn.className = 'quick-view-nav quick-view-nav-next';
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.title = 'Next guide (→)';
        nextBtn.addEventListener('click', navigateNext);

        content.appendChild(prevBtn);
        content.appendChild(nextBtn);
    }

    // Initialize nav buttons
    addNavButtons();

    // Event listeners for closing modal
    if (closeBtn) {
        closeBtn.addEventListener('click', closeQuickView);
    }
    if (overlay) {
        overlay.addEventListener('click', closeQuickView);
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('visible')) return;

        switch(e.key) {
            case 'Escape':
                closeQuickView();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                navigatePrev();
                break;
            case 'ArrowRight':
                e.preventDefault();
                navigateNext();
                break;
        }
    });

    // Touch/swipe support for mobile
    const content = modal.querySelector('.quick-view-content');
    if (content) {
        content.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        content.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        const minSwipeDistance = 50;

        // Only handle horizontal swipes (ignore vertical scrolling)
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                // Swipe right - go to previous
                navigatePrev();
            } else {
                // Swipe left - go to next
                navigateNext();
            }
        }

        // Swipe down to close
        if (deltaY > 100 && Math.abs(deltaY) > Math.abs(deltaX)) {
            closeQuickView();
        }
    }

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
 * Initialize mobile filter toggle functionality
 * Allows users to collapse/expand the filter sidebar on mobile
 */
function initializeMobileFilterToggle() {
    const toggleBtn = document.getElementById('mobile-filter-toggle');
    const sidebar = document.getElementById('store-sidebar');
    const activeFilterCount = document.getElementById('mobile-active-filter-count');

    if (!toggleBtn || !sidebar) {
        console.log('Mobile filter toggle: elements not found');
        return;
    }

    console.log('Mobile filter toggle initialized');

    // Toggle sidebar visibility
    toggleBtn.addEventListener('click', function() {
        const isExpanded = sidebar.classList.contains('mobile-expanded');

        if (isExpanded) {
            sidebar.classList.remove('mobile-expanded');
            toggleBtn.classList.remove('active');
            toggleBtn.setAttribute('aria-expanded', 'false');
        } else {
            sidebar.classList.add('mobile-expanded');
            toggleBtn.classList.add('active');
            toggleBtn.setAttribute('aria-expanded', 'true');
        }
    });

    // Update active filter count text when filters change
    window.updateMobileFilterCount = function(filterName) {
        if (activeFilterCount) {
            activeFilterCount.textContent = filterName || 'All';
        }
    };

    // Close sidebar when a filter is selected (on mobile)
    const filterButtons = sidebar.querySelectorAll('.filter-item[data-filter], .filter-item[data-shop-type]');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Only auto-close on mobile (check if toggle is visible)
            if (window.innerWidth <= 768) {
                // Small delay to let user see the selection
                setTimeout(() => {
                    sidebar.classList.remove('mobile-expanded');
                    toggleBtn.classList.remove('active');
                    toggleBtn.setAttribute('aria-expanded', 'false');

                    // Update the filter count display
                    const filterText = this.textContent.trim().split('\n')[0].trim();
                    if (activeFilterCount) {
                        activeFilterCount.textContent = filterText;
                    }
                }, 150);
            }
        });
    });
}

/**
 * Initialize dynamic savings badges
 * Calculates savings based on actual guide count in each category
 */
function initializeSavingsBadges() {
    // This function now initializes for the default LITE package state
    const GUIDE_PRICE = 5.99;
    const LITE_PRICE = 24.99;

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

    // Update savings badges (only the new simplified pricing badges)
    const savingsBadges = document.querySelectorAll('.package-pricing-simple .savings-badge[data-category]');

    savingsBadges.forEach(badge => {
        const category = badge.getAttribute('data-category');
        const guideCount = categoryCounts[category] || 0;

        if (guideCount === 0) {
            badge.style.display = 'none';
            return;
        }

        const individualTotal = guideCount * GUIDE_PRICE;
        const savings = individualTotal - LITE_PRICE;
        const savingsPercent = Math.round((savings / individualTotal) * 100);

        // Only show badge if there are actual savings
        if (savingsPercent > 0) {
            badge.textContent = 'SAVE ' + savingsPercent + '%';
            badge.setAttribute('data-tooltip',
                'Buying ' + guideCount + ' guides separately = $' + individualTotal.toFixed(2) + '. ' +
                'Lite Package saves you $' + savings.toFixed(2) + '!'
            );

            // Add best-value class for highest savings (over 50%)
            if (savingsPercent >= 50) {
                badge.classList.add('best-value');
            }
            badge.style.display = 'inline-block';
        } else {
            // No savings - show "Bundle Deal"
            badge.textContent = 'BUNDLE DEAL';
            badge.setAttribute('data-tooltip',
                'Get core ' + category + ' guides plus essential topics covered!'
            );
            badge.style.display = 'inline-block';
        }
    });
}
