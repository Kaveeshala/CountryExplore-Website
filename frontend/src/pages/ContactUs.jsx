import { useState } from 'react';
import Header from '../components/Header';
import mapCountry from '../assets/images/countryCard.jpg'
import { motion } from 'framer-motion';


export default function ContactUs() {
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    message: '',
    error: false
  });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        message: 'Thank you for your message! We\'ll get back to you soon.',
        error: false
      });
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-30 bg-gradient-to-b from-green-900/60 to-green-800/70">
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
            

          <motion.h1
  className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4"
  initial={{ opacity: 0, y: -40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  Connect With GlobalVita
</motion.h1>

<motion.p
  className="text-lg sm:text-xl text-emerald-100 max-w-2xl md:max-w-3xl"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.3 }}
>
  We're here to listen, answer, and collaborate with global citizens like you
</motion.p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-emerald-700 mb-6">
                Send Us a Message
              </h2>
              
              {formStatus.submitted ? (
                <div className={`p-4 rounded-lg ${formStatus.error ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'} mb-6 fade-in`}>
                  {formStatus.message}
                </div>
              ) : null}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border focus:ring-0 focus:outline-none hover:border-gray-300 transition-all"
                    placeholder="Jane Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border focus:ring-0 focus:outline-none hover:border-gray-300 transition-all"
                    placeholder="jane@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border focus:ring-0 focus:outline-none hover:border-gray-300 transition-all"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Data Correction">Data Correction</option>
                    <option value="Partnership Opportunity">Partnership Opportunity</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border focus:ring-0 focus:outline-none hover:border-gray-300 transition-all resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="w-full bg-[#347928] text-white hover:bg-[#347928]/80 hover:text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="lg:mt-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                {[
                  {
                    icon: '📱',
                    title: 'Call Us',
                    details: [
                      '+1 (555) 123-4567',
                      'Mon-Fri: 9AM - 5PM EST'
                    ]
                  },
                  {
                    icon: '📧',
                    title: 'Email Us',
                    details: [
                      'info@globalvita.com',
                      'support@globalvita.com'
                    ]
                  },
                  {
                    icon: '🏢',
                    title: 'Visit Us',
                    details: [
                      '123 Global Plaza',
                      'New York, NY 10001'
                    ]
                  },
                  {
                    icon: '🌐',
                    title: 'Social Media',
                    details: [
                      '@globalvita',
                      'fb.com/globalvita'
                    ]
                  }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-emerald-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow hover:bg-emerald-100 cursor-pointer"
                  >
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-4">{item.icon}</span>
                      <h3 className="text-xl font-bold text-emerald-700">{item.title}</h3>
                    </div>
                    <div className="text-gray-700">
                      {item.details.map((detail, i) => (
                        <p key={i} className="mb-1">{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* FAQ Section */}
              <div className="bg-emerald-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-emerald-700 mb-6">Frequently Asked Questions</h3>
                
                <div className="space-y-4">
                  {[
                    {
                      q: 'How do I report data that needs updating?',
                      a: 'Use our contact form with the subject "Data Correction" and provide specific details about what needs to be updated.'
                    },
                    {
                      q: 'Are you open to partnerships?',
                      a: 'Absolutely! We love collaborating with organizations that share our mission of global education.'
                    },
                    {
                      q: 'How quickly can I expect a response?',
                      a: 'We typically respond within 1-2 business days to all inquiries.'
                    }
                  ].map((faq, idx) => (
                    <div key={idx} className="border-b border-emerald-200 pb-4">
                      <h4 className="font-bold text-emerald-800 mb-2">{faq.q}</h4>
                      <p className="text-gray-700">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-emerald-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Find Us Around The World</h2>
          
          <div className="relative bg-emerald-800 rounded-xl p-4 max-w-4xl mx-auto overflow-hidden shadow-xl">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-repeat bg-center"
                style={{
                  backgroundImage: `url('data:image/svg+xml,%3Csvg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="1" fill-rule="evenodd"%3E%3Ccircle cx="10" cy="10" r="2"/%3E%3Ccircle cx="22" cy="10" r="2"/%3E%3Ccircle cx="34" cy="10" r="2"/%3E%3Ccircle cx="10" cy="22" r="2"/%3E%3Ccircle cx="22" cy="22" r="2"/%3E%3Ccircle cx="34" cy="22" r="2"/%3E%3Ccircle cx="10" cy="34" r="2"/%3E%3Ccircle cx="22" cy="34" r="2"/%3E%3Ccircle cx="34" cy="34" r="2"/%3E%3C/g%3E%3C/svg%3E')`
                }}
              />
            </div>
            
            <div className="relative z-10 py-8">
              <div className="flex flex-wrap justify-center gap-12">
                {['New York', 'London', 'Tokyo', 'Sydney'].map((location, idx) => (
                  <div key={idx} className="text-center group">
                    <div className="w-16 h-16 bg-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-white group-hover:text-emerald-700 transition-all duration-300">
                      <span className="text-2xl">📍</span>
                    </div>
                    <p className="font-medium">{location}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-emerald-100 text-sm">
                <p>Our team is distributed across multiple time zones to serve you better.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Sign Up */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-emerald-700 mb-4">Stay Connected</h2>
          <p className="text-gray-700 mb-8">
            Subscribe to our newsletter for global insights, updates, and exclusive content
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg sm:rounded-r-none border border-gray-300 focus:border focus:ring-0 focus:outline-none hover:border-gray-300 transition-all"
            />
            <button className="bg-[#347928] text-white hover:bg-[#347928]/80 hover:text-white px-6 py-3 rounded-lg sm:rounded-l-none font-bold hover:shadow-lg transition-shadow">
              Subscribe
            </button>
          </div>
          
          <p className="text-gray-500 text-sm mt-4">
            We respect your privacy and will never share your information.
          </p>
        </div>
      </section>

      
    </div>
  );
}