import { useEffect, useState } from 'react';
import axios from 'axios';

const Trending = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);

  const url = 'https://api.coingecko.com/api/v3/search/trending';

  useEffect(() => {
    try {
      const fetchData = async () => {
        setLoading(true);
        const response = await axios.get(url);
        const data = response.data.coins;

        setTrending(data);
        setLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [url]);

  return (
    <>
      {loading ? (
        <p className='w-full text-center font-bold pt-10'>Loading...</p>
      ) : (
        <div className='rounded-div my-12 py-8 text-primary'>
          <h1 className='text-2xl font-bold py-4'>Trending Coins</h1>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {trending.map((coin) => {
              const {
                item: { id, small: image, name, symbol, price_btc: price },
              } = coin;

              return (
                <div
                  key={id}
                  className='rounded-div flex justify-between p-4 hover:scale-105 ease-in-out duration-300'
                >
                  <div className='flex w-full items-center justify-between'>
                    <div className='flex'>
                      <img className='mr-4 rounded-full' src={image} alt={name} />
                      <div>
                        <p className='font-bold'>{name}</p>
                        <p>{symbol}</p>
                      </div>
                    </div>

                    <div className='flex items-center'>
                      <img
                        className='w-4 mr-2'
                        src='https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579'
                        alt='/'
                      />
                      <p>{price.toFixed(7)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Trending;
