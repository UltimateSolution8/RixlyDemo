# Rixly Landing Page: Tailored SEO & AEO Requirements

This document outlines the specific SEO and Answer Engine Optimization (AEO) requirements implemented and planned for the Rixly landing page, refined from the original strategy document.

## 1. Core Technical SEO (Implemented)
- **Crawlability:** `robots.txt` and `sitemap.xml` are active to guide search engines.
- **Site Identity:** Optimized `<title>` and `<meta name="description">` in `index.html`.
- **AEO/GEO Signals:** JSON-LD Structured Data for `Organization` and `SoftwareApplication` embedded in the page.

## 2. On-Page Optimization (Implemented & Ongoing)
- **Heading Hierarchy:** Maintain exactly one `<h1>` per page (Hero Section). Use `<h2>` and `<h3>` for feature grids and pricing.
- **Keyword Focus:** Primary focus on "AI-Powered Lead Generation" and "Conversation Intelligence".
- **Mobile Friendliness:** Ensure tap targets (buttons/links) have a minimum size of 44x44px.

## 3. Recommended Content Phases
### Phase 1: Authority Building
- **Pillar Page:** Create a comprehensive "Guide to Reddit Lead Generation in 2026" (3,000+ words).
- **FAQ Section:** Add a visible FAQ component to the landing page and include corresponding `FAQPage` schema.

### Phase 2: Category Expansion
- **Comparison Pages:** "Rixly vs Traditional Scraping Tools", "Reddit vs LinkedIn for B2B Leads".
- **Case Studies:** Document real success stories with specific conversion metrics.

## 4. Technical Performance (Monitoring)
- **Image Optimization:** Serve images in WebP format and use lazy loading for non-critical assets (below the fold).
- **Scripts:** Audit third-party scripts (Posthog, etc.) periodically to ensure they don't block main thread execution.
