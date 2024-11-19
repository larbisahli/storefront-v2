const SearchSection = () => {
  return (
    <form className="mt-3 px-3">
      <div className="relative">
        <input
          type="search"
          id="search"
          className="block w-full p-4 pr-10 text-sm text-gray-900 border border-gray-300 
        rounded-sm bg-gray-50 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700
         dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-red-500
          dark:focus:border-red-500 outline-none"
          placeholder="Search products"
          required
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </div>
    </form>
  )
}

export default SearchSection
