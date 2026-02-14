import { useState, useEffect } from 'react'

function App() {
  const [coins, setCoins] = useState(0)
  const [energy, setEnergy] = useState(100)
  const [perClick, setPerClick] = useState(1) 
  const [autoIncome, setAutoIncome] = useState(0)

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
  }, [])

  // 1. Humna (Energy) deebisanii guutuuf
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prev) => Math.min(prev + 1, 100));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // 2. Auto-clicker (Bot) kooinii akka dabaluuf
  useEffect(() => {
    if (autoIncome > 0) {
      const interval = setInterval(() => {
        setCoins((prev) => prev + autoIncome);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [autoIncome]);

  const handleClick = () => {
    if (energy >= perClick) {
      setCoins(coins + perClick);
      setEnergy(energy - perClick);
    }
  };

  const buyUpgrade = () => {
    if (coins >= 100) {
      setCoins(coins - 100);
      setPerClick(perClick + 1);
    }
  };

  const buyBot = () => {
    if (coins >= 500) {
      setCoins(coins - 500);
      setAutoIncome(autoIncome + 1);
    }
  };

  return (
    <div style={{
      textAlign: 'center', backgroundColor: '#1a1a1a', color: 'white',
      height: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '3.5rem', color: 'gold', margin: '0' }}>💰 {coins}</h1>
        <p style={{ color: '#4caf50' }}>+ {autoIncome}/sec (Bot Income)</p>
      </div>

      <img 
        src="https://cryptologos.cc/logos/toncoin-ton-logo.png" 
        onClick={handleClick}
        style={{ 
          width: '200px', cursor: 'pointer', borderRadius: '50%', 
          boxShadow: '0 0 30px gold', transition: 'transform 0.1s' 
        }} 
        onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
        onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
      />

      <div style={{ marginTop: '20px', width: '250px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>⚡ {energy} / 100</span>
        </div>
        <div style={{ width: '100%', height: '10px', backgroundColor: '#333', borderRadius: '5px', marginTop: '5px' }}>
          <div style={{ width: `${energy}%`, height: '100%', backgroundColor: '#ffeb3b', borderRadius: '5px', transition: 'width 0.3s' }}></div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
        <button onClick={buyUpgrade} style={btnStyle}>
          🚀 Multi-tap<br/><small>100 Coins</small>
        </button>
        <button onClick={buyBot} style={btnStyle}>
          🤖 Tap Bot<br/><small>500 Coins</small>
        </button>
      </div>
    </div>
  )
}

const btnStyle = {
  backgroundColor: '#333', color: 'white', border: '1px solid gold',
  padding: '10px', borderRadius: '10px', cursor: 'pointer', fontSize: '0.8rem'
}

export default App;