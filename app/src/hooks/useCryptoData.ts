import { useState, useEffect } from "react";
import { fetchCryptoData } from "../services/api.ts";
import { Crypto } from "../types/crypto.ts";

export const useCryptoData = () => {
  const [cryptoData, setCryptoData] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchCryptoData();
        setCryptoData(data);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { cryptoData, loading };
};
