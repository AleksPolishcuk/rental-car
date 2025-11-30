# 🚗 RentalCar — Modern Car Rental Platform

A modern and responsive **car rental web application** built with **Next.js**, **TypeScript**, and **Zustand**.
The platform allows users to browse, filter, and book rental cars with an intuitive and user-friendly interface.

🔗 **Live Demo:** [https://rental-car-beta-five.vercel.app](https://rental-car-beta-five.vercel.app)

---

## 📌 Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Project Structure](#project-structure)
* [API](#api)
* [Getting Started](#getting-started)
* [Design & UX](#design--ux)
* [Scripts](#scripts)
* [Environment Variables](#environment-variables)
* [Developer](#developer)

---

## 📋 Overview

**RentalCar** is a frontend-focused application for rental companies. It includes:

* Home page with hero section and CTA
* Catalog with advanced filtering and pagination
* Car details page with full specifications and booking form
* Favorites system (localStorage)
* Fully responsive UI designed for mobile, tablet, and desktop

---

## 🎯 Features

### 🔎 Catalog & Filtering

* Brand filtering
* Price-per-hour filtering
* Mileage range filtering
* Real-time search with API requests
* "Load More" button for pagination

### 🚘 Car Details Page

* Full technical specifications
* High-quality gallery
* Fully validated booking form
* Responsive layout

### ❤️ User Experience

* Favorites stored in localStorage
* Skeleton loaders
* Error boundaries
* Accessible components (ARIA support)

---

## 🛠 Tech Stack

| Category             | Technologies                |
| -------------------- | --------------------------- |
| **Framework**        | Next.js 16 (App Router)     |
| **Language**         | TypeScript 5                |
| **State Management** | Zustand 5                   |
| **HTTP Client**      | Axios 1                     |
| **Styling**          | CSS Modules                 |
| **Date Handling**    | date-fns 4                  |
| **Rendering**        | Server-side Rendering / CSR |

---

## 📁 Project Structure

```
rental-car/
├── app/
│   ├── catalog/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── UI/
│   ├── Filters/
│   ├── CarCard/
│   ├── BookingForm/
│   └── ErrorBoundary/
├── lib/
│   ├── store/
│   ├── api/
│   ├── hooks/
│   └── utils/
├── types/
└── public/
```

---

## 📚 API

Base URL: **[https://car-rental-api.goit.global](https://car-rental-api.goit.global)**

### Endpoints:

* **GET /cars** — paginated list with filtering
* **GET /cars/:id** — get a single car
* **GET /brands** — list of available brands
* **POST /cars/:id/booking** — submit a booking (IN FUTURE)

### 🔐 API Features

* Backend-driven filtering
* Real-time availability
* Detailed error handling
* Safe booking submission

---

## 🚀 Getting Started

### ✔ Prerequisites

* Node.js 18+
* npm or yarn

### ✔ Installation

```bash
git clone https://github.com/your-username/rental-car.git
cd rental-car
npm install
```

### ✔ Run Development Server

```bash
npm run dev
```

Open in browser:
**[http://localhost:3000](http://localhost:3000)**

### ✔ Build for Production

```bash
npm run build
npm start
```

---

## 🎨 Design & UX

### 📐 Design System

* Fonts: **Manrope**, **Inter**
* Color palette: modern blue theme
* Icon set: custom SVG system
* Grid: 8px spacing system

### 📱 Responsive Breakpoints

| Device  | Width      |
| ------- | ---------- |
| Mobile  | 320–767px  |
| Tablet  | 768–1439px |
| Desktop | 1440px+    |

---

## 🔧 Scripts

```bash
npm run dev     # Run development server
npm run build   # Build for production
npm run start   # Start production mode
npm run lint    # Lint codebase
```

---

## 🔒 Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=https://car-rental-api.goit.global
```

---

## 👨‍💻 Developer

**Oleksandr Polishchuk**
GitHub: [https://github.com/AleksPolishcuk](https://github.com/AleksPolishcuk)

---

⭐ *If you like this project, feel free to star the repository!*
