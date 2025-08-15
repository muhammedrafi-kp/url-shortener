
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { Link2, User, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import type { CredentialResponse } from '@react-oauth/google';
import { validateForm } from '../validators/loginValidation';
import type { ValidationErrors, FormData, LoginFormData } from '../types/types';
import { loginUser, signupUser, googleAuthCallback } from "../api/authApi";
import { login } from "../redux/authSlice";
import toast from 'react-hot-toast';
import { AxiosError } from "axios";

const LoginPage = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const isLogin = mode === 'login';

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    // if (errors[field]) {
    //   setErrors(prev => ({ ...prev, [field]: undefined }));
    // }
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      console.log('Google login successful:', credentialResponse);
      const res = await googleAuthCallback(credentialResponse.credential!);
      console.log("response :", res);
      if (res.success) {
        toast.success(`${mode} successfull`);
        dispatch(login());
      }
    } catch (error:unknown) {
      const err = error as AxiosError<{ message: string }>;
      console.error('Google login error:', error);
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  const handleGoogleError = () => {
    console.error('Google login failed');
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm(formData, !isLogin);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {

        console.log('Form data:', formData);

        if (mode === "login") {
          // Convert FormData to LoginFormData for login
          const loginData: LoginFormData = {
            email: formData.email,
            password: formData.password
          };
          const res = await loginUser(loginData);
          console.log("response :", res);

          if (res.success) {
            toast.success("Login successfull");
            dispatch(login());
          }
        } else {

          const res = await signupUser(formData);
          console.log("response :", res);

          if (res.success) {
            toast.success("Signup successful");
            dispatch(login());
          }
        }

      } catch (error: any) {
        console.error('Form submission error:', error);
        console.error('Form submission error response:', error.response);

        toast.error(error?.response?.data?.message || "Something went wrong");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const switchMode = () => {
    setMode(isLogin ? 'signup' : 'login');
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50 flex items-center justify-center px-4 sm:px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Link2 className="w-8 h-8 text-indigo-600" />
            <span className="text-2xl font-bold text-indigo-900">ShortLink</span>
          </div>
          <h2 className="text-3xl font-bold text-indigo-900 mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-slate-600">{isLogin ? 'Sign in to your account to continue' : 'Join us to start shortening your URLs'}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden p-4 sm:p-8 transition-all duration-300 hover:shadow-xl">
          <div className="space-y-6">

            {/* Google OAuth Button */}
            <div className="space-y-4">


              <div className="flex justify-center google-oauth-wrapper">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap
                  theme="outline"
                  size="large"
                  text={isLogin ? "signin_with" : "signup_with"}
                  shape="rectangular"
                  width="100%"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-slate-500">Or </span>
                </div>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.name ? 'border-red-500' : 'border-slate-300'
                      }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-slate-300'
                    }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.password ? 'border-red-500' : 'border-slate-300'
                    }`}
                  placeholder={isLogin ? 'Enter your password' : 'Create a password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword || ''}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.confirmPassword ? 'border-red-500' : 'border-slate-300'
                      }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            )}



            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-3 bg-indigo-600 text-white rounded-lg transition-all duration-300 font-medium ${isSubmitting
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-indigo-700 active:scale-95 hover:shadow-lg'
                }`}
            >
              {isSubmitting
                ? 'Processing...'
                : (isLogin ? 'Sign In' : 'Create Account')
              }
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-slate-600">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={switchMode}
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => window.history.back()}
            className="text-slate-500 hover:text-slate-700"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
