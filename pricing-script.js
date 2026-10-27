// One public study membership. Existing plans are managed in Account.
document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('membership-start-btn');
    const status = document.getElementById('pricing-status');
    let membership = null;
    let membershipError = false;
    const signedIn = typeof isAuthenticated === 'function' && isAuthenticated();
    if (signedIn) {
        button.disabled = true;
        button.textContent = 'Checking your membership…';
    }
    const membershipReady = signedIn ? apiCall('/api/subscription-status').then(function(data) {
        membership = data;
        if (data.has_access) button.textContent = 'Manage your membership';
        else button.textContent = 'Start study membership';
    }).catch(function() {
        membershipError = true;
        button.textContent = 'Check membership again';
        status.textContent = 'We couldn’t check your membership. Please refresh before starting a purchase.';
    }).finally(function() { button.disabled = false; }) : Promise.resolve();

    button.addEventListener('click', async function() {
        await membershipReady;
        if (membershipError) { window.location.reload(); return; }
        if (membership && membership.has_access) {
            window.location.href = 'settings.html#membership-plan-card';
            return;
        }
        if (!isAuthenticated()) {
            sessionStorage.setItem('pendingCheckoutPlan', 'monthly-access');
            window.location.href = 'login.html?redirect=pricing';
            return;
        }
        window.location.href = 'checkout.html?plan=monthly-access';
    });

    // Resume only the advertised monthly offer after sign-in. Old links do
    // not silently start a different purchase or change an existing plan.
    const pendingPlan = sessionStorage.getItem('pendingCheckoutPlan');
    if (pendingPlan && signedIn) {
        sessionStorage.removeItem('pendingCheckoutPlan');
        membershipReady.then(function() {
            if (pendingPlan === 'monthly-access' && !membershipError && !membership.has_access) {
                window.location.href = 'checkout.html?plan=monthly-access';
            }
        });
    }
});
