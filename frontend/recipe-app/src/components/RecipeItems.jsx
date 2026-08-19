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

  // Get favorites from Local Storage
  const [favItems, setFavItems] = useState(
    JSON.parse(localStorage.getItem("fav")) ?? [],
  );

  const path = window.location.pathname === "/myRecipe";

  // Load recipes
  useEffect(() => {
    setAllRecipes(recipes);
  }, [recipes]);

  // =========================
  // DELETE RECIPE
  // =========================

  const onDelete = async (id) => {
    try {
      // Delete recipe from MongoDB
      const response = await axios.delete(`http://localhost:5000/recipe/${id}`);

      console.log(response.data);

      // Remove recipe from screen
      setAllRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => String(recipe._id) !== String(id)),
      );

      // Remove deleted recipe from favorites
      const updatedFavorites = favItems.filter(
        (recipe) => String(recipe._id) !== String(id),
      );

      // Update React state
      setFavItems(updatedFavorites);

      // Update Local Storage
      localStorage.setItem("fav", JSON.stringify(updatedFavorites));
    } catch (error) {
      console.log("DELETE ERROR:", error);

      console.log("SERVER ERROR:", error.response?.data);
    }
  };

  // =========================
  // ADD / REMOVE FAVORITE
  // =========================

  const favRecipe = (item) => {
    const alreadyFavorite = favItems.some(
      (recipe) => String(recipe._id) === String(item._id),
    );

    let updatedFavorites;

    if (alreadyFavorite) {
      // Remove from favorites
      updatedFavorites = favItems.filter(
        (recipe) => String(recipe._id) !== String(item._id),
      );
    } else {
      // Add to favorites
      updatedFavorites = [...favItems, item];
    }

    // Update React state
    setFavItems(updatedFavorites);

    // Update Local Storage
    localStorage.setItem("fav", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="card-container">
      {allRecipes?.map((item) => (
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
                // ❤️ FAVORITE
                <FaHeart
                  onClick={() => favRecipe(item)}
                  style={{
                    color: favItems.some(
                      (recipe) => String(recipe._id) === String(item._id),
                    )
                      ? "red"
                      : "",
                  }}
                />
              ) : (
                // EDIT + DELETE
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
      ))}
    </div>
  );
}

export default RecipeItems;
