import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import Home from './components/Home.jsx';
import RecipeComponent from './components/Recipiecomp.jsx';

const router= createBrowserRouter(
  createRoutesFromElements(
     <>
    <Route path='/' element={<App/>}>
      <Route path='' element={<Home/>}/>
      <Route path='/Nityas-Recipie' element={<RecipeComponent/>}/>
    </Route>
    </>
      )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>,
)
