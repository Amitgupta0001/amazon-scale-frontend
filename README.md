<div align="center">

# 🛒 AmazonScale Frontend

<img src="./src/assets/logos/logo.svg" alt="AmazonScale Logo" width="120"/>

# AmazonScale Frontend

**Enterprise-Grade E-Commerce Frontend**

Built with **React 19**, **TypeScript**, and **Vite** while following modern software engineering and frontend architecture practices.

![Status](https://img.shields.io/badge/Status-Phase%202%20Completed-brightgreen)
![React](https://img.shields.io/badge/React-19.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-6.x-blue)
![Vite](https://img.shields.io/badge/Vite-8.x-purple)
![License](https://img.shields.io/badge/License-MIT-green)

---

✨ **Phase 2 — Core Layout & Home Page Implemented**

</div>

---

# 📖 Overview

AmazonScale Frontend is the client-side application of the **AmazonScale E-Commerce Platform**.

The objective of this project is to build a production-ready, scalable, and maintainable e-commerce frontend while adhering to strict component-driven architecture, modular BEM CSS styling, and clean software design patterns.

This project seamlessly integrates with the **AmazonScale Backend**, developed using Java and Spring Boot.

---

# 🎯 Objectives

The project is focused on learning and implementing enterprise-level practices:

- React 19 Component Architecture
- TypeScript Strong Typing & Interfaces
- BEM (Block Element Modifier) CSS Design System
- Modern Responsive Layouts & Flexbox/Grid
- Scalable Navigation Suite & Header/Footer
- Dynamic Home Page (Hero, Categories, Products, Deals, Recommendations)
- Lucide React Icon Library Integration
- REST API Integration Strategy
- Docker Containerization & CI/CD Pipelines

---

# 🚀 Development Roadmap

## ✅ Phase 0 — Project Foundation
- GitHub Repository Setup
- Git Branching Strategy & Workflow
- Initial Project Planning & Architectural Documentation

---

## ✅ Phase 1 — Project Bootstrap
- React 19 + TypeScript + Vite Tooling
- ESLint & Code Formatting Rules
- Development Environment Setup
- Global Styles & CSS Tokens

---

## ✅ Phase 2 — Core Layout & Home Page Implementation
- **Header Component Suite**:
  - `Logo`: Brand Logo display with custom SVG asset
  - `Delivery`: User location selector with icon support
  - `SearchBar`: Interactive search input with category filter & quick submit button
  - `Language`: Regional language and currency preferences dropdown trigger
  - `Account`: User sign-in status and account dropdown trigger
  - `Orders`: Direct link to returns and order tracking
  - `Cart`: Interactive shopping cart indicator with live count badge
- **Footer Component Suite**: Multi-tier navigational footer with Back-to-Top, company info, and locale controls
- **Home Page Suite**:
  - `Hero`: Prominent hero banner with promotional content
  - `CategoryGrid` & `CategoryCard`: Responsive grid displaying featured product categories
  - `ProductGrid` & `ProductCard`: Dynamic product card layout with ratings, prices, and CTA buttons
  - `FeaturedProducts`: Section showcasing highlighted products
  - `DealsSection`: Promotional banner for limited-time offers and discounts
  - `Recommendations`: Tailored product recommendations based on browsing history

---

## 🚧 Phase 3 — Product Catalog & Detail Views (Next Phase)
- Product Listing & Filter Sidebar
- Search Results Page
- Detailed Product Information Page (Image Gallery, Specifications, Reviews)

---

## 🔜 Upcoming Phases
- Client-Side Routing (React Router)
- State Management (Context API / Redux / Zustand)
- Shopping Cart & Wishlist Functional Logic
- User Authentication (Login / Registration / JWT handling)
- REST API Integration (Axios / TanStack Query)
- Checkout & Order Management Flow
- Automated Testing (Vitest / React Testing Library)
- Dockerization & Deployment (Vercel / GitHub Actions)

---

# 🛠 Current Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Framework** | React | `19.2.x` |
| **Language** | TypeScript | `6.0.x` |
| **Build Tool** | Vite | `8.2.x` |
| **Icons** | Lucide React | `1.28.x` |
| **Styling** | Vanilla CSS (BEM Architecture) | CSS3 |
| **Code Quality** | ESLint | `10.8.x` |

---

# 📦 Planned Tech Stack

### UI & Styling
- Tailwind CSS / Radix UI / shadcn/ui primitives

### Navigation & Routing
- React Router DOM

### HTTP & State Management
- Axios
- TanStack Query (React Query)

### Forms & Validation
- React Hook Form + Zod

### Notifications
- Sonner / React Hot Toast

### Testing & Quality Assurance
- Vitest
- React Testing Library

### DevOps & Deployment
- Docker
- GitHub Actions (CI/CD)
- Vercel Hosting

---

# 🏗 Current Project Structure

```text
src/
├── assets/
│   ├── icons/
│   ├── images/
│   └── logos/
│       └── logo.svg
├── components/
│   ├── layout/
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   ├── Header.css
│   │   │   └── index.ts
│   │   └── Footer/
│   │       ├── Footer.tsx
│   │       ├── Footer.css
│   │       └── index.ts
│   └── navigation/
│       ├── Logo/
│       │   ├── Logo.tsx
│       │   ├── Logo.css
│       │   └── index.ts
│       ├── Delivery/
│       │   ├── Delivery.tsx
│       │   ├── Delivery.css
│       │   └── index.ts
│       ├── SearchBar/
│       │   ├── SearchBar.tsx
│       │   ├── SearchBar.css
│       │   └── index.ts
│       ├── Language/
│       │   ├── Language.tsx
│       │   ├── Language.css
│       │   └── index.ts
│       ├── Account/
│       │   ├── Account.tsx
│       │   ├── Account.css
│       │   └── index.ts
│       ├── Orders/
│       │   ├── Orders.tsx
│       │   ├── Orders.css
│       │   └── index.ts
│       └── Cart/
│           ├── Cart.tsx
│           ├── Cart.css
│           └── index.ts
├── pages/
│   └── Home/
│       ├── Home.tsx
│       ├── Home.css
│       ├── index.ts
│       └── components/
│           ├── Hero/
│           │   ├── Hero.tsx
│           │   ├── Hero.css
│           │   └── index.ts
│           ├── CategoryCard/
│           │   ├── CategoryCard.tsx
│           │   ├── CategoryCard.css
│           │   └── index.ts
│           ├── CategoryGrid/
│           │   ├── CategoryGrid.tsx
│           │   ├── CategoryGrid.css
│           │   └── index.ts
│           ├── ProductCard/
│           │   ├── ProductCard.tsx
│           │   ├── ProductCard.css
│           │   └── index.ts
│           ├── ProductGrid/
│           │   ├── ProductGrid.tsx
│           │   ├── ProductGrid.css
│           │   └── index.ts
│           ├── FeaturedProducts/
│           │   ├── FeaturedProducts.tsx
│           │   ├── FeaturedProducts.css
│           │   └── index.ts
│           ├── DealsSection/
│           │   ├── DealsSection.tsx
│           │   ├── DealsSection.css
│           │   └── index.ts
│           └── Recommendations/
│               ├── Recommendations.tsx
│               ├── Recommendations.css
│               └── index.ts
├── styles/
│   ├── globals.css
│   └── hero.css
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

---

# 🏛 Component Architecture Overview

```text
App
├── Header Layout
│   ├── Logo (Brand & Navigation)
│   ├── Delivery (Location Selector)
│   ├── SearchBar (Category Filter & Input)
│   ├── Language (Locale Selection)
│   ├── Account (Sign In & Profile)
│   ├── Orders (Order Tracking)
│   └── Cart (Item Counter & Cart Link)
├── Home Page
│   ├── Hero (Promotional Banner)
│   ├── CategoryGrid (Category Cards)
│   ├── FeaturedProducts (Highlighted Catalog Items)
│   ├── DealsSection (Limited-time Discounts)
│   └── Recommendations (Personalized Products)
└── Footer Layout
    ├── Back To Top Controller
    ├── Navigation Links Grid
    └── Copyright & Brand Information
```

---

# 📂 Completed Files & Modules Audit

| Module / Layer | File Path | Description | Status |
| :--- | :--- | :--- | :---: |
| **Root Application** | `src/App.tsx` | Main application layout wrapper | ✅ Completed |
| **Global Styles** | `src/styles/globals.css` | Base typography, color tokens, reset rules | ✅ Completed |
| **Header Wrapper** | `src/components/layout/Header/Header.tsx` | Header bar combining all navigation components | ✅ Completed |
| **Header Styles** | `src/components/layout/Header/Header.css` | BEM styles for layout & header responsiveness | ✅ Completed |
| **Footer Component** | `src/components/layout/Footer/Footer.tsx` | Multi-section footer with links & back-to-top | ✅ Completed |
| **Footer Styles** | `src/components/layout/Footer/Footer.css` | BEM styles for footer grid & links | ✅ Completed |
| **Logo Component** | `src/components/navigation/Logo/Logo.tsx` | AmazonScale logo with link navigation | ✅ Completed |
| **Delivery Component**| `src/components/navigation/Delivery/Delivery.tsx` | Delivery location selector component | ✅ Completed |
| **Search Bar Component**| `src/components/navigation/SearchBar/SearchBar.tsx` | Search bar with search icon & dropdown | ✅ Completed |
| **Language Component** | `src/components/navigation/Language/Language.tsx` | Language and region selector component | ✅ Completed |
| **Account Component** | `src/components/navigation/Account/Account.tsx` | Account sign-in & list trigger component | ✅ Completed |
| **Orders Component** | `src/components/navigation/Orders/Orders.tsx` | Returns and order tracking button | ✅ Completed |
| **Cart Component** | `src/components/navigation/Cart/Cart.tsx` | Cart icon with dynamic item badge | ✅ Completed |
| **Home Page Page** | `src/pages/Home/Home.tsx` | Main home page aggregating sections | ✅ Completed |
| **Hero Banner** | `src/pages/Home/components/Hero/Hero.tsx` | Promotional hero section banner | ✅ Completed |
| **Category Grid** | `src/pages/Home/components/CategoryGrid/CategoryGrid.tsx` | Grid displaying product categories | ✅ Completed |
| **Category Card** | `src/pages/Home/components/CategoryCard/CategoryCard.tsx` | Individual category card element | ✅ Completed |
| **Product Grid** | `src/pages/Home/components/ProductGrid/ProductGrid.tsx` | Flexible grid container for product cards | ✅ Completed |
| **Product Card** | `src/pages/Home/components/ProductCard/ProductCard.tsx` | Reusable product item card with pricing & actions | ✅ Completed |
| **Featured Products**| `src/pages/Home/components/FeaturedProducts/FeaturedProducts.tsx` | Featured items highlight section | ✅ Completed |
| **Deals Section** | `src/pages/Home/components/DealsSection/DealsSection.tsx` | Special promotional deals section | ✅ Completed |
| **Recommendations** | `src/pages/Home/components/Recommendations/Recommendations.tsx` | Product recommendations slider/grid | ✅ Completed |

---

# 🔗 Backend Integration

AmazonScale Frontend communicates with the AmazonScale Spring Boot Backend via REST APIs.

- **Backend Repository**: [https://github.com/Amitgupta0001/amazon-scale-backend](https://github.com/Amitgupta0001/amazon-scale-backend)

---

# ⚙️ Getting Started

## 1. Clone Repository

```bash
git clone https://github.com/Amitgupta0001/amazon-scale-frontend.git
```

## 2. Navigate to Project Directory

```bash
cd amazon-scale-frontend
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Start Local Development Server

```bash
npm run dev
```

## 5. Build for Production

```bash
npm run build
```

---

# 📌 Project Status Summary

| Item | Status |
|------|--------|
| **Current Version** | `v0.3.0-dev` |
| **Active Phase** | `Phase 2 (Completed)` ➔ `Phase 3 (Preparing)` |
| **Header Suite** | ✅ 100% Completed |
| **Home Page Suite** | ✅ 100% Completed |
| **Footer Suite** | ✅ 100% Completed |
| **Icons Integration** | ✅ Lucide React Integrated |
| **Product Catalog Page** | ⏳ Planned for Phase 3 |

---

<div align="center">

### Building AmazonScale one feature at a time.

**Learn • Design • Build • Review • Repeat**

</div>