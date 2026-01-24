/**
 * Google Places Address Autocomplete
 * Auto-fills billing address fields when user selects a suggestion
 */

let autocomplete;

function initAddressAutocomplete() {
    const addressInput = document.getElementById('address');

    if (!addressInput) {
        console.warn('Address input not found');
        return;
    }

    // Check if Google Places API is loaded
    if (typeof google === 'undefined' || !google.maps || !google.maps.places) {
        console.warn('Google Places API not loaded');
        return;
    }

    // Create autocomplete instance
    autocomplete = new google.maps.places.Autocomplete(addressInput, {
        types: ['address'],
        fields: ['address_components', 'formatted_address'],
        // Bias towards US addresses but allow international
        componentRestrictions: null
    });

    // Add listener for when user selects an address
    autocomplete.addListener('place_changed', fillInAddress);

    // Prevent form submission on Enter when autocomplete is open
    addressInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            // Check if autocomplete dropdown is visible
            const pacContainer = document.querySelector('.pac-container');
            if (pacContainer && pacContainer.style.display !== 'none') {
                e.preventDefault();
            }
        }
    });

    console.log('Address autocomplete initialized');
}

function fillInAddress() {
    const place = autocomplete.getPlace();

    if (!place || !place.address_components) {
        console.warn('No address details available');
        return;
    }

    // Clear existing values
    const fields = {
        address: document.getElementById('address'),
        address2: document.getElementById('address2'),
        city: document.getElementById('city'),
        state: document.getElementById('state'),
        zip: document.getElementById('zip'),
        country: document.getElementById('country')
    };

    // Reset fields (except address2 which is optional)
    fields.city.value = '';
    fields.state.value = '';
    fields.zip.value = '';

    // Component type mapping
    let streetNumber = '';
    let route = '';
    let city = '';
    let state = '';
    let zip = '';
    let country = '';

    // Parse address components
    for (const component of place.address_components) {
        const type = component.types[0];

        switch (type) {
            case 'street_number':
                streetNumber = component.long_name;
                break;
            case 'route':
                route = component.long_name;
                break;
            case 'locality':
                city = component.long_name;
                break;
            case 'sublocality_level_1':
                // Fallback for cities like NYC boroughs
                if (!city) city = component.long_name;
                break;
            case 'administrative_area_level_1':
                state = component.short_name; // Use abbreviation (NY, CA, etc.)
                break;
            case 'postal_code':
                zip = component.long_name;
                break;
            case 'country':
                country = component.short_name; // US, CA, GB, etc.
                break;
        }
    }

    // Fill in the fields
    fields.address.value = streetNumber ? `${streetNumber} ${route}` : route;
    fields.city.value = city;
    fields.state.value = state;
    fields.zip.value = zip;

    // Set country if it exists in the dropdown
    if (country && fields.country) {
        const countryOption = fields.country.querySelector(`option[value="${country}"]`);
        if (countryOption) {
            fields.country.value = country;
        }
    }

    // Trigger change events so any validation listeners fire
    ['address', 'city', 'state', 'zip', 'country'].forEach(fieldName => {
        if (fields[fieldName]) {
            fields[fieldName].dispatchEvent(new Event('change', { bubbles: true }));
            fields[fieldName].dispatchEvent(new Event('input', { bubbles: true }));
        }
    });

    // Hide the autocomplete dropdown by blurring and re-focusing elsewhere
    fields.address.blur();

    // Hide any visible pac-container dropdowns
    const pacContainers = document.querySelectorAll('.pac-container');
    pacContainers.forEach(container => {
        container.style.display = 'none';
    });

    // Focus on the next field (address2 or city)
    setTimeout(() => {
        if (fields.address2) {
            fields.address2.focus();
        }
    }, 50);

    console.log('Address fields auto-filled');
}

// Initialize when Google Maps API loads (callback from script)
function initGooglePlaces() {
    initAddressAutocomplete();
}

// Also try to init on DOMContentLoaded in case API is already loaded
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure Google API is ready
    setTimeout(() => {
        if (typeof google !== 'undefined' && google.maps && google.maps.places) {
            initAddressAutocomplete();
        }
    }, 100);
});
