# Maelstrom Frames - Professional Photography Website

A modern, high-performance photography and videography website built with Next.js 14, TypeScript, and GSAP animations.

## Features

- ⚡ **Next.js 14** - Latest React framework for optimal performance
- 🎨 **Modern Design** - Clean, professional UI with warm color palette
- 📱 **Fully Responsive** - Works seamlessly on all devices
- ✨ **GSAP Animations** - Smooth, professional scroll animations
- 🎬 **Portfolio Showcase** - Beautiful gallery for photos and videos
- 📝 **SEO Optimized** - Proper H1 tags and meta descriptions
- 🎯 **Event Coverage** - Dedicated page for event documentation services
- 📧 **Contact Form** - Easy way for clients to get in touch

## Pages

1. **Home** - Hero section, services preview, portfolio highlights, testimonials
2. **About** - Company story and values (400-600 words, H1 tag)
3. **Services** - Comprehensive service offerings
4. **Portfolio** - Filterable gallery of work
5. **Event Coverage** - Dedicated event documentation page
6. **Contact** - Contact form and information

## Requirements Met

✅ One H1 tag per page  
✅ 400-600 words minimum per page (About page: ~600 words)  
✅ Event Coverage page included  
✅ Responsive design for all devices  
✅ Professional animations with GSAP  
✅ White background with warm color accents  
✅ Consistent padding and alignment  
✅ Professional, neat, and clean design  

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd maelstrom-frames
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP (GreenSock Animation Platform)
- **Smooth Scroll**: Lenis
- **Fonts**: Inter, Playfair Display (Google Fonts)

## Project Structure

```
maelstrom-frames/
├── app/
│   ├── about/
│   ├── contact/
│   ├── events/
│   ├── portfolio/
│   ├── services/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── PortfolioGrid.tsx
│   ├── ServicesPreview.tsx
│   ├── Testimonials.tsx
│   ├── CTA.tsx
│   └── SmoothScroll.tsx
├── public/
└── package.json
```

## Customization

### Colors

Edit `tailwind.config.js` to customize the warm color palette:

```javascript
colors: {
  warm: {
    // Your custom warm colors
  }
}
```

### Content

- Update images in components (replace Unsplash URLs with your own)
- Modify text content in page files
- Add your actual portfolio items
- Update contact information in Footer and Contact page

## Performance Optimizations

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Optimized fonts with next/font
- Smooth scroll with Lenis
- GSAP animations with proper cleanup

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.

## Contact

For questions or support, please contact the development team.

---

Built with ❤️ for Maelstrom Frames

