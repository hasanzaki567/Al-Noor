# Al Noor Academy

## Overview

Al Noor Academy is a modern Islamic educational platform built with React and Vite. It provides comprehensive courses, live classes, and resources for Islamic learning with a focus on Quranic studies and Islamic knowledge.

## 🎯 Features

### Authentication & Authorization
- **User Authentication**: Secure login and signup system
- **Role-based Access**: Support for students and teachers
- **Protected Routes**: Dashboard and educational content accessible only to logged-in users
- **Session Management**: Persistent user sessions with localStorage
- **Auth Context**: Global authentication state management

### User Interface
- **Responsive Design**: Fully responsive design for mobile, tablet, and desktop
- **Beautiful UI**: Islamic-themed color scheme (deep green #0F7D5E with gold accents #D4AF37)
- **High Contrast**: Accessible text with excellent readability
- **Modern Components**: Glassmorphic buttons and cards with smooth animations

### Navigation
- **Navbar**: Public navigation bar (hidden for logged-in users)
- **Sidebar Menu**: Hamburger menu with navigation for logged-in users
  - Dashboard
  - Profile
  - Courses
  - Scheduler
  - Quran
  - Contact
  - About
  - Logout option

### Pages & Features
- **Home Page**: Landing page with features showcase and hero section
  - Login and signup buttons integrated into hero
  - Redirects logged-in users to dashboard
  - Features section showcasing Al Noor Academy benefits
  - Trust badges with animated counters
  - Testimonials section
  - FAQ section

- **Authentication Pages**:
  - Login page with student/teacher toggle
  - Signup page with user type selection
  - Form validation and error handling

- **Dashboard**: Central hub for logged-in users
- **Profile**: User profile management
- **Courses**: Course listing and enrollment
- **Scheduler**: Class schedule and calendar
- **Quran**: Quranic studies section
- **Contact**: Contact form and support
- **About**: Information about Al Noor Academy
- **Privacy Policy**: Comprehensive privacy information
- **Terms of Service**: Complete terms and conditions

### Styling & Design
- **CSS Variables**: Centralized design system with 100+ CSS variables
- **Color System**: Islamic-themed colors with excellent contrast ratios
  - Primary: Deep Islamic Green (#0F7D5E)
  - Accent: Islamic Gold (#D4AF37)
  - Backgrounds: Clean White (#FFFFFF)
  - Text: Very Dark Gray (#1F2937)
- **Typography**: Scalable font sizes and weights
- **Responsive**: Mobile-first approach with responsive grids and layouts
- **Animations**: Smooth transitions and scroll animations

### Footer
- **Dynamic Footer**: Hides for logged-in users
- **Links**: Quick links, resources, support, and newsletter signup
- **Social Media**: Social media icons
- **Legal Links**: Privacy Policy and Terms of Service links

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
The app will be available at `http://localhost:5173/`

### Build
```bash
npm run build
```

### Preview
```bash
npm preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx & Navbar.css
│   ├── Sidebar.jsx & Sidebar.css
│   ├── Footer.jsx & Footer.css
│   └── ProtectedRoute.jsx
├── pages/
│   ├── Home.jsx & Home.css
│   ├── Login.jsx & Auth.css
│   ├── Signup.jsx & Auth.css
│   ├── Dashboard.jsx
│   ├── Profile.jsx
│   ├── Courses.jsx
│   ├── Scheduler.jsx
│   ├── Quran.jsx
│   ├── Contact.jsx & Contact.css
│   ├── About.jsx
│   ├── PrivacyPolicy.jsx
│   ├── TermsOfService.jsx
│   └── Pages.css
├── contexts/
│   └── AuthContext.jsx
├── services/
│   ├── api.js
│   └── validation.js
├── styles/
│   └── variables.css
├── App.jsx & App.css
└── main.jsx
```

## 🔐 Authentication Flow

1. **Non-logged Users**:
   - See home page with hero slider
   - Access login/signup pages
   - Can view About and Contact pages
   - Can access Privacy Policy and Terms of Service

2. **Logged-in Users**:
   - Redirected to dashboard
   - Access full suite of courses and educational features
   - Can view profile and manage settings
   - Sidebar navigation for all features
   - No footer displayed

## 🎨 Design System

### Colors
- Primary Green: `#0F7D5E`
- Primary Hover: `#0D6B4F`
- Primary Light: `#E8F5F1`
- Accent Gold: `#D4AF37`
- Danger Red: `#DC2626`
- Success Green: `#10B981`
- Text Main: `#1F2937`
- Text Secondary: `#6B7280`
- Background: `#FFFFFF`

### Spacing
- xs: 0.25rem
- sm: 0.5rem
- md: 1rem
- lg: 1.5rem
- xl: 2rem
- 2xl: 3rem

### Border Radius
- sm: 0.375rem
- md: 0.5rem
- lg: 0.75rem
- xl: 1rem
- 2xl: 1.5rem

## 📦 Dependencies

- React 19.2.0
- React DOM 19.2.0
- React Router DOM 7.12.0
- Vite 7.2.4
- Font Awesome 6.4.0 (via CDN)

## 🔄 State Management

- **React Context API**: AuthContext for global authentication state
- **localStorage**: Persistent user data storage

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

This project is licensed under the MIT License.

## 👥 Contributing

For contributions and improvements, please reach out to the development team.
