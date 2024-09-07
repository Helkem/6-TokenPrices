import axios from "axios";
import { Crypto } from "../types/crypto";

export const fetchCryptoData = async (): Promise<Crypto[]> => {
  const response = await axios.get("http://localhost:3000/api/crypto");
  return response.data.data;
};
