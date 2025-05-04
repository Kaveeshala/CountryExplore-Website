import { useState } from 'react';
import Header from '../components/Header';
import mapCountry from '../assets/images/countryCard.jpg';
import { motion } from 'framer-motion';

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState('story');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-green-900/60 to-green-800/70">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${mapCountry})`,
            }}
          />
        </div>

        <div className="relative z-10 px-6 mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-10 transform hover:scale-110 transition-transform duration-300">
              {/* You can add an image or logo here if needed */}
            </div>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              About GlobalVita
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-emerald-100 max-w-2xl md:max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Your window to the world's nations and cultures
            </motion.p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto w-full">
              {[
                { value: '195+', label: 'Countries' },
                { value: '1000+', label: 'Data Points' },
                { value: '24/7', label: 'Accessibility' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/90 p-6 rounded-lg text-center transform hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
                    {item.value}
                  </div>
                  <div className="text-emerald-700 text-sm font-semibold mt-2">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center max-w-5xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-700 mb-6">
            One World. One Platform.
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 mb-12">
            GlobalVita was founded to make the world's cultures, facts, and stories beautifully accessible —
            empowering global understanding through data, design, and discovery.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
            {[
              {
                icon: '🔍',
                title: 'Accuracy & Reliability',
                text: 'Verified, current data from trusted global sources.',
              },
              {
                icon: '🌱',
                title: 'Accessibility for All',
                text: 'A platform for every learner, traveler, and dreamer.',
              },
              {
                icon: '🤝',
                title: 'Global Understanding',
                text: 'Fostering empathy by exploring diverse cultures.',
              },
              {
                icon: '⚡',
                title: 'Innovation',
                text: 'Interactive tools and visuals that make exploration fun.',
              },
            ].map(({ icon, title, text }, idx) => (
              <div
                key={idx}
                className="bg-emerald-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <span className="text-2xl sm:text-3xl mr-4">{icon}</span>
                  <h3 className="text-lg sm:text-xl font-bold text-emerald-700">{title}</h3>
                </div>
                <p className="text-gray-700 text-sm sm:text-base">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
