import React from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className='relative w-full md:w-1/3 mr-4 mb-4'>
      <SearchIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
      <Input
        type='text'
        placeholder='Search cryptocurrencies'
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onSearchChange(e.target.value)
        }
        className='pl-10 py-2 rounded-full w-full border-gray-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
      />
    </div>
  );
};

export default SearchBar;
