import { Input } from "antd";
import { FiSearch } from "react-icons/fi";
import { useCallback, useMemo } from "react";
import debounce from "lodash/debounce";

export default function SearchBar({ searchTerm, onSearchChange }) {
  // Debounce the onSearchChange to delay calling it until user stops typing
  const debouncedChange = useMemo(() => {
    return debounce(onSearchChange, 300); // Adjust delay as needed
  }, [onSearchChange]);

  // Memoized input handler that uses debounced function
  const handleChange = useCallback((e) => {
    debouncedChange(e.target.value);
  }, [debouncedChange]);

  return (
    <div className="relative w-72">
  <FiSearch className="absolute top-3.5 left-4 text-gray-400" />
  <input
    type="text"
    placeholder="Search by country name"
    defaultValue={searchTerm}
    onChange={(e) => debouncedChange(e.target.value)}
    className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-0 focus:border-gray-300"
  />
</div>

    
  );
}
