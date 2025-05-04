import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import login2 from "../assets/images/login2.jpg";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://countryname-backend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || 'Invalid email or password');
        return;
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      toast.success('Login successful!');
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50">
      <ToastContainer />
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Column - Image */}
        <div className="hidden md:block">
          <img 
            src={login2} 
            alt="Login Illustration" 
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Column - Login Form */}
        <div className="p-6 sm:p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Welcome back</h2>
            <p className="text-gray-600 mt-2">Please sign in to your account</p>
          </div>
          
          <div className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 hover:border-gray-400 focus-within:border-black">
                <Mail size={18} className="text-gray-400 mr-2" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full text-sm focus:outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                <button className="text-sm text-black hover:underline">Forgot password?</button>
              </div>
              <div className="relative mt-1">
                <Lock size={18} className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="w-4 h-4 text-black border-gray-300 rounded" />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-700">Remember me</label>
            </div>

            {/* Sign In Button */}
            <button
              onClick={handleSubmit}
              className="w-full flex items-center justify-center py-2.5 bg-[#347928] text-white hover:bg-[#347928]/90 rounded-lg"
            >
              <span>Sign in</span>
              <ArrowRight size={18} className="ml-2" />
            </button>

            {/* Signup Link */}
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-black underline hover:text-black/80">
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
