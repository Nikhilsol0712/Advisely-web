import React, { useState } from "react";

const SearchBar = ({ smeDataToMap, setFilteredSmeData }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (event) => {
    setSearchInput(event.target.value);
    filterSmeData(event.target.value);
  };

  const filterSmeData = (searchInput) => {
    const filteredData = smeDataToMap.filter((smeData) =>
      smeData.firstName.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredSmeData(filteredData);
  };

  return (
    <div className="w-4/6">
      <form class="">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div class="relative  w-100">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-3 ps-10 text-sm text-gray-900 border border-black rounded-lg bg-white focus:outline-none   dark:placeholder-gray-400 dark:text-gray-600  "
            placeholder="Search Mentor"
            required
            value={searchInput}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
