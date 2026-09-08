# Implementation Plan - Premium UK Drone Photography & Videography Portfolio

Build an ultra-premium, cinematic, mobile-responsive React web portfolio for a UK-based CAA Registered Drone Operator showcasing professional aerial and ground photography/videography services across Newcastle, Sunderland, Durham, and surrounding areas.

## User Review Required

> [!IMPORTANT]
> - **Booking Policy**: Explicit requirement highlighted across site — appointments must be booked at least 1 week in advance.
> - **WhatsApp Direct Line**: Integrated (+44 7432266867) with custom pre-filled message generator for instant quote requests.
> - **Logo & Video Slots**: Integrated existing logo (`logo.jpeg`) and configured modular placeholder slots for video clips so the user can easily drop in their own videos later.
> - **CAA Registered Pilot Badge**: CAA compliance banner and credentials verification badge (Flyer ID & Operator ID display).

## Key Features & Highlights

1. **Cinematic Hero Banner**:
   - High-impact dark backdrop with animated flight radar scanlines, 3D/drone motion feel, badge for "DJI Air 3S Operator", and instant action CTA buttons ("Book Booking Slot", "Explore Portfolio").
2. **CAA Regulatory & Safety Compliance Badge**:
   - Trust strip showing UK CAA registration, Certified Pilot status, Legal & Flight Restriction checks, and £-Value safety assurance.
3. **Interactive Service & Package Selector**:
   - Event Videography & Drone Packages: Essential (£100), Premium (£250), Full Event (£400).
   - Photography Packages: Drone Aerial Photography (£30 - 10 photos) & iPhone 17 Pro Photography (£25 - 10 photos).
   - Interactive Booking Estimator: Allows client to select package, extra hours, and automatically formats WhatsApp inquiry.
4. **Cinematic Showcase Gallery & Video Slots**:
   - Filterable gallery (Aerial 4K, Events, Celebrations, iPhone 17 Pro).
   - Dual Video Player slots with ambient glowing play buttons, video modal, and empty dropzone placeholders marked "User Video Slot #1" and "User Video Slot #2" with easy file replacement instructions.
5. **Gear & Technology Showcase**:
   - Feature highlight of the **DJI Air 3S** (50MP Dual-Camera System, 4K/60fps aerials) and **iPhone 17 Pro** ground camera setup.
6. **Coverage Area Map & Notice**:
   - Visual coverage cards for Newcastle (NE3 base), Sunderland, Durham & surrounding North East areas.
   - Prominent notice banner: "📅 Booking Requirement: Minimum 1 week advance notice required."
7. **WhatsApp Booking & Direct Inquiry Modal**:
   - Direct link to `wa.me/447432266867` with custom date, location, and package selector pre-filling the message text.

## Proposed Changes

### Component Architecture (Vite + React + Tailwind CSS + Lucide Icons)

#### [NEW] [package.json](file:///d:/Download/camsite/package.json)
- Project setup with React 18, Vite, Lucide React icons, TailwindCSS, Autoprefixer, Framer Motion for buttery-smooth animations.

#### [NEW] [src/index.css](file:///d:/Download/camsite/src/index.css)
- Premium dark theme design system (`#090B10` background, glassmorphism, glow effects, gold & cyan gradients, custom animations).

#### [NEW] [src/App.jsx](file:///d:/Download/camsite/src/App.jsx)
- Main application shell linking all sections with fixed glass navigation bar, floating WhatsApp quick action button, and footer.

#### [NEW] [src/components/Hero.jsx](file:///d:/Download/camsite/src/components/Hero.jsx)
- Hero section with camera lens overlay, headline, location badges, DJI Air 3S tag, and quick booking trigger.

#### [NEW] [src/components/CaaBadge.jsx](file:///d:/Download/camsite/src/components/CaaBadge.jsx)
- Trust & CAA Registration banner highlighting safety compliance in UK airspace.

#### [NEW] [src/components/Packages.jsx](file:///d:/Download/camsite/src/components/Packages.jsx)
- Pricing grid displaying Videography (£100/£250/£400) and Photography (£30/£25) packages with feature checklists and instant "Select & Book" trigger.

#### [NEW] [src/components/VideoGallery.jsx](file:///d:/Download/camsite/src/components/VideoGallery.jsx)
- Premium video showcase with play overlays, ambient video player lightboxes, and clear placeholders for user video uploads.

#### [NEW] [src/components/PhotoGallery.jsx](file:///d:/Download/camsite/src/components/PhotoGallery.jsx)
- High-res photo gallery featuring 50MP aerial drone shots and iPhone 17 Pro event photography with lightbox modal preview.

#### [NEW] [src/components/Equipment.jsx](file:///d:/Download/camsite/src/components/Equipment.jsx)
- Tech specifications for DJI Air 3S (50MP Dual Camera, Nightscape, 4K HDR) & iPhone 17 Pro.

#### [NEW] [src/components/BookingNotice.jsx](file:///d:/Download/camsite/src/components/BookingNotice.jsx)
- Highlight box emphasizing Newcastle NE3 coverage and 1-week advance booking policy.

#### [NEW] [src/components/ContactModal.jsx](file:///d:/Download/camsite/src/components/ContactModal.jsx)
- Interactive WhatsApp booking modal that crafts a message to `+44 7432266867`.

## Verification Plan

### Automated Verification
1. Run `npm install` and `npm run build` in `d:\Download\camsite` to ensure zero compilation or syntax errors.
2. Launch dev server using `npm run dev` and verify HTTP response and site loading.

### Manual / Visual Verification
1. Inspect UI in browser to verify mobile responsiveness, animations, color palette, logo rendering (`logo.jpeg`), video player slots, pricing cards, and WhatsApp link functionality.
