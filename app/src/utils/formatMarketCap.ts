export const formatMarketCap = (marketCap: number): string => {
  return (marketCap / 1e9).toFixed(2) + "B";
};
