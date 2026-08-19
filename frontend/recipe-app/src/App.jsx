import "./App.css";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainNavigation from "./components/MainNavigation";
import axios from "axios";
import AddFoodRecipe from "./pages/AddFoodRecipe";
import EditRecipe from "./pages/EditRecipe";

// =========================
// GET ALL RECIPES
// =========================

const getAllRecipe = async () => {
  try {
    const response = await axios.get("http://localhost:5000/recipe");

    return response.data;
  } catch (error) {
    console.log("GET RECIPES ERROR:", error);

    return [];
  }
};

// =========================
// GET MY RECIPES
// =========================

const getMyRecipe = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const allRecipe = await getAllRecipe();

  if (!user) {
    return [];
  }

  return allRecipe.filter(
    (item) => String(item.createdBy) === String(user._id),
  );
};

// =========================
// GET FAVORITE RECIPES
// =========================

const getFavRecipes = async () => {
  // Get favorites from localStorage
  const favItems = JSON.parse(localStorage.getItem("fav")) ?? [];

  // Get current recipes from MongoDB
  const allRecipes = await getAllRecipe();

  // Only keep favorites that still exist in MongoDB
  const validFavorites = favItems.filter((fav) =>
    allRecipes.some((recipe) => String(recipe._id) === String(fav._id)),
  );

  // Update localStorage
  localStorage.setItem("fav", JSON.stringify(validFavorites));

  // Return only valid favorites
  return validFavorites;
};

// =========================
// ROUTER
// =========================

const router = createBrowserRouter([
  {
    path: "/",

    element: <MainNavigation />,

    children: [
      {
        path: "/",
        element: <Home />,
        loader: getAllRecipe,
      },

      {
        path: "/myRecipe",
        element: <Home />,
        loader: getMyRecipe,
      },

      {
        path: "/favRecipe",
        element: <Home />,
        loader: getFavRecipes,
      },

      {
        path: "/addRecipe",
        element: <AddFoodRecipe />,
      },

      {
        path: "/editRecipe/:id",
        element: <EditRecipe />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
