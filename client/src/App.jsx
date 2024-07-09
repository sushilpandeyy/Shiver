import { useState } from 'react'
import './App.css';
import RecipeComponent from './components/Recipiecomp';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Chatt from './components/ChatComp';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="App">
    <Outlet/>
    </div>
    </>
  )
}

export default App
