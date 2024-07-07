import React, { useState } from 'react';
import '../App.css';
import logo from '../assets/logo.png';  
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

async function getResponse(prompt) {
  const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=';
  try {
    const response = await axios.post(apiUrl, {
      "contents": [
        {
          "role": "user",
          "parts": [{ "text": prompt }]
        }
      ]
    });
    console.log(response)
    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error fetching response:', error);
    return null;
  }
}

function Chatt() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      const response = await getResponse(input);
      if (response) {
        setTimeout(() => {
          setMessages(prevMessages => [
            ...prevMessages,
            { text: response, sender: 'bot' }
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
            {msg.sender === 'bot' ? (
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            ) : (
              <div>{msg.text}</div>
            )}
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
          style={{ backgroundColor: '#2a2a2a', color: '#e0e0e0', borderColor: '#333', borderRadius: '12px', padding: '10px' }}
        />
        <button onClick={handleSend} style={{ backgroundColor: '#007bff', color: 'white', borderRadius: '12px', padding: '10px 16px', marginLeft: '10px', cursor: 'pointer', transition: 'background-color 0.3s', border: 'none' }}>Send</button>
      </div>
    </div>
  );
}

export default Chatt;