import axios from "axios";
import { Crypto } from "../types/crypto";

export const fetchCryptoData = async (): Promise<Crypto[]> => {
  const response = await axios.get(
    "https://cryptoindex.onrender.com/api/crypto"
  );
  return response.data.data;
};
