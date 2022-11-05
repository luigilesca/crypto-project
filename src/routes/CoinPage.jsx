import { useState, useEffect } from 'react';
import axios from 'axios';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { FaTwitter, FaFacebook, FaReddit, FaGithub } from 'react-icons/fa';
import DOMPurify from 'dompurify';
import { useParams } from 'react-router-dom';

const CoinPage = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(false);

  const params = useParams();

  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}?localization=false&sparkline=true`;

  useEffect(() => {
    try {
      const fetchData = async () => {
        setLoading(true);
        const response = await axios.get(url);

        const data = response.data;

        setCoin(data);
        setLoading(false);
      };
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, [url]);

  const {
    image,
    name,
    symbol,
    market_data,
    market_cap_rank,
    hashing_algorithm,
    tickers,
    liquidity_score,
    description,
  } = coin;

  return (
    <>
      {loading ? (
        <p className='w-full text-center font-bold pt-10'>Loading...</p>
      ) : (
        <div className='rounded-div my-12 py-8'>
          <div className='flex py-8'>
            <img className='w-20 mr-8' src={image?.large} alt='/' />
            <div>
              <p className='text-3xl font-bold'>{name} price</p>
              <p>{symbol?.toUpperCase()} / USD</p>
            </div>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            <div>
              <div className='flex justify-between'>
                {market_data?.current_price ? (
                  <p className='text-3xl font-bold'>
                    ${market_data.current_price.usd.toLocaleString()}
                  </p>
                ) : null}
                <p>7 Day</p>
              </div>

              <div>
                <Sparklines data={market_data?.sparkline_7d.price}>
                  <SparklinesLine color='teal' />
                </Sparklines>
              </div>

              <div className='flex justify-between py-4'>
                <div>
                  <p className='text-gray-500 text-sm'>Market Cap</p>
                  {market_data?.market_cap ? (
                    <p>${market_data?.market_cap.usd.toLocaleString()}</p>
                  ) : null}
                </div>
                <div>
                  <p className='text-gray-500 text-sm'>Volume 24h</p>
                  {market_data?.market_cap ? (
                    <p>${market_data?.total_volume.usd.toLocaleString()}</p>
                  ) : null}
                </div>
              </div>

              <div className='flex justify-between py-4'>
                <div>
                  <p className='text-gray-500 text-sm'>24h High</p>
                  {coin.market_data?.high_24h ? (
                    <p>${market_data.high_24h.usd.toLocaleString()}</p>
                  ) : null}
                </div>
                <div>
                  <p className='text-gray-500 text-sm'>24h Low</p>
                  {coin.market_data?.low_24h ? (
                    <p>${market_data.low_24h.usd.toLocaleString()}</p>
                  ) : null}
                </div>
              </div>
            </div>

            <div>
              <p className='text-xl font-bold'>Market Stats</p>
              <div className='flex justify-between py-4'>
                <div>
                  <p className='text-gray-500 text-sm'>Market Rank</p>
                  {market_cap_rank}
                </div>
                <div>
                  <p className='text-gray-500 text-sm'>Hashing Algorithm</p>
                  {hashing_algorithm ? <p>{hashing_algorithm}</p> : null}
                </div>
                <div>
                  <p className='text-gray-500 text-sm'>Trust Score</p>
                  {tickers ? <p>{liquidity_score.toFixed(2)}</p> : null}
                </div>
              </div>

              <div className='flex justify-between py-4'>
                <div>
                  <p className='text-gray-500 text-sm'>Price Change (24h)</p>
                  {market_data ? (
                    <p>{market_data.price_change_percentage_24h.toFixed(2)}%</p>
                  ) : null}
                </div>
                <div>
                  <p className='text-gray-500 text-sm'>Price Change (7d)</p>
                  {market_data ? <p>{market_data.price_change_percentage_7d.toFixed(2)}%</p> : null}
                </div>
                <div>
                  <p className='text-gray-500 text-sm'>Price Change (14d)</p>
                  {market_data ? (
                    <p>{market_data.price_change_percentage_14d.toFixed(2)}%</p>
                  ) : null}
                </div>
              </div>

              <div className='flex justify-between py-4'>
                <div>
                  <p className='text-gray-500 text-sm'>Price Change (30d)</p>
                  {coin.market_data ? (
                    <p>{market_data.price_change_percentage_30d.toFixed(2)}%</p>
                  ) : null}
                </div>
                <div>
                  <p className='text-gray-500 text-sm'>Price Change (60d)</p>
                  {market_data ? (
                    <p>{market_data.price_change_percentage_60d.toFixed(2)}%</p>
                  ) : null}
                </div>
                <div>
                  <p className='text-gray-500 text-sm'>Price Change (1y)</p>
                  {market_data ? <p>{market_data.price_change_percentage_1y.toFixed(2)}%</p> : null}
                </div>
              </div>

              {/* Icon */}
              <div className='flex justify-around p-8 text-accent'>
                <FaTwitter />
                <FaFacebook />
                <FaReddit />
                <FaGithub />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className='py-4'>
            <p className='text-xl font-bold'>About {coin.name}</p>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(description ? description.en : ''),
              }}
            ></p>
          </div>
        </div>
      )}
    </>
  );
};

export default CoinPage;
