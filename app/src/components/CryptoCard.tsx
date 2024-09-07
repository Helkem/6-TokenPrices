import { Crypto } from "@/types/crypto";
import { formatMarketCap, formatPrice } from "@/utils/formatters";
import { ChevronDownIcon, ChevronUpIcon, Star } from "lucide-react";

interface CryptoCardProps {
  crypto: Crypto;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
}

export const CryptoCard: React.FC<CryptoCardProps> = ({
  crypto,
  isBookmarked,
  onToggleBookmark,
}) => {
  return (
    <div className='bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200'>
      <div className='p-4'>
        <div className='flex items-start justify-between mb-3'>
          <div className='flex items-center'>
            <div className='bg-gray-100 rounded-full p-2 mr-3'>
              <img
                src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`}
                alt={crypto.name}
                className='h-8 w-8'
              />
            </div>
            <div>
              <h2 className='font-semibold text-lg text-gray-900'>
                {crypto.name}
              </h2>
              <p className='text-sm text-gray-500 uppercase'>{crypto.symbol}</p>
            </div>
          </div>
          <button
            onClick={() => onToggleBookmark(crypto.id)}
            className='focus:outline-none'
          >
            <Star
              className={`h-6 w-6 ${
                isBookmarked ? "text-blue-400 fill-current" : "text-gray-300"
              }`}
            />
          </button>
        </div>
        <div className='flex justify-between items-end mb-3'>
          <div className='text-2xl font-semibold text-gray-900'>
            {formatPrice(crypto.quote.USD.price)}
          </div>
          <div
            className={`flex items-center ${
              crypto.quote.USD.percent_change_24h >= 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {crypto.quote.USD.percent_change_24h >= 0 ? (
              <ChevronUpIcon className='h-4 w-4 mr-1' />
            ) : (
              <ChevronDownIcon className='h-4 w-4 mr-1' />
            )}
            <span className='text-sm font-medium'>
              {Math.abs(crypto.quote.USD.percent_change_24h).toFixed(2)}%
            </span>
          </div>
        </div>
        <div className='flex justify-between text-sm'>
          <div>
            <p className='text-gray-500 mb-1'>Market Cap</p>
            <p className='font-medium text-gray-900'>
              {formatMarketCap(crypto.quote.USD.market_cap)}
            </p>
          </div>
          <div className='text-right'>
            <p className='text-gray-500 mb-1'>Rank</p>
            <p className='font-medium text-gray-900'>#{crypto.cmc_rank}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
