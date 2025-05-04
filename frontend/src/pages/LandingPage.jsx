import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, MapPin, Languages, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import landscape2 from '../assets/images/landscape2.jpg';

export default function LandingPage() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={landscape2}
          alt="Background"
          className="w-full h-full object-cover scale-105"
        />
      </div>

      {/* Main content */}
      <main
        className={`relative z-10 flex flex-col items-center md:items-start justify-center h-full px-4 md:px-16 transition-opacity duration-1000 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="text-center md:text-left max-w-4xl">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-black leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Discover the World <br />
            <span className="text-green-600">One Country at a Time</span>
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-black mb-8 max-w-2xl mx-auto md:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Your comprehensive guide to exploring global cultures, landmarks, and experiences from anywhere in the world.
          </motion.p>

          <div className="flex justify-center md:justify-start">
            <button
              onClick={() => navigate('/home')}
              className="group relative mt-2 px-6 sm:px-8 py-3 sm:py-4 bg-black text-white hover:text-white rounded-lg font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center justify-center cursor-pointer">
                Get Started
                <ChevronRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={20} />
              </span>
            </button>
          </div>
        </div>
      </main>

      {/* Feature Highlights */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/30 backdrop-blur-sm py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-green-700/30">
          {[
            {
              title: "200+ Countries",
              desc: "Comprehensive profiles and statistics",
              icon: <MapPin className="text-green-400" size={24} />
            },
            {
              title: "Cultural Insights",
              desc: "Languages, traditions and customs",
              icon: <Languages className="text-green-400" size={24} />
            },
            {
              title: "Visual Exploration",
              desc: "High-quality imagery of landmarks",
              icon: <Camera className="text-green-400" size={24} />
            }
          ].map((feature, index) => (
            <div key={index} className="flex items-start space-x-4 py-4 px-2 md:px-6">
              <div className="mt-1">{feature.icon}</div>
              <div>
                <h3 className="font-semibold text-lg text-green-300 mb-1">{feature.title}</h3>
                <p className="text-green-100 opacity-80 text-sm sm:text-base">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
