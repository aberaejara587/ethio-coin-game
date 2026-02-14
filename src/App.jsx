import { useState, useEffect } from 'react';

function App() {
  const [coins, setCoins] = useState(0);
  const [energy, setEnergy] = useState(100);
  const [perClick, setPerClick] = useState(1);
  const [view, setView] = useState('game'); // Views: game, task, invite, withdraw

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
    // Energy regeneration logic
    const interval = setInterval(() => {
      setEnergy((prev) => Math.min(prev + 1, 100));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleTap = () => {
    if (energy >= perClick) {
      setCoins(coins + perClick);
      setEnergy(energy - perClick);
    }
  };

  // UI Components
  const GameView = () => (
    <div style={contentStyle}>
      <h1 style={{ fontSize: '3.5rem', color: 'gold', margin: '10px 0' }}>💰 {coins}</h1>
      <img 
        src="https://cryptologos.cc/logos/toncoin-ton-logo.png" 
        onClick={handleTap}
        style={coinStyle} 
      />
      <div style={{ width: '80%', marginTop: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>⚡ Energy: {energy}/100</span>
        </div>
        <div style={barBase}><div style={{...barFill, width: `${energy}%`}}></div></div>
      </div>
    </div>
  );

  const TaskView = () => (
    <div style={contentStyle}>
      <h2>📋 Tasks</h2>
      <div style={cardStyle} onClick={() => setCoins(c => c + 1000)}>Join Channel (+1000 💰)</div>
      <div style={cardStyle} onClick={() => setCoins(c => c + 500)}>Follow X (+500 💰)</div>
    </div>
  );

  const InviteView = () => (
    <div style={contentStyle}>
      <h2>👥 Invite Friends</h2>
      <p>Invite friends and earn 10% bonus!</p>
      <button style={actionBtn} onClick={() => alert("Link Copied!")}>Copy Invite Link</button>
    </div>
  );

  const WithdrawView = () => (
    <div style={contentStyle}>
      <h2>💸 Payout</h2>
      <p>Min: 1,000,000 Coins</p>
      <input type="text" placeholder="TON Wallet Address" style={inputStyle} />
      <button style={actionBtn}>Withdraw Now</button>
    </div>
  );

  return (
    <div style={containerStyle}>
      {view === 'game' && <GameView />}
      {view === 'task' && <TaskView />}
      {view === 'invite' && <InviteView />}
      {view === 'withdraw' && <WithdrawView />}

      <nav style={navStyle}>
        <button onClick={() => setView('game')} style={navBtn}>🎮 Tap</button>
        <button onClick={() => setView('task')} style={navBtn}>📋 Task</button>
        <button onClick={() => setView('invite')} style={navBtn}>👥 Friends</button>
        <button onClick={() => setView('withdraw')} style={navBtn}>💰 Wallet</button>
      </nav>
    </div>
  );
}

// Styles
const containerStyle = { textAlign: 'center', backgroundColor: '#1a1a1a', color: 'white', height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'fixed' };
const contentStyle = { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' };
const coinStyle = { width: '200px', cursor: 'pointer', borderRadius: '50%', boxShadow: '0 0 30px gold', transition: 'transform 0.1s' };
const barBase = { width: '100%', height: '12px', backgroundColor: '#333', borderRadius: '6px', marginTop: '8px' };
const barFill = { height: '100%', backgroundColor: 'gold', borderRadius: '6px', transition: 'width 0.3s' };
const navStyle = { display: 'flex', width: '100%', justifyContent: 'space-around', padding: '15px 0', backgroundColor: '#222', borderTop: '1px solid #444' };
const navBtn = { background: 'none', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer' };
const cardStyle = { backgroundColor: '#333', padding: '15px', borderRadius: '10px', margin: '10px', width: '80%', border: '1px solid gold' };
const actionBtn = { backgroundColor: 'gold', padding: '12px 25px', border: 'none', borderRadius: '10px', fontWeight: 'bold' };
const inputStyle = { padding: '12px', width: '70%', borderRadius: '8px', marginBottom: '15px', border: '1px solid #555', backgroundColor: '#222', color: 'white' };

export default App;