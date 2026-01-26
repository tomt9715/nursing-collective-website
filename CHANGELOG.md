# Changelog

All notable changes to The Nursing Collective website will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Custom 404 error page with helpful navigation links
- Cookie consent banner for GDPR/CCPA compliance
- System status page for service monitoring
- Google Analytics integration (GA4)
- Jest unit testing framework
- Cypress end-to-end testing framework
- CHANGELOG.md for version tracking

### Changed
- (None yet)

### Fixed
- (None yet)

### Security
- (None yet)

---

## [1.0.0] - 2026-01-26

### Added
- Initial release of The Nursing Collective website
- Homepage with hero section, features, and CTA
- User authentication (Google, Discord, Email/Password via Firebase)
- Study guides catalog with category filtering
- Individual guide viewer with markdown rendering
- Shopping cart with persistent storage
- Stripe checkout integration (test mode)
- User dashboard with purchase history
- Admin panel for guide and user management
- Dark mode support
- Mobile responsive design
- Accessibility features (skip links, ARIA labels, keyboard navigation)
- SEO optimization (meta tags, structured data, sitemap)
- Security headers via Cloudflare (_headers file)
- Sentry error tracking integration
- FlorenceBot information page

### Technical
- Static HTML/CSS/JS frontend hosted on Cloudflare Pages
- Flask/Python backend API on Railway
- PostgreSQL database on Railway
- Vite build system with CSS purging
- ESLint for code quality
- PostCSS for CSS processing

---

## Version History Format

Each version entry should include:

### Added
New features and capabilities

### Changed
Changes to existing functionality

### Deprecated
Features that will be removed in future versions

### Removed
Features that have been removed

### Fixed
Bug fixes

### Security
Security-related changes and fixes

---

## Contributing

When contributing to this project:
1. Update the [Unreleased] section with your changes
2. Use present tense ("Add feature" not "Added feature")
3. Reference issue numbers when applicable (#123)
4. Group related changes together
5. Be concise but descriptive
