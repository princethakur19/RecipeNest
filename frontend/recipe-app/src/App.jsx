import React from 'react'
import './App.css'
import Home from './pages/Home'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import MainNavigation from './components/MainNavigation'
import axios from 'axios'

const getAllRecipe = async()=>{
  let allRecipe = []
  await axios.get('http://localhost:5000/recipe').then(res=>{
    allRecipe=res.data
  })
  return allRecipe
}

const router = createBrowserRouter([
  {path:"/",element:<MainNavigation />,children:[{path:"/",element:<Home/>, loader:getAllRecipe},
  {path:"/myRecipe",element:<Home />},
  {path:"/favRecipe",element:<Home />}

  ]}
])

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
