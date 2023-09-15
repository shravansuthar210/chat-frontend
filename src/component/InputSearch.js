import React from "react";

const InputSearch = ({ search, setSearch }) => {
  return (
    <div className="relative mb-4 flex w-[80%] mx-auto mt-2 items-stretch">
      <input
        className="flex-auto rounded-md px-3 py-1 mx-1"
        placeholder="Enter Phone number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="h-5 w-5"
        >
          <path
            fill-rule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default InputSearch;