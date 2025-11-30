RentalCar - Car Rental Platform

https://img.shields.io/badge/Next.js-16.0.4-black
https://img.shields.io/badge/React-19.2.0-blue
https://img.shields.io/badge/TypeScript-5.9.3-blue
https://img.shields.io/badge/Zustand-5.0.8-purple

A modern car rental web application built with Next.js, TypeScript, and Zustand for state management. The platform allows users to browse, filter, and book rental cars with an intuitive user interface.

🚀 Live Demo
Link: rental-car-beta-five.vercel.app

📋 Project Overview
RentalCar is a frontend web application for a car rental company that provides:

Home page with hero section and call-to-action
Catalog page with advanced filtering and pagination
Car details page with comprehensive information and booking form
Favorites functionality to save preferred vehicles
Responsive design for all device types

🛠️ Technology Stack
Core Technologies

Framework: Next.js 16.0.4 with App Router
Language: TypeScript 5.9.3
State Management: Zustand 5.0.8
HTTP Client: Axios 1.13.2
Styling: CSS Modules with responsive design
Date Handling: date-fns 4.1.0
Key Features Implemented

✅ Server-side rendering with Next.js App Router
✅ Type-safe development with TypeScript
✅ Global state management with Zustand
✅ Advanced filtering (brand, price, mileage)
✅ Pagination with "Load More" functionality
✅ Favorites system with localStorage persistence
✅ Error boundaries for robust error handling
✅ Responsive design for mobile, tablet, and desktop
✅ Accessible form components
✅ Custom date picker component

📁 Project Structure

rental-car/
├── app/ # Next.js App Router pages
│ ├── catalog/ # Catalog page and dynamic routes
│ ├── layout.tsx # Root layout with error boundary
│ └── page.tsx # Home page
├── components/ # Reusable React components
│ ├── UI/ # Basic UI components
│ ├── Filters/ # Filter components
│ ├── CarCard/ # Car card component
│ ├── BookingForm/ # Booking form component
│ └── ErrorBoundary/ # Error handling components
├── lib/ # Utility libraries and configurations
│ ├── store/ # Zustand store definitions
│ ├── api/ # API client and endpoints
│ ├── hooks/ # Custom React hooks
│ └── utils/ # Utility functions
├── types/ # TypeScript type definitions
└── public/ # Static assets

🎯 Key Features
Catalog & Filtering

Advanced Filters: Filter by brand, price per hour, and mileage range
Real-time Search: Instant filtering with backend API calls
Pagination: Load more functionality with infinite scroll pattern
Car Cards: Comprehensive vehicle information with favorite toggle
Car Details

Detailed Information: Full specifications, rental conditions, and features
Image Gallery: High-quality vehicle images
Booking Form: Secure booking with form validation
Responsive Layout: Optimized for all screen sizes
User Experience

Favorites System: Save favorite cars with localStorage persistence
Error Handling: Comprehensive error boundaries and user-friendly messages
Loading States: Skeleton loaders and progress indicators
Accessibility: ARIA labels and keyboard navigation support

🚀 Getting Started
Prerequisites

Node.js 18+
npm or yarn
Installation

Clone the repository
bash
git clone https://github.com/your-username/rental-car.git
cd rental-car
Install dependencies
bash
npm install

# or

yarn install
Run the development server
bash
npm run dev

# or

yarn dev
Open your browser
Navigate to http://localhost:3000
Building for Production

bash
npm run build
npm start

📚 API Integration
The application integrates with the Car Rental API:

Base URL: https://car-rental-api.goit.global

Available Endpoints

GET /cars - Get paginated car list with filtering
GET /cars/:id - Get specific car details
GET /brands - Get available car brands
POST /cars/:id/booking - Book a car

API Features

Backend-powered filtering and pagination
Real-time availability checking
Secure booking submissions
Comprehensive error handling

🎨 Design & UX
Design System

Typography: Manrope and Inter font families
Color Palette: Professional blue theme with accessible contrasts
Icons: Custom SVG icon system
Spacing: Consistent 8px grid system
Responsive Breakpoints

Mobile: 320px - 767px
Tablet: 768px - 1439px
Desktop: 1440px+

🔧 Development Scripts

bash
npm run dev # Start development server
npm run build # Build for production
npm run start # Start production server
npm run lint # Run ESLint

🛡️ Error Handling

React Error Boundary implementation
API error interception and user-friendly messages
Network failure handling
Form validation with detailed error messages

🚀 Deployment

The application is optimized for deployment on Vercel:

Connect your GitHub repository to Vercel
Configure environment variables if needed
Deploy automatically on git push
Environment Variables

env
NEXT_PUBLIC_API_URL=https://car-rental-api.goit.global

👨‍💻 Developer: Oleksandr Polishchuk

GitHub: [https://github.com/AleksPolishcuk]
