export const formatPrice = (price: number): string => {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatMarketCap = (marketCap: number): string => {
  return (marketCap / 1e9).toFixed(2) + "B";
};
