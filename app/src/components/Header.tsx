export default function Header() {
  return (
    <header>
      <h1>
        <img src={"/sitelogo.png"} alt='logo' className='w-51 h-10' />
      </h1>
      <p className='text-sm text-gray-500 mb-6 mt-2 font-medium'>
        Track the latest prices, market caps, and more for your favorite
        cryptocurrencies.
      </p>
    </header>
  );
}
