# Figé Spinners

A luxury e-commerce platform for limited edition precision spinners.

## Features

- Modern, responsive design
- Stripe integration for secure payments
- Real-time inventory tracking
- Animated transitions and scroll reveals
- Dark theme with gold accents

## Tech Stack

- Next.js 13.5.6
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Stripe API

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/designjon/fige.git
cd fige
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file with:
```
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Run the development server:
```bash
pnpm dev
```

## Deployment

The site is configured for deployment on Vercel. Required environment variables:
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_BASE_URL`

## License

All rights reserved © 2024 Jon Friedman
