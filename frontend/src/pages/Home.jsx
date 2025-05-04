import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Button } from 'antd';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RegionFilter from '../components/RegionFilter';
import CountryCard from '../components/CountryCard';
import mapCountry from '../assets/images/countryCard.jpg';

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [favoriteCountries, setFavoriteCountries] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    // Fetch all countries
    axios.get("https://restcountries.com/v3.1/all")
      .then(res => setCountries(res.data))
      .catch(err => console.error(err));

    // Fetch favorite countries from the backend
    const fetchFavorites = async () => {
      try {
        const res = await axios.get("https://countryname-backend.onrender.com/api/favorites", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setFavoriteCountries(res.data);
      } catch (err) {
        console.error("Error fetching favorites:", err);
      }
    };

    fetchFavorites();
  }, []);

  const filteredCountries = countries.filter((country) => {
    const matchesRegion = selectedRegion ? country.region === selectedRegion : true;
    const matchesSearch = country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
    const isFavorite = favoriteCountries.some(fav => fav.countryCode === country.cca2);
    return matchesRegion && matchesSearch && (!showFavorites || isFavorite);
  });

  return (
    <>
      <Header />
      <div className='min-h-screen bg-[#F8FBFF]'>

        {/* Hero Section */}
        <div className='relative w-full h-96 bg-cover bg-center' style={{ backgroundImage: `url(${mapCountry})` }}>
          <div className='absolute inset-0 bg-gradient-to-b from-green-900/60 to-green-800/70'></div>
          <div className='relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center items-center text-center'>
            <motion.h1
              className='text-4xl md:text-5xl font-bold text-white mt-16'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Explore Our World
            </motion.h1>
            <motion.p
              className='text-xl text-green-50 mt-4 max-w-3xl'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Embark on a journey across continents, uncovering the vibrant cultures, breathtaking landscapes, and hidden wonders that make every country unique. Whether you're a curious explorer or a passionate traveler, discover the stories that shape our world—one destination at a time.
            </motion.p>
          </div>
        </div>

        {/* Filters and Country Cards */}
        <div className='mx-auto max-w-7xl'>
          <div className='flex flex-wrap justify-between items-start gap-4 mt-16 px-4'>
            <RegionFilter selectedRegion={selectedRegion} onRegionChange={setSelectedRegion} />
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <Button 
              onClick={() => setShowFavorites(prev => !prev)} 
              className='bg-[#347928] text-white rounded hover:text-[#347928]/80 transition'
            >
              {showFavorites ? "Show All Countries" : "Show Favorite Countries"}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 px-4">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <CountryCard 
                  key={country.cca3} 
                  country={country} 
                  favoriteCountries={favoriteCountries}
                  setFavoriteCountries={setFavoriteCountries} 
                />
              ))
            ) : (
              <p className='col-span-full text-center text-gray-500'>
                No countries found.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
