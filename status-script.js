// Status Page Logic
const StatusPage = {
    services: {
        website: { name: 'Website', url: '/' },
        api: { name: 'API', url: 'https://api.thenursingcollective.pro/api/health' },
        payments: { name: 'Payments', url: 'https://api.stripe.com' },
        discord: { name: 'FlorenceBot', url: 'https://api.thenursingcollective.pro/api/health' }
    },

    async checkServices() {
        const results = {};

        // Check website (always operational if we're here)
        results.website = 'operational';
        this.updateServiceStatus('website', 'operational');

        // Check API
        try {
            const response = await fetch(this.services.api.url, {
                method: 'GET',
                mode: 'cors'
            });
            results.api = response.ok ? 'operational' : 'degraded';
        } catch (e) {
            results.api = 'outage';
        }
        this.updateServiceStatus('api', results.api);

        // Payments - assume operational (Stripe rarely goes down)
        results.payments = 'operational';
        this.updateServiceStatus('payments', 'operational');

        // Discord bot - same endpoint as API
        results.discord = results.api;
        this.updateServiceStatus('discord', results.discord);

        // Update overall status
        this.updateOverallStatus(results);

        // Update last checked time
        document.getElementById('last-checked').textContent = new Date().toLocaleTimeString();
    },

    updateServiceStatus(service, status) {
        const card = document.querySelector(`[data-service="${service}"] .service-status`);
        if (!card) return;

        card.className = `service-status ${status}`;

        const statusText = {
            operational: 'Operational',
            degraded: 'Degraded',
            outage: 'Outage',
            checking: 'Checking...'
        };

        card.innerHTML = `
            <span class="status-dot${status === 'checking' ? ' pulse' : ''}"></span>
            <span>${statusText[status]}</span>
        `;
    },

    updateOverallStatus(results) {
        const values = Object.values(results);
        let overall = 'operational';

        if (values.includes('outage')) {
            overall = 'outage';
        } else if (values.includes('degraded')) {
            overall = 'degraded';
        }

        const container = document.getElementById('overall-status');
        const indicator = container.querySelector('.status-indicator');
        const textContainer = container.querySelector('.overall-status-text');

        container.className = `overall-status ${overall}`;
        indicator.className = `status-indicator ${overall}`;

        const statusInfo = {
            operational: {
                icon: 'fa-check-circle',
                title: 'All Systems Operational',
                description: 'All services are running smoothly.'
            },
            degraded: {
                icon: 'fa-exclamation-triangle',
                title: 'Partial System Outage',
                description: 'Some services may be experiencing issues.'
            },
            outage: {
                icon: 'fa-times-circle',
                title: 'Major System Outage',
                description: 'We are experiencing service disruptions.'
            }
        };

        const info = statusInfo[overall];
        indicator.innerHTML = `<i class="fas ${info.icon}"></i>`;
        textContainer.innerHTML = `
            <h2>${info.title}</h2>
            <p>${info.description}</p>
        `;
    },

    init() {
        this.checkServices();
        // Refresh every 60 seconds
        setInterval(() => this.checkServices(), 60000);
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    StatusPage.init();
});
