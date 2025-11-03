// src/components/UnitDropDown.jsx
export default function UnitDropDown({ unit, onChange }) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex items-center gap-1 sm:gap-2 bg-white/10 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-lg shadow-sm backdrop-blur-md">
      <label htmlFor="unit" className="text-xs sm:text-sm font-medium">
        Unit:
      </label>
      <select
        id="unit"
        value={unit}
        onChange={handleChange}
        className="bg-transparent border border-white/20 rounded-md px-1 py-0.5 text-xs sm:px-2 sm:py-1 sm:text-sm focus:outline-none focus:ring-1 focus:ring-white"
      >
        <option value="metric" className="text-black">
          °C (Metric)
        </option>
        <option value="imperial" className="text-black">
          °F (Imperial)
        </option>
      </select>
    </div>
  );
}
