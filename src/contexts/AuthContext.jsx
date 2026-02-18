import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await authAPI.checkAuth();
      if (response.isAuthenticated && response.user) {
        setIsLoggedIn(true);
        setUser(response.user);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(response.user));
      } else {
        // Clear local storage if not authenticated
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      // If API fails, check localStorage as fallback
      const storedLoginStatus = localStorage.getItem('isLoggedIn');
      const storedUser = localStorage.getItem('user');
      
      if (storedLoginStatus === 'true' && storedUser) {
        setIsLoggedIn(true);
        setUser(JSON.parse(storedUser));
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password, userType = 'student') => {
    const response = await authAPI.login(email, password, userType);
    
    if (response.success && response.user) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(response.user));
      setIsLoggedIn(true);
      setUser(response.user);
      return response;
    }
    
    throw new Error(response.message || 'Login failed');
  };

  const signup = async (userData) => {
    const response = await authAPI.signup(userData);
    
    if (response.success && response.user) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(response.user));
      setIsLoggedIn(true);
      setUser(response.user);
      return response;
    }
    
    throw new Error(response.message || 'Signup failed');
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const updateUser = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      user, 
      loading,
      login, 
      signup,
      logout,
      updateUser,
      checkAuthStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
