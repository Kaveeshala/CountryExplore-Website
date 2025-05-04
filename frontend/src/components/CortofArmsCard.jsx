import React from 'react'

export default function CortofArmsCard({country}) {
    const populationDensity = country.area ? Math.round(country.population / country.area) : "N/A";

  return country.coatOfArms?.svg ? (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center">
      <h3 className="font-bold text-lg text-[#347928] mb-2">Coat of Arms</h3>
      <div className="flex justify-center h-48 items-center">
        <img 
          src={country.coatOfArms.svg} 
          alt={`Coat of arms of ${country.name.common}`}
          className="max-h-32 object-contain"
        />
      </div>
    </div>
  ) : (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
      <h3 className="font-bold text-lg flex items-center text-[#347928] mb-2">Country Facts</h3>
      <div className="h-48 overflow-y-auto">
        <ul className="list-disc pl-5 space-y-2">
          <li>Population density: {populationDensity} people per km²</li>
          <li>Continent: {country.continents?.[0] || "N/A"}</li>
          <li>Borders: {country.borders?.length ? country.borders.join(", ") : "Island nation"}</li>
          {country.startOfWeek && <li>Start of week: {country.startOfWeek}</li>}
          {country.gini && <li>Gini index: {Object.values(country.gini)[0]}</li>}
        </ul>
      </div>
    </div>
  );
}

