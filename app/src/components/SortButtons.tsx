import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

interface SortButtonsProps {
  toggleSort: (key: "market_cap" | "price" | "rank") => void;
  sortBy: "market_cap" | "price" | "rank";
  sortOrder: "asc" | "desc";
}

export default function SortButtons({
  toggleSort,
  sortBy,
  sortOrder,
}: SortButtonsProps) {
  return (
    <div className='flex space-x-4 mb-4'>
      {[
        { key: "market_cap", label: "Market Cap" },
        { key: "price", label: "Price" },
        { key: "rank", label: "Rank" },
      ].map(({ key, label }) => (
        <button
          key={key}
          onClick={() => toggleSort(key as "market_cap" | "price" | "rank")}
          className={`px-4 py-2 font-medium rounded-xl transition-all duration-200 ease-in-out ${
            sortBy === key
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          style={{
            width: "auto",
            minWidth: "max-content",
          }}
        >
          <span className='whitespace-nowrap'>{label}</span>
          <span
            className={`ml-1 inline-block transition-all duration-200 ${
              sortBy === key ? "w-4 opacity-100" : "w-0 opacity-0"
            }`}
          >
            {sortOrder === "asc" ? (
              <ChevronUpIcon className='w-3 h-3 ml-1' />
            ) : (
              <ChevronDownIcon className='w-3 h-3 ml-1' />
            )}
          </span>
        </button>
      ))}
    </div>
  );
}
