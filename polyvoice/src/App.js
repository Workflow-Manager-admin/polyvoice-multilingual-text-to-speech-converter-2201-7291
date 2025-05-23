import React from 'react';
import './App.css';
import PolyVoice from './components/PolyVoice';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> PolyVoice
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          <div className="hero">
            <div className="subtitle">Multilingual Text-to-Speech Converter</div>
            
            <h1 className="title">PolyVoice</h1>
            
            <div className="description">
              Convert your text to natural-sounding speech with our easy-to-use tool.
            </div>
            
            <PolyVoice />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;