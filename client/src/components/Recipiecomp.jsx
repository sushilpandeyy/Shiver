import React, { useState } from 'react';
import './Comp.css'; // Import your CSS file
import logo from '../assets/logo.png';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

async function fetchRecipeData(recipeName) {
  const re = "You are an Indian Chef Named Rinku, write down a recipe for " + recipeName;
  const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key='; 
  try {
    const response = await axios.post(apiUrl, {
      contents: [
        {
          role: "user",
          parts: [{ text: re }]
        }
      ]
    });
    return response.data.candidates[0]?.content?.parts[0]?.text || '';
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return '';
  }
}

function RecipeComponent() {
  const [recipeName, setRecipeName] = useState('');
  const [recipeContent, setRecipeContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRecipeNameChange = (event) => {
    setRecipeName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const content = await fetchRecipeData(recipeName);
    setRecipeContent(content);
    setLoading(false);
  };

  return (
    <div className="recipe-container">
      <div className="recipe-header">
        <img src={logo} alt="Logo" className="recipe-logo" />
        <h1>Recipe Finder</h1>
      </div>
      <form onSubmit={handleSubmit} className="recipe-form">
        <input
          type="text"
          value={recipeName}
          onChange={handleRecipeNameChange}
          placeholder="Enter recipe name"
          className="recipe-input"
        />
        <button type="submit" className="recipe-button">
          Search
        </button>
      </form>
      {loading ? (
        <div className="loading-spinner"></div>
      ) : recipeContent ? (
        <div className="recipe-content">
          <ReactMarkdown>{recipeContent}</ReactMarkdown>
        </div>
      ) : null}
    </div>
  );
}

export default RecipeComponent;
