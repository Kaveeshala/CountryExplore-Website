import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import signup from "../assets/images/signup.png";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'; 

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);

    const apiUrl = 'https://countryname-backend.onrender.com/api/auth/register';

    try {
      const response = await axios.post(apiUrl, { name, email, password });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success('Account created successfully! Redirecting...');
      
      setTimeout(() => {
        navigate('/login'); 
      }, 1500);

    } catch (err) {
      console.error('Signup error:', err);
      const errorMsg = err.response?.data?.message || 'Signup failed. Please try again.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 mt-16 max-w-3xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* Left Image Section */}
        <div className="hidden md:block">
          <img 
            src={signup}
            alt="Sign up visual"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Form Section */}
        <div className="p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create an account</h2>

          <div className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="mt-1">
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 hover:border-gray-300 transition-all focus-within:border focus-within:outline-none">
                  <User size={18} className="text-gray-400 mr-2" />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full h-full py-2 text-sm focus:outline-none focus:ring-0 placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="mt-1">
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 hover:border-gray-300 transition-all focus-within:border-indigo-500 focus-within:ring-1">
                  <Mail size={18} className="text-gray-400 mr-2" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full h-full py-2 text-sm focus:outline-none focus:ring-0 placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1">
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 hover:border-gray-300 transition-all focus-within:border-indigo-500 focus-within:ring-1">
                  <Lock size={18} className="text-gray-400 mr-2" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-full py-2 text-sm focus:outline-none focus:ring-0 placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                onClick={handleSignup}
                className="w-full flex justify-center items-center py-3 px-4 bg-[#347928] text-white hover:bg-[#347928]/80 hover:text-white cursor-pointer transition"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
                <ArrowRight size={18} className="ml-2" />
              </button>
            </div>

            {/* Login Redirect */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-black rounded underline cursor-pointer">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
