import React, { useState } from "react";
import CryptoCards from "./CryptoCards";
import Header from "./Header";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";

export const Layout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"all" | "bookmarked">("all");
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<"market_cap" | "price" | "rank">("rank");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  return (
    <div className='container pt-10 mx-auto p-4 bg-gray-50 min-h-screen font-sans'>
      <Header />
      <main>
        <NavigationBar setActiveTab={setActiveTab} activeTab={activeTab} />
        <CryptoCards
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </main>
      <Footer />
    </div>
  );
};
