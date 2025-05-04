
import { Map } from "lucide-react";
import mapImage from "../assets/images/map.png";

export default function MapCard({ latitude, longitude }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
      <h3 className="font-bold text-lg flex items-center text-[#347928] mb-2">
        <Map className="mr-2 w-5 h-5" /> Map View
      </h3>
      <div
        className="relative h-48 bg-cover bg-center rounded-md mb-4"
        style={{ backgroundImage: `url(${mapImage})` }}
      >
        <a
          href={`https://www.google.com/maps/place/${latitude},${longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-3 bg-[#347928] text-white rounded-md text-lg hover:bg-[#2c6823] transition-colors"
        >
          View on Google Maps
        </a>
      </div>
    </div>
  );
}

  