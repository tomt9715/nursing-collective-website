document.getElementById('check-session').addEventListener('click', async () => {
    const result = document.getElementById('result');
    if (!location.hostname.endsWith('.pages.dev')) { result.textContent = 'Preview only'; return; }
    result.textContent = 'Checking…';
    try { await refreshToken(); result.textContent = 'Session renewed successfully. You can continue studying.'; }
    catch (error) { result.textContent = `Session renewal failed (${error.status || 'connection'}).`; }
});
