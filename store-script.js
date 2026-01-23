// Store Page JavaScript
// Sidebar Filter Functionality, Shop Type Toggle & Cart Integration

console.log('=== STORE-SCRIPT.JS FILE LOADED ===');

document.addEventListener('DOMContentLoaded', function() {
    console.log('Store script DOMContentLoaded fired');

    // Convert "Buy Guide" links to "Add to Cart" buttons
    initializeAddToCartButtons();

    // Initialize package add-to-cart buttons
    initializePackageButtons();

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

    // Master filter function
    function filterGuides() {
        console.log('filterGuides called, search term:', currentSearchTerm, 'category:', currentFilter, 'subcategory:', currentSubcategory);
        let visibleCount = 0;

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

            if (matchesCategory && matchesSubcategory && matchesSearch) {
                card.style.display = 'flex';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Update search results count
        if (searchResultsCount) {
            if (currentSearchTerm) {
                searchResultsCount.textContent = `${visibleCount} guide${visibleCount !== 1 ? 's' : ''} found`;
                searchResultsCount.style.display = 'inline';
            } else {
                searchResultsCount.style.display = 'none';
            }
        }

        // Show/hide empty state
        if (emptyState) {
            if (visibleCount === 0 && currentSearchTerm) {
                emptyState.style.display = 'flex';
                if (emptyStateTerm) {
                    emptyStateTerm.textContent = currentSearchTerm;
                }
                if (guidesGrid) {
                    guidesGrid.style.display = 'none';
                }
            } else {
                emptyState.style.display = 'none';
                if (guidesGrid && currentShopType === 'guides') {
                    guidesGrid.style.display = 'grid';
                }
            }
        }
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

                // Update header
                categoryTitle.textContent = 'All Study Guides';
                categoryDescription.textContent = 'Browse our complete collection of nursing study guides';

                // Reset filters
                currentFilter = 'all';
                currentSubcategory = 'all';
                currentSearchTerm = '';
                if (searchInput) searchInput.value = '';
                if (searchClear) searchClear.style.display = 'none';
                if (searchResultsCount) searchResultsCount.style.display = 'none';
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

                // Update header
                categoryTitle.textContent = 'Class Packages';
                categoryDescription.textContent = 'Choose Full ($49.99) or Lite ($24.99) packages for each nursing class';

                // Reset filter to "All"
                filterButtons.forEach(btn => {
                    if (btn.getAttribute('data-filter') === 'all') {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });

                // Show all packages initially
                packageCards.forEach(card => {
                    card.style.display = 'block';
                });
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
                // Filter package cards
                packageCards.forEach(card => {
                    const category = card.getAttribute('data-category');

                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.display = 'none';
                    }
                });
            }

        });
    });
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
