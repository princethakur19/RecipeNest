import { useState } from "react"
import Model from "./Model"
import InputForm from "./InputForm"
import { NavLink } from "react-router-dom"


function Navbar() {
  const [isOpen,setIsOpen] = useState(false)

  const checkLogin = ()=>{
    setIsOpen(true)
  }
  return (
    <>
      <header>
        <h2>RecipeNest</h2>
        <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/myRecipe">My Recipe</NavLink></li>
            <li><NavLink to="/favRecipe">Favourites</NavLink></li>
            <li onClick={checkLogin}><p className="login">Login</p></li>
        </ul>
      </header>
      { (isOpen) && <Model onClose={()=> setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)} /></Model>}
    </>
  )
}

export default Navbar
