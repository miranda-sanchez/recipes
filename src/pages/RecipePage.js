import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
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

  return (
    <main className="RecipePage">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>{recipe.strMeal}</h2>
          <p>{recipe.strInstructions}</p>
          {/* Add more info */}
        </>
      )}
    </main>
  );
};

export default RecipePage;
