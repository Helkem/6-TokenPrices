import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { CryptoCard } from "./CryptoCard";
import SearchBar from "./SearchBar";
import SortButtons from "./SortButtons";

interface Crypto {
  id: number;
  name: string;
  symbol: string;
  cmc_rank: number;
  quote: {
    USD: {
      price: number;
      percent_change_24h: number;
      market_cap: number;
    };
  };
}

interface CryptoCardsProps {
  activeTab: "all" | "bookmarked";
  setActiveTab: React.Dispatch<React.SetStateAction<"all" | "bookmarked">>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  sortBy: "market_cap" | "price" | "rank";
  setSortBy: React.Dispatch<
    React.SetStateAction<"market_cap" | "price" | "rank">
  >;
  sortOrder: "asc" | "desc";
  setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
}

const CryptoCards: React.FC<CryptoCardsProps> = ({
  activeTab,

  search,
  setSearch,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}) => {
  const [cryptoData, setCryptoData] = useState<Crypto[]>([]);
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://cryptoindex.onrender.com/api/crypto"
        );
        setCryptoData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleBookmark = (id: number) => {
    setBookmarks((prevBookmarks) => {
      const newBookmarks = new Set(prevBookmarks);
      if (newBookmarks.has(id)) {
        newBookmarks.delete(id);
      } else {
        newBookmarks.add(id);
      }
      return newBookmarks;
    });
  };

  const filteredAndSortedCryptos = useMemo(() => {
    let filtered = cryptoData.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(search.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(search.toLowerCase())
    );
    if (activeTab === "bookmarked") {
      filtered = filtered.filter((crypto) => bookmarks.has(crypto.id));
    }
    return filtered.sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case "market_cap":
          aValue = a.quote.USD.market_cap;
          bValue = b.quote.USD.market_cap;
          break;
        case "price":
          aValue = a.quote.USD.price;
          bValue = b.quote.USD.price;
          break;
        case "rank":
          aValue = a.cmc_rank;
          bValue = b.cmc_rank;
          break;
        default:
          aValue = a.cmc_rank;
          bValue = b.cmc_rank;
      }
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    });
  }, [cryptoData, search, bookmarks, activeTab, sortBy, sortOrder]);

  const toggleSort = (newSortBy: "market_cap" | "price" | "rank") => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setSortOrder("asc");
    }
  };

  return (
    <>
      <div className='flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0'>
        <SearchBar searchTerm={search} onSearchChange={setSearch} />
        <SortButtons
          toggleSort={toggleSort}
          sortBy={sortBy}
          sortOrder={sortOrder}
        />
      </div>
      {loading ? (
        <div className='flex justify-center items-center h-64'>
          <div
            className='w-12 h-12 rounded-full animate-spin
            border-4 border-solid border-blue-400 border-t-transparent'
          ></div>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredAndSortedCryptos.map((crypto) => (
            <CryptoCard
              key={crypto.id}
              crypto={crypto}
              isBookmarked={bookmarks.has(crypto.id)}
              onToggleBookmark={toggleBookmark}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CryptoCards;
