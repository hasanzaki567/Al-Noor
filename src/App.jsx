import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Courses from "./pages/Courses"
import PearlsOfJuzAmma from "./pages/PearlsOfJuzAmma"
import Scheduler from "./pages/Scheduler"
import Quran from "./pages/Quran"
import Dashboard from "./pages/Dashboard"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Profile from "./pages/Profile"
import CourseRegistration from "./pages/CourseRegistration"
import "./App.css"

function App() {
  return (
    <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/pearls-of-juz-amma" element={<PearlsOfJuzAmma />} />
        <Route path="/scheduler" element={<Scheduler />} />
        <Route path="/quran" element={<Quran />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<CourseRegistration />} />
      </Routes>
      <Footer />
    </Router>
    </AuthProvider>
  )
}

export default App

