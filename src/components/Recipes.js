import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import mealDBAPI from "../api/api";

const Recipes = ({ search }) => {
  const { categoryName } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipesByCategory = async () => {
      try {
        const response = await mealDBAPI.get(`/filter.php?c=${categoryName}`);
        const { meals } = response.data;
        setRecipes(meals);
        setFilteredRecipes(meals);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipesByCategory();
  }, [categoryName]);

  useEffect(() => {
    const filteredResults = recipes.filter((recipe) =>
      recipe.strMeal.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredRecipes(filteredResults);
  }, [recipes, search]);

  return (
    <main className="Recipes">
      <h2>{categoryName} Recipes</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {filteredRecipes.map((recipe) => (
            <li key={recipe.idMeal}>
              <Link to={`/recipes/${categoryName}/${recipe.idMeal}`}>
                {recipe.strMeal}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default Recipes;
