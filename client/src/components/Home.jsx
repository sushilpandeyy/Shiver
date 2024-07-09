import React from 'react';
import './HomeComponent.css'; 
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const cardData = [
  { id: 1, title: "Nitya's Kitchen", description: "Hi! I’m Nitya, an Indian chef who loves to cook and share delicious recipes.", slug: 'Nityas-Recipie', logo: 'https://em-content.zobj.net/source/emojidex/112/female-cook-type-4_1f469-1f3fd-200d-1f373.png' },
];

function Home() {
  return (
    <div className="home-container">
      <div className="home-header">
        <img src={logo} alt="Shiver's Logo" className="home-logo" />
        <h1 className='home-h1'>Shiver</h1>
      </div>
      <div className="card-grid">
        {cardData.map(card => (
            <Link to={card.slug}>
          <div key={card.id} className="card">
          <img src={card.logo} alt="Logo" className="recipe-logo" />
            <h2>{card.title}</h2>
            <p>{card.description}</p>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
