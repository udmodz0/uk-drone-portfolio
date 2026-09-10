<div align="center">

  <!-- Animated Typing Header -->
  <a href="https://airvibe.uk">
    <img src="https://readme-typing-svg.demolab.com?font=Cinzel&size=34&duration=3800&pause=1000&color=FFFFFF&center=true&vCenter=true&width=820&height=70&lines=AIRVIBE.UK+%E2%80%A2+AERIAL+CINEMATOGRAPHY;CAA+LICENSED+DRONE+PILOT;50MP+DUAL-CAMERA+CINEMA+%E2%80%A2+DJI+AIR+3S;NEWCASTLE+%E2%80%A2+SUNDERLAND+%E2%80%A2+DURHAM" alt="AirVibe UK Typing Header" />
  </a>

  <p align="center">
    <strong>Ultra-premium, interactive 3D WebGL drone cinematography portfolio crafted with React, Three.js, and cinematic physics.</strong>
  </p>

  <!-- Animated Shields & Status Badges -->
  <p align="center">
    <a href="https://github.com/udmodz0/uk-drone-portfolio/stargazers"><img src="https://img.shields.io/github/stars/udmodz0/uk-drone-portfolio?color=10B981&labelColor=0B0D11&style=for-the-badge&logo=github" alt="GitHub Stars" /></a>
    <a href="https://github.com/udmodz0/uk-drone-portfolio/network/members"><img src="https://img.shields.io/github/forks/udmodz0/uk-drone-portfolio?color=06B6D4&labelColor=0B0D11&style=for-the-badge&logo=github" alt="Forks" /></a>
    <a href="https://github.com/udmodz0/uk-drone-portfolio/blob/main/package.json"><img src="https://img.shields.io/badge/REACT-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white&labelColor=0B0D11" alt="React 18" /></a>
    <a href="https://threejs.org"><img src="https://img.shields.io/badge/THREE.JS-WebGL_3D-white?style=for-the-badge&logo=three.js&logoColor=white&labelColor=0B0D11" alt="Three.js" /></a>
    <a href="https://vitejs.dev"><img src="https://img.shields.io/badge/VITE-5.4-BD34FE?style=for-the-badge&logo=vite&logoColor=white&labelColor=0B0D11" alt="Vite" /></a>
    <a href="https://www.caa.co.uk/"><img src="https://img.shields.io/badge/UK_CAA-CERTIFIED-34D399?style=for-the-badge&logo=shield&logoColor=white&labelColor=0B0D11" alt="CAA Certified" /></a>
  </p>

  <!-- Live Capsule Preview -->
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0b0d11,50:064e3b,100:0b0d11&height=180&section=header&text=AIRVIBE%20UK&fontSize=52&fontColor=ffffff&fontAlignY=42&desc=British%20Luxury%20Editorial%20Drone%20Cinematography&descSize=16&descColor=6ee7b7&descAlignY=65&animation=fadeIn" width="100%" alt="AirVibe Banner Wave" />

</div>

---

## ⚡ Flight Telemetry & Overview

```
 🛰️ AIRBORNE TELEMETRY // AIRVIBE FLEET
 ──────────────────────────────────────────────────────────────────
 OPERATING PLATFORM   : DJI Air 3S Dual-Camera Primary
 SENSOR SPECS         : 1" Primary CMOS (50MP) + 70mm Medium Telephoto (48MP)
 FLIGHT CEILING       : CAA 120m UK Altitude Compliant
 COLOR DEPTH          : 10-Bit D-Log M & HLG // 4K 60FPS HDR
 REGIONAL COVERAGE    : Newcastle Upon Tyne (NE3) • Sunderland • Durham
 SAFETY CLEARANCE     : CAA Flyer ID & Operator ID Compliant
 ──────────────────────────────────────────────────────────────────
```

---

## ✨ Cinematic Key Features

<table>
  <tr>
    <td width="50%">
      <h3 align="center">🛸 Interactive 3D WebGL Drone</h3>
      <p>Photorealistic 3D DJI Air 3S with physical carbon-fiber materials, continuous gyroscopic stabilization, interactive 360° mouse & touch drag orbit, and dynamic hotspot inspection pins.</p>
    </td>
    <td width="50%">
      <h3 align="center">🎚️ Real Aerial Comparison Slider</h3>
      <p>Interactive before/after drag divider comparing authentic ground-level photos against 50MP elevated drone cinema shots taken across live North East UK client events.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3 align="center">💰 Instant Event Quote Estimator</h3>
      <p>Real-time interactive quote calculator factoring flight hours, Newcastle/Sunderland/Durham travel radius, 4K reel add-ons, and instant 1-click WhatsApp quote dispatch.</p>
    </td>
    <td width="50%">
      <h3 align="center">🎬 Custom Direct 4K Video Player</h3>
      <p>Custom HTML5 video lightbox without third-party iframe bloat, complete with hover preview auto-streaming, keyboard <code>ESC</code> support, and synchronized play promise management.</p>
    </td>
  </tr>
</table>

---

## 🏗️ Architecture & 3D Flight Dynamics

```mermaid
flowchart LR
    A["📜 Scroll Input"] -->|Normalised Scroll Progress| B["🛸 ThreeDroneScene.jsx"]
    B --> C["Hover Micro-Oscillation (sin/cos)"]
    B --> D["Camera & Gimbal Pitch Shift"]
    B --> E["360° Mouse / Touch Drag Orbit"]
    B --> F["Propeller Spin (28 rad/s)"]
    
    C & D & E & F --> G["🎬 Cinematic Hero Viewport"]
    
    G --> H["🎚️ Aerial Comparison Slider"]
    H --> I["💰 Interactive Quote Estimator"]
    I --> J["🎥 4K Video Reels & Gallery"]
    J --> K["🛡️ CAA Regulatory Badge & Footer"]
```

---

## 🛠️ Technology Stack

<div align="center">

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | `React 18`, `JSX`, `Hooks` |
| **3D Graphics & Shaders** | `Three.js`, `WebGL`, `PerspectiveCamera`, `MeshStandardMaterial` |
| **Styling & Design System** | `Tailwind CSS`, `Custom Glassmorphism`, `Remix Icons (ri-*)` |
| **Tooling & Build System** | `Vite 5`, `PostCSS`, `Autoprefixer`, `ESLint` |
| **Media Delivery & CDNs** | Multi-tier failover (`catbox.moe` & `i.ibb.co`), Direct MP4 Stream Resolver |
| **Compliance & Safety** | UK CAA Airspace Regulation Standards, Sub-250g / C1 Protocols |

</div>

---

## 🚀 Quick Start & Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/udmodz0/uk-drone-portfolio.git
cd uk-drone-portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```
> Open [http://localhost:3000](http://localhost:3000) in your browser to experience the live 3D drone viewport.

### 4. Build for Production
```bash
npm run build
```

---

## 📸 Authentic Portfolio Showcase

<div align="center">

| Newcastle Sports Pavilion (58m Altitude) | Durham Event Grounds (75m Altitude) | Sunderland 70mm Telephoto Action (42m) |
| :---: | :---: | :---: |
| <img src="https://i.ibb.co/hRWZ8R6Y/IMG-0025.jpg" width="260" alt="Newcastle Pavilion" /> | <img src="https://i.ibb.co/LX8Kdssf/IMG-0018.jpg" width="260" alt="Durham Grounds" /> | <img src="https://i.ibb.co/v4cxrywr/IMG-0019.jpg" width="260" alt="Sunderland Match" /> |
| *50MP Dual Lens Cinema* | *Full Perimeter Scale* | *Optical Subject Compression* |

</div>

---

## 📋 Available Packages

<details>
<summary><b>📦 Click to expand service packages & pricing</b></summary>

<br />

| Package | Coverage | Deliverables | Price |
| :--- | :--- | :--- | :--- |
| **Essential** | 2 Hours | 2 Edited Videos • 50 Edited Photos • 4K Drone | **£100** |
| **Premium (Most Popular)** | 4 Hours | 3 Edited Videos • 100 Edited Photos • Highlight Reel | **£250** |
| **Full Event VIP** | Up to 6 Hours | 5 Edited Videos • 200 Edited Photos • Cinematic Master | **£400** |
| **50MP Drone Photos** | Add-on | 10 High-Resolution 50MP Aerial Drone Photos | **£30** |
| **iPhone 17 Pro Ground** | Add-on | 10 ProRAW Ground Portraits & Candid Moments | **£25** |

</details>

---

## 🛡️ UK CAA Safety & Compliance

- ✅ **CAA Certified Operator & Pilot**: Fully registered with the UK Civil Aviation Authority.
- ✅ **Airspace Pre-flight Safety Checks**: Every flight site is checked against NOTAMs and flight restriction zones (FRZs).
- ✅ **Weather Protocols**: Strict operational adherence to maximum wind thresholds and precipitation safety.
- ✅ **Public Liability Protected**: Comprehensive coverage for peace of mind at private, commercial, and public events.

---

## 📞 Contact & Booking

<div align="center">

[![WhatsApp Contact](https://img.shields.io/badge/WhatsApp-Book_Now-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/447432266867?text=Hello%20AirVibe%20UK,%20I'd%20like%20to%20enquire%20about%20drone%20coverage)
[![Website](https://img.shields.io/badge/Official_Website-AIRVIBE.UK-0B0D11?style=for-the-badge&logo=safari&logoColor=white)](https://github.com/udmodz0/uk-drone-portfolio)

**Location**: Newcastle upon Tyne (NE3) • Sunderland • Durham  
**Notice**: Advance booking of 1 week required for CAA airspace authorization.

</div>

---

<div align="center">
  <sub>Designed & engineered with precision for <strong>AirVibe UK</strong>. Built with React & Three.js.</sub>
</div>
