# Portfolio — Daniel Niedzwiedzki

A personal portfolio site built to showcase my projects, skills, and experience as a frontend software engineer. Designed with performance, accessibility, and visual polish in mind.

🔗 **Live Site:** [your-domain.com](https://your-domain.com)

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** React Icons
- **Font:** Fira Code + custom typography

## Features

- Fully responsive across all screen sizes
- ADA compliant — keyboard navigable, ARIA labeling, semantic HTML
- Fixed navbar with active section tracking via Intersection Observer
- Typewriter effect cycling through roles
- Animated project cards with staggered reveal on scroll
- GitHub API integration pulling live project data
- Mobile menu with focus trapping and scroll lock
- Smooth scroll with CSS anchor navigation

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view locally.

## Project Structure

```
app/
├── layout.tsx        # Root layout with Navbar
├── page.tsx          # Main page with all sections
components/
├── Navbar.tsx        # Fixed nav with active section tracking
├── Hero.tsx          # Landing section
├── About.tsx         # About me + stats
├── Projects.tsx      # GitHub-powered project grid
├── ProjectCard.tsx   # Animated individual project card
├── Skills.tsx        # Tech stack display
├── Experience.tsx    # Work history
└── Contact.tsx       # Contact section
utils/
└── fetchProjects.ts  # GitHub API helper
```

## Accessibility

This site is built with accessibility as a first-class concern:

- Semantic HTML throughout
- `aria-label`, `aria-expanded`, `aria-controls` on interactive elements
- Focus management on mobile menu open/close
- Keyboard navigable navigation and interactive components
- Color contrast compliant text
