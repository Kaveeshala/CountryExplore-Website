export default function RegionFilter({ selectedRegion, onRegionChange }) {
  const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];

  return (
    <div className="relative w-72">
      <select
        value={selectedRegion || ""}
        onChange={(e) => onRegionChange(e.target.value || null)}
        className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-0 focus:border-gray-300 text-gray-700 bg-white"
      >
        <option value="">Filter by Region</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}
