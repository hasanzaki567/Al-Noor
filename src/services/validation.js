// Validation utility functions for Al Noor Academy forms

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password strength patterns
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_STRONG_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Name validation
const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 50;

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {object} - { isValid: boolean, error: string | null }
 */
export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return { isValid: false, error: 'Email is required' };
  }
  
  const trimmedEmail = email.trim();
  
  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validate password
 * @param {string} password - Password to validate
 * @param {object} options - { minLength, requireStrong }
 * @returns {object} - { isValid: boolean, error: string | null, strength: string }
 */
export const validatePassword = (password, options = {}) => {
  const { minLength = PASSWORD_MIN_LENGTH, requireStrong = false } = options;
  
  if (!password) {
    return { isValid: false, error: 'Password is required', strength: 'none' };
  }
  
  if (password.length < minLength) {
    return { 
      isValid: false, 
      error: `Password must be at least ${minLength} characters`, 
      strength: 'weak' 
    };
  }
  
  // Calculate password strength
  let strength = 'weak';
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[@$!%*?&]/.test(password);
  
  const strengthScore = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
  
  if (strengthScore >= 4 && password.length >= 8) {
    strength = 'strong';
  } else if (strengthScore >= 2 && password.length >= 6) {
    strength = 'medium';
  }
  
  if (requireStrong && !PASSWORD_STRONG_REGEX.test(password)) {
    return { 
      isValid: false, 
      error: 'Password must contain uppercase, lowercase, number, and special character',
      strength 
    };
  }
  
  return { isValid: true, error: null, strength };
};

/**
 * Validate password confirmation
 * @param {string} password - Original password
 * @param {string} confirmPassword - Confirmation password
 * @returns {object} - { isValid: boolean, error: string | null }
 */
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return { isValid: false, error: 'Please confirm your password' };
  }
  
  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validate name field
 * @param {string} name - Name to validate
 * @param {string} fieldName - Field label for error messages
 * @returns {object} - { isValid: boolean, error: string | null }
 */
export const validateName = (name, fieldName = 'Name') => {
  if (!name || name.trim() === '') {
    return { isValid: false, error: `${fieldName} is required` };
  }
  
  const trimmedName = name.trim();
  
  if (trimmedName.length < NAME_MIN_LENGTH) {
    return { isValid: false, error: `${fieldName} must be at least ${NAME_MIN_LENGTH} characters` };
  }
  
  if (trimmedName.length > NAME_MAX_LENGTH) {
    return { isValid: false, error: `${fieldName} must be less than ${NAME_MAX_LENGTH} characters` };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validate required text field
 * @param {string} value - Value to validate
 * @param {string} fieldName - Field label for error messages
 * @param {object} options - { minLength, maxLength }
 * @returns {object} - { isValid: boolean, error: string | null }
 */
export const validateRequired = (value, fieldName = 'This field', options = {}) => {
  const { minLength = 1, maxLength = 500 } = options;
  
  if (!value || value.trim() === '') {
    return { isValid: false, error: `${fieldName} is required` };
  }
  
  const trimmedValue = value.trim();
  
  if (trimmedValue.length < minLength) {
    return { isValid: false, error: `${fieldName} must be at least ${minLength} characters` };
  }
  
  if (trimmedValue.length > maxLength) {
    return { isValid: false, error: `${fieldName} must be less than ${maxLength} characters` };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validate message/textarea field
 * @param {string} message - Message to validate
 * @param {object} options - { minLength, maxLength }
 * @returns {object} - { isValid: boolean, error: string | null }
 */
export const validateMessage = (message, options = {}) => {
  const { minLength = 10, maxLength = 2000 } = options;
  
  if (!message || message.trim() === '') {
    return { isValid: false, error: 'Message is required' };
  }
  
  const trimmedMessage = message.trim();
  
  if (trimmedMessage.length < minLength) {
    return { isValid: false, error: `Message must be at least ${minLength} characters` };
  }
  
  if (trimmedMessage.length > maxLength) {
    return { isValid: false, error: `Message must be less than ${maxLength} characters` };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validate login form
 * @param {object} data - { email, password }
 * @returns {object} - { isValid: boolean, errors: object }
 */
export const validateLoginForm = (data) => {
  const errors = {};
  
  const emailResult = validateEmail(data.email);
  if (!emailResult.isValid) {
    errors.email = emailResult.error;
  }
  
  if (!data.password) {
    errors.password = 'Password is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate signup form
 * @param {object} data - { name, email, password, confirmPassword, userType, specialization }
 * @returns {object} - { isValid: boolean, errors: object }
 */
export const validateSignupForm = (data) => {
  const errors = {};
  
  // Name validation
  const nameResult = validateName(data.name, 'Full name');
  if (!nameResult.isValid) {
    errors.name = nameResult.error;
  }
  
  // Email validation
  const emailResult = validateEmail(data.email);
  if (!emailResult.isValid) {
    errors.email = emailResult.error;
  }
  
  // Password validation
  const passwordResult = validatePassword(data.password);
  if (!passwordResult.isValid) {
    errors.password = passwordResult.error;
  }
  
  // Confirm password validation
  const confirmResult = validateConfirmPassword(data.password, data.confirmPassword);
  if (!confirmResult.isValid) {
    errors.confirmPassword = confirmResult.error;
  }
  
  // Teacher specialization validation
  if (data.userType === 'teacher' && (!data.specialization || data.specialization.trim() === '')) {
    errors.specialization = 'Specialization is required for teachers';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate contact form
 * @param {object} data - { name, email, subject, message }
 * @returns {object} - { isValid: boolean, errors: object }
 */
export const validateContactForm = (data) => {
  const errors = {};
  
  // Name validation
  const nameResult = validateName(data.name);
  if (!nameResult.isValid) {
    errors.name = nameResult.error;
  }
  
  // Email validation
  const emailResult = validateEmail(data.email);
  if (!emailResult.isValid) {
    errors.email = emailResult.error;
  }
  
  // Subject validation
  const subjectResult = validateRequired(data.subject, 'Subject', { minLength: 3, maxLength: 100 });
  if (!subjectResult.isValid) {
    errors.subject = subjectResult.error;
  }
  
  // Message validation
  const messageResult = validateMessage(data.message);
  if (!messageResult.isValid) {
    errors.message = messageResult.error;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate profile update form
 * @param {object} data - { name, email, specialization, institution, country }
 * @param {string} userType - 'student' or 'teacher'
 * @returns {object} - { isValid: boolean, errors: object }
 */
export const validateProfileForm = (data, userType = 'student') => {
  const errors = {};
  
  // Name validation
  const nameResult = validateName(data.name, 'Full name');
  if (!nameResult.isValid) {
    errors.name = nameResult.error;
  }
  
  // Email validation
  const emailResult = validateEmail(data.email);
  if (!emailResult.isValid) {
    errors.email = emailResult.error;
  }
  
  // Teacher specialization validation
  if (userType === 'teacher' && (!data.specialization || data.specialization.trim() === '')) {
    errors.specialization = 'Specialization is required for teachers';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Get password strength indicator
 * @param {string} password - Password to check
 * @returns {object} - { strength: string, color: string, percentage: number }
 */
export const getPasswordStrength = (password) => {
  if (!password) {
    return { strength: 'none', color: '#e0e0e0', percentage: 0 };
  }
  
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[@$!%*?&#^()_+=\-[\]{}|;:'"<>,.?/~`]/.test(password);
  const isLong = password.length >= 8;
  
  const score = [hasLower, hasUpper, hasNumber, hasSpecial, isLong].filter(Boolean).length;
  
  if (score <= 1) {
    return { strength: 'Weak', color: '#ef4444', percentage: 20 };
  } else if (score === 2) {
    return { strength: 'Fair', color: '#f97316', percentage: 40 };
  } else if (score === 3) {
    return { strength: 'Good', color: '#eab308', percentage: 60 };
  } else if (score === 4) {
    return { strength: 'Strong', color: '#22c55e', percentage: 80 };
  } else {
    return { strength: 'Very Strong', color: '#10b981', percentage: 100 };
  }
};

export default {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateName,
  validateRequired,
  validateMessage,
  validateLoginForm,
  validateSignupForm,
  validateContactForm,
  validateProfileForm,
  getPasswordStrength
};
