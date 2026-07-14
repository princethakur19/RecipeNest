import React from 'react'
import foodRecipe from '../assets/foodRecipe.png'
import RecipeItems from '../components/RecipeItems'


function Home() {
  return (
    <>
      <section className='home'>
        <div className='left'>
            <h1>Food Recipe</h1>
            <h5>Good food lives here. Explore simple, mouthwatering recipes made with everyday ingredients. From quick weeknight dinners to sweet treats, we have your next meal covered.</h5>
            <button>Share your recipe</button>
        </div>
        <div className='right'>
            <img src={foodRecipe} width="320px" height="300px" />
        </div>
      </section>
      <div className="bg"></div>

      <div className='recipe'>
        <RecipeItems />
      </div>
    </>
  )
}

export default Home
