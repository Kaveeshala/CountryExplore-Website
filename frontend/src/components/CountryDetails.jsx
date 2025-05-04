import { useEffect, useState } from "react";
import { Globe, Users, Map, Building, Book, ArrowLeft } from "lucide-react";
import MapCard from "../components/MapCard";
import CortofArmsCard from "../components/CortofArmsCard";
import { useNavigate } from "react-router-dom";

export default function CountryDetails({ countryCode, onBack }) {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!countryCode) return;

    setLoading(true);
    fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
      .then(response => {
        if (!response.ok) throw new Error("Failed to fetch country data");
        return response.json();
      })
      .then(data => {
        setCountry(data[0]);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching country:", err);
        setError("Failed to load country details");
        setLoading(false);
      });
  }, [countryCode]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-[#F8FBFF] rounded-lg shadow">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#347928]"></div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="p-6 bg-[#F8FBFF] rounded-lg shadow text-center">
        <p className="text-red-500 font-medium">{error || "Country not found"}</p>
        <button 
          onClick={onBack} 
          className="mt-4 px-6 py-2 bg-[#347928] text-white rounded-md flex items-center justify-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
        </button>
      </div>
    );
  }

  const currencies = country.currencies 
    ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol || ''})`).join(", ")
    : "N/A";

  const languages = country.languages 
    ? Object.values(country.languages).join(", ")
    : "N/A";

  const [latitude, longitude] = country.latlng || [0, 0];

  return (
    <div className="mt-[100px] px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 text-black rounded-md flex items-center cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
      </button>

      <div className="bg-[#F8FBFF] rounded-lg shadow-lg overflow-hidden">
        {/* Flag + Header */}
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 flex items-center justify-center p-4 md:p-6">
            {(country.flags?.svg || country.flags?.png) && (
              <img 
                src={country.flags?.svg || country.flags?.png} 
                alt={`Flag of ${country.name.common}`} 
                className="max-h-32 sm:max-h-48 md:max-h-64 object-contain rounded shadow-md w-full sm:w-auto"
              />
            )}
          </div>

          <div className="w-full md:w-2/3 p-4 md:p-6 flex flex-col justify-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              {country.name.common}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 italic mb-4">{country.name.official}</p>

            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {country.region}
              </span>
              {country.subregion && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {country.subregion}
                </span>
              )}
              {country.capital?.[0] && (
                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium flex items-center">
                  <Building className="w-3 h-3 mr-1" /> {country.capital[0]}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Country Details */}
        <div className="p-4 sm:p-6">
          {/* Main Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Geographic Info */}
              <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg flex items-center text-[#347928] mb-2">
                  <Globe className="mr-2 w-5 h-5" /> Geographic Information
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-gray-500">Region</p>
                    <p className="font-medium">{country.region || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Subregion</p>
                    <p className="font-medium">{country.subregion || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Capital</p>
                    <p className="font-medium">{country.capital?.[0] || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Area</p>
                    <p className="font-medium">{country.area ? `${country.area.toLocaleString()} km²` : "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Latitude</p>
                    <p className="font-medium">{latitude.toFixed(2)}°</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Longitude</p>
                    <p className="font-medium">{longitude.toFixed(2)}°</p>
                  </div>
                </div>
              </div>

              {/* Demographics */}
              <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg flex items-center text-[#347928] mb-2">
                  <Users className="mr-2 w-5 h-5" /> Demographics
                </h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500">Population</p>
                    <p className="font-medium">{country.population.toLocaleString()} people</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Languages</p>
                    <p className="font-medium">{languages}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Administration */}
              <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg flex items-center text-[#347928] mb-2">
                  <Building className="mr-2 w-5 h-5" /> Administration
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-gray-500">Currency</p>
                    <p className="font-medium">{currencies}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Driving Side</p>
                    <p className="font-medium capitalize">{country.car?.side || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time Zones</p>
                    <p className="font-medium">{country.timezones?.[0] || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Calling Code</p>
                    <p className="font-medium">
                      {country.idd?.root && country.idd?.suffixes?.[0] 
                        ? `${country.idd.root}${country.idd.suffixes[0]}` 
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Identity */}
              <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg flex items-center text-[#347928] mb-2">
                  <Book className="mr-2 w-5 h-5" /> Identity
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-gray-500">Domain</p>
                    <p className="font-medium">{country.tld?.[0] || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">UN Member</p>
                    <p className="font-medium">{country.unMember ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Independent</p>
                    <p className="font-medium">{country.independent ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">FIFA Code</p>
                    <p className="font-medium">{country.fifa || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map and Coat of Arms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <MapCard latitude={latitude} longitude={longitude} />
            <CortofArmsCard country={country} />
          </div>
        </div>
      </div>
    </div>
  );
}
