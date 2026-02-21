import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from "./layouts/MainLayout"
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
import CourseRegistration from "./pages/CourseRegistration"
import TeacherPortal from "./pages/teacher/TeacherPortal"
import TPDashboard from "./pages/teacher/TPDashboard"
import TPStudents from "./pages/teacher/TPStudents"
import TPAttendance from "./pages/teacher/TPAttendance"
import TPReports from "./pages/teacher/TPReports"
import TPSchedule from "./pages/teacher/TPSchedule"
import "./App.css"

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        {/* Teacher Portal - separate layout (no Navbar/Footer) */}
        <Route path="/teacher-portal" element={<TeacherPortal />}>
          <Route index element={<TPDashboard />} />
          <Route path="students" element={<TPStudents />} />
          <Route path="attendance" element={<TPAttendance />} />
          <Route path="reports" element={<TPReports />} />
          <Route path="schedule" element={<TPSchedule />} />
        </Route>

        {/* Regular pages with Navbar/Footer */}
        <Route element={<MainLayout />}>
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
          {/* Profile page removed; profile access available from Dashboard */}
          <Route path="/register" element={<CourseRegistration />} />
        </Route>
      </Routes>
    </Router>
    </AuthProvider>
  )
}

export default App

