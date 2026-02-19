// API Service for Al Noor Academy
// Handles all API calls to the backend server

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  
  return data;
};

// API request helper with credentials
const apiRequest = async (endpoint, options = {}) => {
  const config = {
    ...options,
    credentials: 'include', // Important for session cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    return await handleResponse(response);
  } catch (error) {
    // Handle network errors (server not running, connection refused, etc.)
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw new Error('Cannot connect to server. Please make sure the server is running.');
    }
    throw error;
  }
};

// Auth API
export const authAPI = {
  // Login user
  login: async (email, password, userType = 'student') => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, userType }),
    });
  },

  // Signup user
  signup: async (userData) => {
    return apiRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Logout user
  logout: async () => {
    return apiRequest('/auth/logout', {
      method: 'POST',
    });
  },

  // Get current user
  getCurrentUser: async () => {
    return apiRequest('/auth/me');
  },

  // Check authentication status
  checkAuth: async () => {
    return apiRequest('/auth/check');
  },

  // Update profile
  updateProfile: async (profileData) => {
    return apiRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    return apiRequest('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },
};

// Health check
export const healthCheck = async () => {
  return apiRequest('/health');
};

// Course API
export const courseAPI = {
  // Get all courses
  getAllCourses: async () => {
    return apiRequest('/courses');
  },

  // Get single course
  getCourse: async (courseId) => {
    return apiRequest(`/courses/${courseId}`);
  },

  // Register for a course
  register: async (registrationData) => {
    return apiRequest('/courses/register', {
      method: 'POST',
      body: JSON.stringify(registrationData),
    });
  },

  // Get my registrations (requires login)
  getMyRegistrations: async () => {
    return apiRequest('/courses/registrations/my');
  },

  // Get registrations by email
  getRegistrationsByEmail: async (email) => {
    return apiRequest(`/courses/registrations/email/${email}`);
  },
};

// Teacher API
export const teacherAPI = {
  // Dashboard
  getDashboard: async () => {
    return apiRequest('/teacher/dashboard');
  },

  // Students
  getStudents: async () => {
    return apiRequest('/teacher/students');
  },

  addStudent: async (studentData) => {
    return apiRequest('/teacher/students', {
      method: 'POST',
      body: JSON.stringify(studentData),
    });
  },

  updateStudent: async (id, studentData) => {
    return apiRequest(`/teacher/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(studentData),
    });
  },

  deleteStudent: async (id) => {
    return apiRequest(`/teacher/students/${id}`, {
      method: 'DELETE',
    });
  },

  // Attendance
  getAttendance: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/teacher/attendance${query ? '?' + query : ''}`);
  },

  markAttendance: async (attendanceData) => {
    return apiRequest('/teacher/attendance', {
      method: 'POST',
      body: JSON.stringify(attendanceData),
    });
  },

  markBulkAttendance: async (date, records) => {
    return apiRequest('/teacher/attendance/bulk', {
      method: 'POST',
      body: JSON.stringify({ date, records }),
    });
  },

  // Reports
  getReports: async (month, year) => {
    const params = new URLSearchParams();
    if (month !== undefined) params.append('month', month);
    if (year !== undefined) params.append('year', year);
    return apiRequest(`/teacher/reports?${params.toString()}`);
  },

  // Schedule
  getSchedule: async (day) => {
    const query = day ? `?day=${day}` : '';
    return apiRequest(`/teacher/schedule${query}`);
  },

  addSchedule: async (scheduleData) => {
    return apiRequest('/teacher/schedule', {
      method: 'POST',
      body: JSON.stringify(scheduleData),
    });
  },

  updateSchedule: async (id, scheduleData) => {
    return apiRequest(`/teacher/schedule/${id}`, {
      method: 'PUT',
      body: JSON.stringify(scheduleData),
    });
  },

  deleteSchedule: async (id) => {
    return apiRequest(`/teacher/schedule/${id}`, {
      method: 'DELETE',
    });
  },

  // Registrations
  getRegistrations: async () => {
    return apiRequest('/teacher/registrations');
  },

  importRegistration: async (registrationId) => {
    return apiRequest(`/teacher/import-registration/${registrationId}`, {
      method: 'POST',
    });
  },
};

export default {
  auth: authAPI,
  courses: courseAPI,
  teacher: teacherAPI,
  healthCheck,
};
