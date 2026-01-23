# Implementing Apple Pay & Google Pay via Stripe Payment Element

## Overview

This document provides instructions for adding Apple Pay and Google Pay support to The Nursing Collective checkout page. The implementation involves switching from Stripe's CardElement to the Payment Element, which automatically handles multiple payment methods.

## Current Setup

- **File**: `checkout.js`
- **Current Implementation**: Uses `stripe.elements()` with `CardElement` for credit card input only
- **Payment Flow**: Creates a Stripe Checkout Session via backend API

## Implementation Steps

### Step 1: Enable Payment Methods in Stripe Dashboard

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Settings > Payment methods**
3. Enable the following:
   - **Card** (already enabled)
   - **Apple Pay**
   - **Google Pay**
   - **Link** (Stripe's one-click checkout - optional but recommended)

### Step 2: Domain Verification for Apple Pay

Apple Pay requires domain verification. This is **critical** and must be done before Apple Pay will work.

1. In Stripe Dashboard, go to **Settings > Payment methods > Apple Pay**
2. Click **Add new domain**
3. Add: `thenursingcollective.pro`
4. Download the domain verification file (usually named `apple-developer-merchantid-domain-association`)
5. Host this file at: `https://thenursingcollective.pro/.well-known/apple-developer-merchantid-domain-association`

**For Cloudflare Pages hosting:**
- Create a folder: `FlorenceBot-website/.well-known/`
- Place the verification file inside
- Commit and deploy to main branch
- Verify in Stripe Dashboard that domain shows as "Verified"

### Step 3: Update checkout.html

Replace the current card element container with a Payment Element container:

**Current HTML (around line 180-190):**
```html
<div class="card-element-wrapper" id="card-element-wrapper">
    <div id="card-element" class="stripe-element"></div>
</div>
<div class="card-status" id="card-status-indicator" style="display: none;">
    <i class="fas fa-check-circle"></i>
    <span>Card details complete</span>
</div>
```

**Replace with:**
```html
<div class="payment-element-wrapper" id="payment-element-wrapper">
    <div id="payment-element"></div>
</div>
<div id="payment-message" class="payment-message" style="display: none;"></div>
```

### Step 4: Update checkout.css

Add styles for the Payment Element:

```css
/* Payment Element Styles */
.payment-element-wrapper {
    padding: 16px;
    border: 2px solid var(--input-border);
    border-radius: 12px;
    background: var(--card-bg);
    transition: border-color 0.2s ease;
}

.payment-element-wrapper:focus-within {
    border-color: var(--primary-color);
}

.payment-message {
    color: var(--error-color, #dc3545);
    font-size: 14px;
    margin-top: 12px;
    text-align: center;
}

/* Dark mode support */
[data-theme="dark"] .payment-element-wrapper {
    background: var(--card-bg);
    border-color: var(--input-border);
}
```

### Step 5: Backend Changes (Flask API)

The backend needs to create a PaymentIntent instead of (or in addition to) a Checkout Session. Update the checkout endpoint:

**New endpoint or modify existing `/api/checkout/create-payment-intent`:**

```python
@app.route('/api/checkout/create-payment-intent', methods=['POST'])
@require_auth  # Your auth decorator
def create_payment_intent():
    data = request.json
    user_id = g.user_id  # From auth

    # Calculate total from cart items
    cart_items = data.get('items', [])
    amount = calculate_total(cart_items)  # In cents

    # Create PaymentIntent
    intent = stripe.PaymentIntent.create(
        amount=amount,
        currency='usd',
        automatic_payment_methods={
            'enabled': True,  # This enables Apple Pay, Google Pay, cards, etc.
        },
        metadata={
            'user_id': user_id,
            'items': json.dumps([item['id'] for item in cart_items])
        }
    )

    return jsonify({
        'clientSecret': intent.client_secret
    })
```

### Step 6: Update checkout.js

This is the main change. Replace the CardElement setup with Payment Element.

**Current flow:**
1. Initialize Stripe
2. Create CardElement
3. On submit, create checkout session and redirect

**New flow:**
1. Initialize Stripe
2. Fetch PaymentIntent client secret from backend
3. Create Payment Element with client secret
4. On submit, confirm payment directly

**Key code changes in checkout.js:**

```javascript
// Near the top, after Stripe initialization
let elements;
let paymentElement;

// Function to initialize Payment Element
async function initializePaymentElement(amount) {
    try {
        // Get client secret from backend
        const response = await apiService.post('/api/checkout/create-payment-intent', {
            items: cartItems,
            amount: amount
        });

        const { clientSecret } = response;

        // Create Elements instance with client secret
        elements = stripe.elements({
            clientSecret,
            appearance: {
                theme: document.documentElement.dataset.theme === 'dark' ? 'night' : 'stripe',
                variables: {
                    colorPrimary: '#2E86AB',
                    colorBackground: document.documentElement.dataset.theme === 'dark' ? '#1e1e1e' : '#ffffff',
                    colorText: document.documentElement.dataset.theme === 'dark' ? '#f5f5f5' : '#1a1a1a',
                    colorDanger: '#dc3545',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    borderRadius: '8px',
                }
            }
        });

        // Create and mount Payment Element
        paymentElement = elements.create('payment', {
            layout: {
                type: 'tabs',
                defaultCollapsed: false
            }
        });

        paymentElement.mount('#payment-element');

        // Listen for changes
        paymentElement.on('change', (event) => {
            const messageDiv = document.getElementById('payment-message');
            if (event.error) {
                messageDiv.textContent = event.error.message;
                messageDiv.style.display = 'block';
            } else {
                messageDiv.style.display = 'none';
            }
        });

    } catch (error) {
        console.error('Error initializing payment:', error);
        showError('Failed to initialize payment. Please refresh and try again.');
    }
}

// Update form submission handler
async function handlePaymentSubmit(event) {
    event.preventDefault();

    const submitButton = document.getElementById('submit-payment');
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

    try {
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/success.html`,
                receipt_email: document.getElementById('email').value,
            },
            redirect: 'if_required'  // Only redirect if necessary (3D Secure, etc.)
        });

        if (error) {
            // Show error to customer
            const messageDiv = document.getElementById('payment-message');
            messageDiv.textContent = error.message;
            messageDiv.style.display = 'block';

            submitButton.disabled = false;
            submitButton.innerHTML = 'Complete Purchase';
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            // Payment succeeded without redirect
            window.location.href = `success.html?payment_intent=${paymentIntent.id}`;
        }
        // If redirect happened, user is taken to return_url

    } catch (err) {
        console.error('Payment error:', err);
        showError('An unexpected error occurred. Please try again.');
        submitButton.disabled = false;
        submitButton.innerHTML = 'Complete Purchase';
    }
}
```

### Step 7: Update success.html/success-script.js

Update the success page to handle PaymentIntent confirmation:

```javascript
// In success-script.js
async function verifyPayment() {
    const urlParams = new URLSearchParams(window.location.search);

    // Handle PaymentIntent (new flow)
    const paymentIntentId = urlParams.get('payment_intent');
    const paymentIntentClientSecret = urlParams.get('payment_intent_client_secret');

    // Handle Checkout Session (legacy flow)
    const sessionId = urlParams.get('session_id');

    if (paymentIntentId) {
        // Verify with backend
        const response = await apiService.post('/api/checkout/verify-payment', {
            payment_intent_id: paymentIntentId
        });
        // Handle response...
    } else if (sessionId) {
        // Existing checkout session verification
        // ...
    }
}
```

### Step 8: Backend - Payment Verification Endpoint

Add endpoint to verify PaymentIntent:

```python
@app.route('/api/checkout/verify-payment', methods=['POST'])
def verify_payment():
    data = request.json
    payment_intent_id = data.get('payment_intent_id')

    try:
        intent = stripe.PaymentIntent.retrieve(payment_intent_id)

        if intent.status == 'succeeded':
            # Grant access to purchased items
            user_id = intent.metadata.get('user_id')
            items = json.loads(intent.metadata.get('items', '[]'))

            # Your logic to grant access
            grant_purchases(user_id, items)

            return jsonify({
                'success': True,
                'items': items
            })
        else:
            return jsonify({
                'success': False,
                'status': intent.status
            }), 400

    except Exception as e:
        return jsonify({'error': str(e)}), 500
```

## Testing

### Test Mode
- Use Stripe test mode first (test API keys)
- Test card: `4242 4242 4242 4242` (any future date, any CVC)
- Apple Pay test: Use Safari on Mac/iOS with a test card in Apple Wallet
- Google Pay test: Use Chrome with a test card in Google Pay

### Apple Pay Testing
- Must be on Safari (Mac or iOS)
- Must have Apple Pay set up with a card
- Domain must be verified in Stripe
- Works in test mode with real Apple Pay setup

### Google Pay Testing
- Must be on Chrome
- Must have Google Pay set up
- Works in test mode with real Google Pay setup

## Important Notes

1. **Apple Pay will only appear** on Safari browsers with Apple Pay enabled
2. **Google Pay will only appear** on Chrome/Android browsers with Google Pay enabled
3. **Link (Stripe)** will appear for returning customers who have saved their info
4. **Cards** are always available as fallback

## CSP Header Updates

You may need to update the `_headers` file if you see CSP errors:

```
Content-Security-Policy: ... frame-src https://js.stripe.com https://hooks.stripe.com; ...
```

## Files to Modify Summary

1. `checkout.html` - Replace card element with payment element container
2. `checkout.js` - Major rewrite of payment logic
3. `css/checkout.css` - Add payment element styles
4. `success-script.js` - Handle PaymentIntent verification
5. `_headers` - Update CSP if needed
6. `.well-known/apple-developer-merchantid-domain-association` - New file for Apple Pay
7. **Backend**: Add PaymentIntent creation and verification endpoints

## Rollback Plan

Keep the existing CardElement code commented out until the new implementation is fully tested. The Payment Element is backwards compatible - if Apple Pay or Google Pay aren't available on a user's device/browser, they'll still see the card input option.
