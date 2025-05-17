import { FiSearch } from "react-icons/fi";
import { useCallback, useMemo, useEffect, useRef } from "react";
import debounce from "lodash/debounce";

export default function SearchBar({ searchTerm, onSearchChange }) {
  const inputRef = useRef(null);

  // Debounce the onSearchChange to delay calling it until user stops typing
  const debouncedChange = useMemo(() => {
    return debounce(onSearchChange, 300);
  }, [onSearchChange]);

  // Set the default value in the input field using ref
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = searchTerm || "";
    }
  }, [searchTerm]);

  const handleChange = useCallback((e) => {
    debouncedChange(e.target.value);
  }, [debouncedChange]);

  return (
    <div className="relative w-72">
      <FiSearch className="absolute top-3.5 left-4 text-gray-400" />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search by country name"
        defaultValue={searchTerm}
        onChange={handleChange}
        className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-0 focus:border-gray-300"
      />
    </div>
  );
}
