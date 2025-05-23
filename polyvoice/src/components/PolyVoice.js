import React, { useState, useEffect } from 'react';
import './PolyVoice.css';

/**
 * PolyVoice - A multilingual text-to-speech converter component
 * Features:
 * - Glassmorphic UI design
 * - Dark/light theme toggle
 * - Text input area for content to be spoken
 * - Text-to-speech functionality using Web Speech API
 * - Visual feedback during speech playback
 */
const PolyVoice = () => {
  // State management
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [inputText, setInputText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [synthesis, setSynthesis] = useState(null);

  // Initialize speech synthesis on component mount
  useEffect(() => {
    if ('speechSynthesis' in window) {
      setSynthesis(window.speechSynthesis);
    } else {
      console.error("Speech synthesis not supported in this browser");
    }
    
    // Cancel any ongoing speech when component unmounts
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Toggle between dark and light themes
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.body.classList.toggle('light-theme', !isDarkTheme);
  };

  // Handle text input changes
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Speak the input text using Web Speech API
  const speakText = () => {
    if (!synthesis || !inputText.trim()) return;

    // Cancel any ongoing speech
    synthesis.cancel();

    // Create a new utterance with the input text
    const utterance = new SpeechSynthesisUtterance(inputText);
    
    // Set speaking state to true when speech starts
    utterance.onstart = () => setIsSpeaking(true);
    
    // Reset speaking state when speech ends
    utterance.onend = () => setIsSpeaking(false);
    
    // Handle errors
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
      setIsSpeaking(false);
    };

    // Start speaking
    synthesis.speak(utterance);
  };

  return (
    <div className="polyvoice-container">
      <div className="polyvoice-card glass">
        <div className="card-header">
          <h2>PolyVoice</h2>
          <div className="theme-toggle">
            <div className="theme-icons">
              <span className={`moon-icon ${isDarkTheme ? 'active' : ''}`} aria-hidden="true">🌙</span>
              <span className={`sun-icon ${!isDarkTheme ? 'active' : ''}`} aria-hidden="true">☀️</span>
            </div>
            <label className="toggle-switch" aria-label={isDarkTheme ? "Switch to light theme" : "Switch to dark theme"}>
              <input 
                type="checkbox" 
                checked={!isDarkTheme}
                onChange={toggleTheme}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
        
        <div className="card-body">
          <textarea
            className="input-text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Enter text to convert to speech..."
            rows={6}
          />
          
          <button 
            className={`speak-button ${isSpeaking ? 'speaking' : ''}`}
            onClick={speakText}
            disabled={!inputText.trim() || isSpeaking}
          >
            {isSpeaking ? 'Speaking...' : 'Speak'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolyVoice;
