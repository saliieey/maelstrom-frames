# Quick Setup Guide

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:3000`

## Important Notes

### GSAP ScrollTrigger
The project uses GSAP with ScrollTrigger plugin. Make sure ScrollTrigger is properly registered in components that use it. The registration is handled automatically in each component with a window check.

### Images
Currently using Unsplash placeholder images. Replace these with your actual portfolio images:
- Update image URLs in `components/PortfolioGrid.tsx`
- Update image URLs in `app/portfolio/page.tsx`
- Update hero section images in `components/HeroSection.tsx` and page files

### Content
- Update company information in Footer component
- Update contact details in Contact page
- Customize service descriptions in Services page
- Add your actual portfolio items

### Colors
The warm color palette is defined in `tailwind.config.js`. Adjust the `warm` color scale to match your brand.

## Production Build

```bash
npm run build
npm start
```

## Deployment

This Next.js app can be deployed to:
- Vercel (recommended)
- Netlify
- Any Node.js hosting service

For Vercel:
1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

## Performance Tips

- Images are optimized with Next.js Image component
- Fonts are optimized with next/font
- Code splitting is automatic with Next.js
- GSAP animations are properly cleaned up

## Browser Support

Tested and working on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

