import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditRecipe = () => {

    // ✅ FIX 1: Give every input an initial value
    const [recipeData, setRecipeData] = useState({
        title: "",
        ingredients: "",
        instructions: "",
        time: ""
    });

    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { id } = useParams();


    // Get existing recipe
    useEffect(() => {

        const getData = async () => {

            try {

                const response = await axios.get(
                    `http://localhost:5000/recipe/${id}`
                );

                const res = response.data;

                // ✅ FIX 2: Don't use res.ingredients.join(",")
                setRecipeData({
                    title: res.title || "",
                    ingredients: res.ingredients || "",
                    instructions: res.instructions || "",
                    time: res.time || ""
                });

            } catch (err) {

                console.log(err);

                setError("Unable to load recipe");

            }

        };

        getData();

    }, [id]);


    // Handle input changes
    const onHandleChange = (e) => {

        const { name, value } = e.target;

        setRecipeData(prev => ({
            ...prev,
            [name]: value
        }));

        setError("");
    };


    // Submit updated recipe
    const onHandleSubmit = async (e) => {

        e.preventDefault();

        try {

            // ✅ FIX 3: Send normal JSON
            await axios.put(
                `http://localhost:5000/recipe/${id}`,
                recipeData,
                {
                    headers: {
                        authorization:
                            "bearer " + localStorage.getItem("token")
                    }
                }
            );

            navigate("/myRecipe");

        } catch (err) {

            console.log(err);

            setError(
                err.response?.data?.message ||
                "Unable to update recipe. Please try again."
            );
        }
    };


    return (
        <div className="container">

            <form
                className="form"
                onSubmit={onHandleSubmit}
            >

                {/* TITLE */}
                <div className="form-control">

                    <label>Title</label>

                    <input
                        type="text"
                        className="input"
                        name="title"
                        value={recipeData.title}
                        onChange={onHandleChange}
                    />

                </div>


                {/* TIME */}
                <div className="form-control">

                    <label>Time</label>

                    <input
                        type="text"
                        className="input"
                        name="time"
                        value={recipeData.time}
                        onChange={onHandleChange}
                    />

                </div>


                {/* INGREDIENTS */}
                <div className="form-control">

                    <label>Ingredients</label>

                    <textarea
                        className="input"
                        name="ingredients"
                        rows="5"
                        value={recipeData.ingredients}
                        onChange={onHandleChange}
                    />

                </div>


                {/* INSTRUCTIONS */}
                <div className="form-control">

                    <label>Instructions</label>

                    <textarea
                        className="input"
                        name="instructions"
                        rows="5"
                        value={recipeData.instructions}
                        onChange={onHandleChange}
                    />

                </div>


                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}


                <button type="submit">
                    Edit Recipe
                </button>

            </form>

        </div>
    );
};

export default EditRecipe;