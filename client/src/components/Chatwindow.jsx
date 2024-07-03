import React, { useState } from 'react';
import '../App.css';
import logo from '../assets/logo.png'; // Replace with your actual logo path
import sampleImage from '../assets/logo.png'; // Replace with your actual sample image path

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      if (messages.length === 0) {
        setTimeout(() => {
          setMessages(prevMessages => [
            ...prevMessages,
            { text: 'This is a response from Shiver', sender: 'bot' }
          ]);
        }, 1000);
      }
    }
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {messages.length === 0 && (
          <div className="sample-content">
            <img src={logo} alt="Logo" className="sample-logo" />
            <h1>Shiver</h1>
          </div>
        )}
      </div>

      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' ? handleSend() : null}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatWindow;