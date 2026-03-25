# Apex Circle Landing Page

Official landing page for Apex Circle, a community for innovators, builders, and problem-solvers focused on coding, AI, cybersecurity, and deep tech.

## Overview

This project is built with Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion. It delivers a modern, animated community website with dedicated sections for hero content, features, showcase stories, partners, team, contact, and FAQs.

## Key Features

- Community-first branding and content for Apex Circle
- Responsive homepage with dark/light theme support
- Animated sections and interactive carousels
- Team crew slider in the Team section
- Partner section with logos and links
- Contact section with WhatsApp, Discord, LinkedIn, email, and phone
- Optimized static production build via Next.js

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide React Icons

## Project Structure

```text
app/
  layout.tsx
  page.tsx
  globals.css
components/
  PortfolioNavbar.tsx
  ProductTeaserCard.tsx
  FeaturesSection.tsx
  BankingScaleHero.tsx
  CaseStudiesCarousel.tsx
  IntegrationCarousel.tsx
  PartnersSection.tsx
  CommunitySections.tsx
  PricingSection.tsx
  FAQSection.tsx
  Footer.tsx
public/
  icon.svg
  placeholder.jpg
```

## Getting Started

### 1. Clone

```bash
git clone https://github.com/YuvisTechPoint/Apex-Circle.git
cd Apex-Circle
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run in Development

```bash
npm run dev
```

Open http://localhost:3000

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run lint checks
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check formatting

## Deployment

### Vercel (recommended)

1. Import the repository in Vercel.
2. Set framework preset to Next.js.
3. Deploy with default build command: `npm run build`.

## Brand and Contact

- Community: Apex Circle
- LinkedIn: https://www.linkedin.com/company/apex-circle-official/
- Discord: https://discord.com/invite/K5PEUWnjYs
- WhatsApp Channel: https://whatsapp.com/channel/0029VbB9L7CHQbS20TBFgC1R
- Email: apexcircleofficial2025@gmail.com

## License

This project is maintained by Apex Circle. Add a license file if public reuse permissions are intended.
