export interface ValidationErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface FormData {
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export const validateForm = (data: FormData, isSignup: boolean = false): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Username validation (only for signup)
  if (isSignup) {
    if (!data.username || data.username.trim() === '') {
      errors.username = 'Username is required';
    } else if (data.username.length < 3 || data.username.length > 15) {
      errors.username = 'Username must be between 3 and 15 characters long';
    } else if (/^[0-9_]/.test(data.username)) {
      errors.username = 'Username cannot start with a number or underscore';
    } else if (/^[0-9_]+$/.test(data.username)) {
      errors.username = 'Username cannot contain only numbers or underscores';
    }
  }

  // Email validation
  if (!data.email || data.email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Password validation
  if (!data.password || data.password.trim() === '') {
    errors.password = 'Password is required';
  } else if (data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long';
  } else if (!/(?=.*[a-zA-Z])/.test(data.password)) {
    errors.password = 'Password must contain at least 1 letter';
  } else if (!/(?=.*[0-9])/.test(data.password)) {
    errors.password = 'Password must contain at least 1 number';
  } else if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(data.password)) {
    errors.password = 'Password must contain at least 1 special character';
  }

  // Confirm password validation (only for signup)
  if (isSignup) {
    if (!data.confirmPassword || data.confirmPassword.trim() === '') {
      errors.confirmPassword = 'Please confirm your password';
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
  }

  return errors;
};

export const hasErrors = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length > 0;
};
