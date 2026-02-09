# The Nursing Collective — Frontend Design System

When generating or modifying frontend code for this project, follow these rules strictly.

## Brand Identity
- **Primary**: #2E86AB (Medical Blue) — buttons, links, active states
- **Secondary**: #A23B72 (Healthcare Accent) — highlights, badges, secondary actions
- **Accent**: #f59e0b (Warm amber) — alerts, stars, emphasis
- **Gradients**: Use subtle gradients sparingly (e.g. hero sections, icon backgrounds). Avoid generic purple/blue AI-startup gradients.

## Typography
- **Headings**: `'Outfit', sans-serif` — weight 600-700, letter-spacing -0.025em
- **Body**: `'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif` — weight 400, line-height 1.6
- **Scale**: Use rem units. Body 1rem, small text 0.85rem, large headings 2-3rem. Do not go below 0.8rem.

## Colors & Theming
- Always use CSS variables (`var(--text-primary)`, `var(--card-bg)`, etc.), never hardcoded hex in stylesheets
- Support dark mode via `[data-theme="dark"]` — all components must look correct in both themes
- Light backgrounds: `var(--background-light)` #f8fafc, cards: `var(--card-bg)` #ffffff
- Dark backgrounds: `var(--background-light)` #1f2937, cards: `var(--card-bg)` #1f2937

## Layout Patterns
- Max content width: 1200px centered with auto margins
- Cards: `border-radius: 16px`, `border: 1px solid var(--border-color)`, `box-shadow: var(--shadow-sm)`
- Spacing: 8px base unit (8, 16, 24, 32, 48px)
- Use CSS Grid or Flexbox, not floats
- Responsive breakpoints: 768px (tablet), 480px (mobile)

## Component Conventions
- **Buttons**: `border-radius: 8px`, `font-weight: 600`, `padding: 12px 24px`. Primary uses `--primary-color` bg. No inline onclick — use `data-navigate` or `data-external` attributes.
- **Links**: `color: var(--primary-color)`, underline on hover only
- **Icons**: Font Awesome 6 (`fas fa-*`). Keep icons functional, not decorative clutter.
- **Modals**: Use `.modal-overlay` + `.modal-content` pattern from `modal.js`
- **Skeletons**: Use `.skeleton-loader > .skeleton.skeleton-card` for loading states

## What NOT to Do
- No inline `onclick` handlers (CSP blocks them). Use data attributes + addEventListener.
- No `!important` unless overriding third-party CSS
- No generic placeholder text ("Lorem ipsum"). Use real nursing/medical context.
- No emoji in code or UI unless the user explicitly requests it
- No Bootstrap JS components (we don't use `data-bs-toggle`). All interactivity is custom JS.
- No `-webkit-` prefixes without also including the unprefixed property
- Do not add new external dependencies without asking

## File Organization
- Styles go in `css/main.css` (base), `css/components.css` (reusable), or `css/pages.css` (page-specific)
- Page-specific styles can go in a `<style>` block in the HTML if self-contained (like study guides)
- All JS must be in external `.js` files (CSP requirement)
- API calls go through `api-service.js`

## Design Aesthetic
This is a professional healthcare education platform. The design should feel:
- **Clean and trustworthy** — not flashy or startup-y
- **Readable** — generous whitespace, high contrast text, clear hierarchy
- **Warm but professional** — medical blue with warm accents, not cold/corporate
- **Functional** — every element earns its space. No decorative bloat.
