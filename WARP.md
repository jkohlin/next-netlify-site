# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Architecture Overview

This is a hybrid Next.js application that combines:
- **Next.js 15** with App Router architecture
- **Netlify Platform** deployment with Edge Functions and Blob storage
- **Sanity CMS** headless content management
- **Tailwind CSS + daisyUI** for styling
- **TypeScript/JavaScript** mixed codebase

### Key Integration Points

**Netlify Integration**: The site uses both implicit Next.js features (automatic serverless functions from Route Handlers) and explicit Netlify primitives (Blob storage in `/app/blobs/`, Edge Functions in `/app/edge/`).

**Sanity CMS Setup**: Content is managed through Sanity Studio accessible at `/studio` route. The main page (`app/page.jsx`) fetches posts from Sanity, though the original Netlify platform demo content is commented out.

**Mixed Architecture**: The codebase is transitioning from a Netlify platform demo to a Sanity-powered site, evidenced by commented code in `app/page.jsx` and the Swedish documentation in `LÄSMIG.md`.

## Development Commands

### Local Development
```bash
# Preferred development method (includes Netlify features)
netlify dev

# Alternative Next.js development (limited Netlify features)
npm run dev
```

### Build and Deploy
```bash
# Production build
npm run build

# Start production server locally
npm start

# Lint code
npm run lint
```

### Sanity CMS Operations
```bash
# Extract Sanity schema (run after schema changes)
npx sanity@latest schema extract --path=src/sanity/extract.json

# Generate TypeScript types (run after schema or query changes)
npx sanity@latest typegen generate

# Combined command for both operations
npm run typegen  # (if configured in package.json per LÄSMIG.md)
```

## Project Structure

### Application Routes (`/app/`)
- **`/studio/`**: Embedded Sanity Studio for content management
- **`/blobs/`**: Netlify Blob storage demo with CRUD operations
- **`/edge/`**: Edge Function demos with geolocation
- **`/quotes/`**: API routes demonstrating serverless functions
- **`/image-cdn/`**: Netlify Image CDN demonstrations

### Content Management (`/src/sanity/`)
- **`env.ts`**: Environment configuration for Sanity
- **`lib/client.ts`**: Sanity client setup with CDN configuration
- **`lib/queries.ts`**: GROQ queries with TypeScript integration

### Styling (`/components/` + `/styles/`)
- Uses Tailwind CSS with custom daisyUI theme configuration
- Components follow a functional React pattern
- Custom theme: "lofi" with teal primary colors (#2bdcd2)

## Environment Setup

### Required Environment Variables (.env.local)
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-07-11
```

### Netlify CLI Setup
The project requires Netlify CLI for full local development:
```bash
npm install netlify-cli@latest -g
netlify link  # Connect to deployed site
```

## Content Management Workflow

### Sanity Studio Access
- Development: `http://localhost:8888/studio` (via netlify dev)
- Production: `https://yourdomain.com/studio`

### Content Query Pattern
Uses `defineQuery` for type-safe GROQ queries:
```typescript
// Query definition with TypeScript support
export const POSTS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)][0...12]{
  _id, title, slug
}`);

// Usage in components (automatic type inference)
const posts = await client.fetch(POSTS_QUERY);
```

## Build Configuration

### Next.js Configuration
- **React Strict Mode**: Enabled
- **Allowed Dev Origins**: Configured for local network access
- **App Router**: Uses new Next.js 13+ App Router pattern

### Tailwind Configuration
- **Content Scanning**: `./app/**/*.{js,ts,jsx,tsx}`, `./components/**/*.{js,ts,jsx,tsx}`
- **daisyUI Integration**: Custom "lofi" theme with teal accents
- **Custom Background**: Grid pattern with noise texture

### TypeScript Setup
- **Mixed JS/TS**: Allows JavaScript files alongside TypeScript
- **Path Aliases**: `@root/*` maps to project root
- **Sanity Integration**: Configured for type generation

## Deployment Notes

### Netlify Platform Requirements
- Requires **Netlify Next Runtime v5** for full functionality
- Build command: `npm run build`
- Publish directory: `.next`
- Development port: 3000

### Sanity Deployment Considerations
- **CDN Setting**: Currently set to `useCdn: true` in client config
- Should be `false` for static generation or ISR usage
- API version pinned to `2024-07-11`

## Development Context

This codebase represents a transition from a Netlify platform demonstration site to a Swedish personal site ("kohlin.net") powered by Sanity CMS. The Swedish documentation (`LÄSMIG.md`) contains detailed setup instructions and reveals the site's evolution from the original `next-netlify-platform-starter` template.
