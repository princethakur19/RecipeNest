import { useLoaderData } from 'react-router-dom'
import foodImg from '../assets/foodRecipe.png'
import { BsFillStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

function RecipeItems() {
    const allRecipe = useLoaderData()
    let path = window.location.pathname === "/myRecipe" ? true : false
    console.log(allRecipe)
  return (
    <>
      <div className='card-container'>
        {
            allRecipe?.map((item, index)=>{
                return(
                    <div key={index} className='card'>

                        <img src={`http://localhost:5000/images/${item.coverImage}`} alt={item.title} width="120px" height="100px"></img>
                        <div className="card-body">
                            <div className="title">{item.title}</div>
                            <div className="icons">
                                <div className="timmer"><BsFillStopwatchFill />30min</div>
                                <FaHeart />
                            </div>
                        </div>
                    </div>
                )
            })
        }
      </div>
    </>
  )
}

export default RecipeItems
