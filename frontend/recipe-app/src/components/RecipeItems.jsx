import { Link, useLoaderData } from "react-router-dom";
import { BsFillStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

function RecipeItems() {
  const recipes = useLoaderData();

  const [allRecipes, setAllRecipes] = useState([]);

  let path = window.location.pathname === "/myRecipe" ? true : false;

  console.log(allRecipes);

  useEffect(() => {
    setAllRecipes(recipes);
  }, [recipes]);

  // DELETE RECIPE
  const onDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/recipe/${id}`);

      console.log(response.data);

      // Remove deleted recipe from screen
      setAllRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe._id !== id),
      );
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
    }
  };

  return (
    <>
      <div className="card-container">
        {allRecipes?.map((item, index) => {
          return (
            <div key={item._id} className="card">
              <img
                src={`http://localhost:5000/images/${item.coverImage}`}
                alt={item.title}
                width="120px"
                height="100px"
              />

              <div className="card-body">
                <div className="title">{item.title}</div>

                <div className="icons">
                  <div className="timmer">
                    <BsFillStopwatchFill />
                    {item.time}
                  </div>

                  {!path ? (
                    <FaHeart />
                  ) : (
                    <div className="action">
                      <Link to={`/editRecipe/${item._id}`} className="editIcon">
                        <FaEdit />
                      </Link>

                      <MdDelete
                        onClick={() => onDelete(item._id)}
                        className="deleteIcon"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default RecipeItems;
