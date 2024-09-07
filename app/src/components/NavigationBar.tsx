interface NavigationBarProps {
  setActiveTab: React.Dispatch<React.SetStateAction<"all" | "bookmarked">>;
  activeTab: "all" | "bookmarked";
}

export default function NavigationBar({
  setActiveTab,
  activeTab,
}: NavigationBarProps) {
  return (
    <nav className='mb-6' aria-label='Cryptocurrency tabs'>
      <ul className='flex bg-gray-200 rounded-full p-1'>
        <li>
          <button
            className={`py-2 px-4 text-sm font-medium rounded-full focus:outline-none transition-colors duration-200 ${
              activeTab === "all"
                ? "bg-white text-gray-900 shadow"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("all")}
            aria-current={activeTab === "all" ? "page" : undefined}
          >
            All Cryptocurrencies
          </button>
        </li>
        <li className='ml-2'>
          <button
            className={`py-2 px-4 text-sm font-medium rounded-full focus:outline-none transition-colors duration-200 ${
              activeTab === "bookmarked"
                ? "bg-white text-gray-900 shadow"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("bookmarked")}
            aria-current={activeTab === "bookmarked" ? "page" : undefined}
          >
            Watchlist
          </button>
        </li>
      </ul>
    </nav>
  );
}
