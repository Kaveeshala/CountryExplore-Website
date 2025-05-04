import { useState } from 'react';
import { Globe, Mail, Facebook, Twitter, Instagram, MapPin, Home, Map, Users, MessageCircle } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };
  
  return (
    <footer className="bg-gradient-to-r from-teal-900/90 to-emerald-800/90 text-white relative overflow-hidden mt-8">
      {/* Background geometric elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 -translate-y-1/2 translate-x-1/3 bg-cyan-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 translate-y-1/3 -translate-x-1/4 bg-emerald-200 rounded-full blur-3xl"></div>
      </div>

      {/* Diagonal divider */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full relative">
          <div className="absolute h-full w-3 bg-white rotate-12 left-1/2 transform -translate-x-1/2"></div>
          <div className="absolute h-full w-1 bg-white rotate-45 left-1/3 transform -translate-x-1/2"></div>
          <div className="absolute h-full w-1 bg-white -rotate-30 left-2/3 transform -translate-x-1/2"></div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="px-6 py-12 md:py-16">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            {/* LEFT SIDE - Navigation */}
            <div className="w-full md:w-2/5 space-y-8">
              {/* Logo */}
              <div className="flex items-center gap-3 mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-sm"></div>
                  <div className="relative bg-gradient-to-br from-teal-600 to-emerald-500 p-2 rounded-full">
                    <Globe className="text-white" size={24} />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white/90">GlobalVite</h2>
              </div>
              
              {/* Navigation Links */}
              <div className="space-y-2">
                <h3 className="text-sm uppercase tracking-wider text-teal-200 font-semibold mb-4">Explore Our World</h3>
                <nav>
                  <ul className="space-y-1">
                    {[
                      { name: 'Home', icon: <Home size={18} /> },
                      { name: 'Countries', icon: <Map size={18} /> },
                      { name: 'About Us', icon: <Users size={18} /> },
                      { name: 'Contact Us', icon: <MessageCircle size={18} /> }
                    ].map((item, index) => (
                      <li key={item.name}>
                        <a 
                          href="#" 
                          className="group flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-white/10 transition-all duration-300"
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gradient-to-br from-teal-600/50 to-emerald-500/50 group-hover:from-teal-500/90 group-hover:to-emerald-400/90 transition-colors duration-300">
                            {item.icon}
                          </div>
                          <span className="text-teal-50 group-hover:text-white transition-colors duration-300">{item.name}</span>
                          <div className="ml-auto w-0 group-hover:w-6 h-0.5 bg-teal-300/80 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
            
            {/* RIGHT SIDE - Newsletter & Connect */}
            <div className="w-full md:w-3/5">
              <div className="h-full flex flex-col justify-between space-y-8">
                {/* Newsletter Section */}
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-teal-200 font-semibold mb-4">Join Our Journey</h3>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5">
                    <p className="text-teal-50/90 text-sm mb-4">Get travel insights and destination recommendations delivered to your inbox.</p>
                    <div className="flex flex-col space-y-2">
                      <div className="flex overflow-hidden rounded-lg border border-teal-300/30 bg-white/10 backdrop-blur-sm">
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your email address" 
                          className="px-4 py-3 bg-transparent flex-1 text-white placeholder-white/50 focus:outline-none"
                        />
                        <button 
                          onClick={handleSubmit}
                          className="bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300 px-5 text-white font-medium transition-colors duration-300"
                        >
                          Subscribe
                        </button>
                      </div>
                      {subscribed && (
                        <p className="text-xs text-teal-200 bg-teal-900/50 p-2 rounded-md">
                          Thanks for subscribing! We'll be in touch soon.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Social Links Section */}
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-teal-200 font-semibold mb-4">Connect With Us</h3>
                  <div className="flex gap-3">
                    {[
                      { icon: <Facebook size={18} />, label: 'Facebook' },
                      { icon: <Twitter size={18} />, label: 'Twitter' },
                      { icon: <Instagram size={18} />, label: 'Instagram' },
                      { icon: <Mail size={18} />, label: 'Email' }
                    ].map((social, index) => (
                      <a 
                        key={index}
                        href="#" 
                        className="group relative"
                        aria-label={social.label}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-emerald-300 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
                        <div className="relative w-10 h-10 flex items-center justify-center bg-white/10 border border-white/20 rounded-lg group-hover:border-white/40 transition-all duration-300 backdrop-blur-sm">
                          {social.icon}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer Bottom */}
          <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-teal-100/70">© {new Date().getFullYear()} GlobalVite. All rights reserved.</p>
            <div className="flex items-center mt-3 md:mt-0">
              <MapPin size={14} className="text-teal-300 mr-1" />
              <span className="text-xs text-teal-100/70">Explore with us from anywhere in the world</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}