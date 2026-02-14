import { useState, useEffect } from 'react'

function App() {
  const [coins, setCoins] = useState(0)
  const [energy, setEnergy] = useState(100)
  const [perClick, setPerClick] = useState(1)
  const [autoIncome, setAutoIncome] = useState(0)
  const [view, setView] = useState('game') // 'game', 'task', 'invite', 'withdraw'

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
  }, [])

  // System Logic (Energy & Auto-Income)
  useEffect(() => {
    const interval = setInterval(() => setEnergy((prev) => Math.min(prev + 1, 100)), 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (autoIncome > 0) {
      const interval = setInterval(() => setCoins((prev) => prev + autoIncome), 1000);
      return () => clearInterval(interval);
    }
  }, [autoIncome]);

  // UI Pages
  const TaskPage = () => (
    <div style={pageStyle}>
      <h2>📋 Hojiiwwan (Tasks)</h2>
      <div style={card} onClick={() => {setCoins(c => c + 5000); alert("5000 Coins Added!")}}>
        Join Our Telegram (+5000 💰)
      </div>
      <div style={card} onClick={() => {setCoins(c => c + 2000); alert("2000 Coins Added!")}}>
        Follow on X (+2000 💰)
      </div>
    </div>
  );

  const InvitePage = () => (
    <div style={pageStyle}>
      <h2>👥 Affeerraa (Invite)</h2>
      <p>Invite friends and earn 10% of their taps!</p>
      <button style={mainBtn} onClick={() => alert("Link Copied!")}>Copy Referral Link</button>
    </div>
  );

  const WithdrawPage = () => (
    <div style={pageStyle}>
      <h2>💸 Kooinii Baasuu (Withdraw)</h2>
      <p>Minimum: 1,000,000 Ethio Coin</p>
      <input type="text" placeholder="TON Wallet Address" style={inputStyle} />
      <button style={mainBtn}>Withdraw Now</button>
    </div>
  );

  return (
    <div style={containerStyle}>
      {view === 'game' && (
        <>
          <h1 style={{ fontSize: '3rem', color: 'gold' }}>💰 {coins}</h1>
          <p style={{ color: 'lime' }}>Profit: +{autoIncome}/sec</p>
          <img src="https://cryptologos.cc/logos/toncoin-ton-logo.png" 
               onClick={() => energy >= perClick && (setCoins(coins + perClick), setEnergy(energy - perClick))}
               style={coinImg} />
          <div style={{ width: '80%', marginTop: '20px' }}>
            <span>⚡ {energy}/100</span>
            <div style={barBase}><div style={{...barFill, width: `${energy}%`}}></div></div>
          </div>
        </>
      )}

      {view === 'task' && <TaskPage />}
      {view === 'invite' && <InvitePage />}
      {view === 'withdraw' && <WithdrawPage />}

      {/* Navigation Bar */}
      <div style={navStyle}>
        <button onClick={() => setView('game')} style={navBtn}>🎮 Tap</button>
        <button onClick={() => setView('task')} style={navBtn}>📋 Task</button>
        <button onClick={() => setView('invite')} style={navBtn}>👥 Invite</button>
        <button onClick={() => setView('withdraw')} style={navBtn}>💰 Payout</button>
      </div>
    </div>
  );
}

// Styles
const containerStyle = { textAlign: 'center', backgroundColor: '#121212', color: 'white', minHeight: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'fixed', top: '0', left: '0' };
const coinImg = { width: '200px', cursor: 'pointer', borderRadius: '50%', boxShadow: '0 0 30px gold' };
const barBase = { width: '100%', height: '10px', backgroundColor: '#333', borderRadius: '5px' };
const barFill = { height: '100%', backgroundColor: 'gold', borderRadius: '5px', transition: 'width 0.3s' };
const navStyle = { position: 'fixed', bottom: '0', width: '100%', display: 'flex', justifyContent: 'space-around', backgroundColor: '#1c1c1c', padding: '15px 0', borderTop: '1px solid #333' };
const navBtn = { background: 'none', border: 'none', color: 'white', fontWeight: 'bold' };
const pageStyle = { padding: '20px', width: '100%' };
const card = { backgroundColor: '#222', padding: '15px', borderRadius: '10px', margin: '10px', border: '1px solid gold' };
const mainBtn = { backgroundColor: 'gold', padding: '10px 20px', border: 'none', borderRadius: '10px', fontWeight: 'bold' };
const inputStyle = { padding: '10px', width: '80%', borderRadius: '5px', marginBottom: '10px', backgroundColor: '#333', color: 'white', border: '1px solid #555' };

export default App;