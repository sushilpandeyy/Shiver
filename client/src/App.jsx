import { useState } from 'react'
import './App.css';
import RecipeComponent from './components/Recipiecomp';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="App">
    <RecipeComponent/>
    </div>
    </>
  )
}

export default App
