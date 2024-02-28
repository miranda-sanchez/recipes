import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import mealDBAPI from "../api/api";

const RecipePage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await mealDBAPI.get(`/lookup.php?i=${recipeId}`);
        const { meals } = response.data;
        setRecipe(meals[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  // Formating instructions
  const formatInstructions = (instructions) => {
    const formattedInstructions = instructions.replace(/\n/g, ". ");
    const sentences = formattedInstructions.split(/\. /);
    // Filter out empty sentences and map each sentence to a paragraph
    return sentences
      .filter((sentence) => sentence.trim() !== "")
      .map((sentence, index) => <p key={index}>{sentence.trim()}.</p>);
  };

  //Rendering ingredients
  const renderIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && measure) {
        ingredients.push(
          <li key={i}>
            {measure} {ingredient}
          </li>
        );
      }
    }
    return ingredients;
  };

  return (
    <main className="RecipePage">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>{recipe.strMeal}</h1>
          <div className="ingredients-container">
            <section className="ingredients">
              <h3>Ingredients</h3>
              <ul>{renderIngredients()}</ul>
            </section>
          </div>
          <section className="instructions">
            <h3>Instructions</h3>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <div>{formatInstructions(recipe.strInstructions)}</div>
          </section>
        </>
      )}
    </main>
  );
};

export default RecipePage;
