import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import CoinGridComponent from './Components/CoinGridComponent';

function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
      )
      .then(res => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch(error => console.log(error));
  });

  const handleChange = e => {
    setSearch(e.target.value);
  };
  const filteredCoins = coins.filter(coin =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
        <div className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Search a currency</h1>
        <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search'
          />
        </form>
      </div>
      {filteredCoins.map(x => {
        return (
          <CoinGridComponent
            key={x.id}
            name={x.name}
            price={x.current_price}
            symbol={x.symbol}
            marketcap={x.total_volume}
            volume={x.market_cap}
            image={x.image}
            priceChange={x.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
}

export default App;
