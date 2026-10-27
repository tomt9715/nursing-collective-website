document.getElementById('check-session').addEventListener('click', async () => {
    const result = document.getElementById('result');
    result.textContent = 'Checking…';
    try {
        if (new URL(API_URL).origin !== location.origin) throw Error('External API is not allowed');
        await refreshToken();
        result.textContent = 'First-party session renewed successfully. External browser API connections are blocked.';
    } catch (error) { result.textContent = `Session renewal failed (${error.status || 'connection'}).`; }
});
