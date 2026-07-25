

const AddFoodRecipe = () => {
  return (
    <>
      <div className="container">
        <form className="form">
            <div className="form-control">
                <label>Title</label>
                <input type="text" className="input" name="title"/>
            </div>
            <div className="form-control">
                <label>Time</label>
                <input type="text" className="input" name="time"/>
            </div>
            <div className="form-control">
                <label>Ingredients</label>
                <textarea type="text" className="input" name="ingredients" rows="5"/>
            </div>
            <div className="form-control">
                <label>Intructions</label>
                <textarea type="text" className="input" name="intsructions" rows="5"/>
            </div>
            <div className="form-control">
                <label>Recipe Image</label>
                <textarea type="file" className="input" name="file" />
            </div>
            <button type="submit">Add Recipe</button>
        </form>
      </div>
    </>
  )
}

export default AddFoodRecipe
