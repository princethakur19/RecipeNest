import { useState } from "react"
import Model from "./Model"
import InputForm from "./InputForm"


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
            <li>Home</li>
            <li>My Recipe</li>
            <li>Favourites</li>
            <li onClick={checkLogin}>Login</li>
        </ul>
      </header>
      { (isOpen) && <Model onClose={()=> setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)} /></Model>}
    </>
  )
}

export default Navbar
