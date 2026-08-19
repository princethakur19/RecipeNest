import { Link, useLoaderData } from 'react-router-dom'
import foodImg from '../assets/foodRecipe.png'
import { BsFillStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState } from 'react';

function RecipeItems() {
    const recipes = useLoaderData()
    const [allRecipes, setAllRecipes] = useState()
    let path = window.location.pathname === "/myRecipe" ? true : false
    console.log(allRecipe)

    useEffect(()=>{
        setAllRecipes(recipes)
    },[recipes])

    const onDelete = async(id)=>{
        await axios.delete(`http://localhost:5000/recipe/${id}`)
            .then((res)=>console.log(res))
        setAllRecipes(recipes => recipes.filter(recipes._id != id))
    }
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
                                <div className="timmer"><BsFillStopwatchFill />{item.time}</div>
                                {(!path) ? <FaHeart /> :
                                <div className="action">
                                    <Link to={`/editRecipe/${item._id}`} className='editIcon'><FaEdit /></Link>
                                    <MdDelete onClick={()=>onDelete(item._id)} className='deleteIcon' />
                                </div>  }
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
