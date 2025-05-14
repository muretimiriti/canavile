/**
 * Admin Login Component
 * 
 * This component handles the authentication process for admin users.
 * Features include:
 * - Email and password authentication
 * - Password reset functionality with override code
 * - Form validation
 * - Error handling and user feedback
 * - Secure authentication using Firebase
 */

import React, { useState } from "react";
import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

/**
 * Interface for form validation errors
 */
interface FormErrors {
  email?: string;
  password?: string;
  overrideCode?: string;
  newPassword?: string;
}

const AdminLogin = () => {
  // State management for form data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [overrideCode, setOverrideCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetMode, setResetMode] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  /**
   * Validates the login form
   * Checks for required fields and valid email format
   * @returns {boolean} True if form is valid, false otherwise
   */
  const validateLoginForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Validates the password reset form
   * Checks for required fields and password complexity
   * @returns {boolean} True if form is valid, false otherwise
   */
  const validateResetForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!overrideCode.trim()) {
      newErrors.overrideCode = 'Override code is required';
    }

    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
      newErrors.newPassword = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles the login process
   * Authenticates user with Firebase and redirects to admin dashboard
   * @param {React.FormEvent} e - The form event
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateLoginForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin/home");
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        email: 'Invalid email or password',
        password: 'Invalid email or password'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handles the password reset process
   * Verifies override code and updates password if valid
   * @param {React.FormEvent} e - The form event
   */
  const handleOverrideReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateResetForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const overrideRef = collection(db, "AdminSettings");
      const q = query(overrideRef, where("type", "==", "overrideCode"));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const overrideData = querySnapshot.docs[0].data();
        if (overrideData.code === overrideCode) {
          if (auth.currentUser) {
            await updatePassword(auth.currentUser, newPassword);
            alert("Password updated successfully!");
            setResetMode(false);
            setOverrideCode("");
            setNewPassword("");
          } else {
            setErrors({
              overrideCode: 'Admin not logged in. Please log in first.'
            });
          }
        } else {
          setErrors({
            overrideCode: 'Invalid override code'
          });
        }
      } else {
        setErrors({
          overrideCode: 'Override code not found'
        });
      }
    } catch (error) {
      console.error('Reset error:', error);
      setErrors({
        overrideCode: 'Failed to reset password. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Clears all form errors
   */
  const clearErrors = () => {
    setErrors({});
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      {!resetMode ? (
        // Login form
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearErrors();
              }}
              className={errors.email ? 'error' : ''}
              required
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearErrors();
              }}
              className={errors.password ? 'error' : ''}
              required
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
          <p onClick={() => {
            setResetMode(true);
            clearErrors();
          }}>Forgot Password?</p>
        </form>
      ) : (
        // Password reset form
        <form onSubmit={handleOverrideReset}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Override Code"
              value={overrideCode}
              onChange={(e) => {
                setOverrideCode(e.target.value);
                clearErrors();
              }}
              className={errors.overrideCode ? 'error' : ''}
              required
            />
            {errors.overrideCode && <span className="error-message">{errors.overrideCode}</span>}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                clearErrors();
              }}
              className={errors.newPassword ? 'error' : ''}
              required
            />
            {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Resetting...' : 'Reset Password'}
          </button>
          <p onClick={() => {
            setResetMode(false);
            clearErrors();
          }}>Back to Login</p>
        </form>
      )}
    </div>
  );
};

export default AdminLogin;