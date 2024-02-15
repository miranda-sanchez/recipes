import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import mealDBAPI from "../api/api";

const Home = () => {
  const { categoryName } = useParams();
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchRecipesByCategory = async (category) => {
    try {
      setLoading(true);
      const response = await mealDBAPI.get(`/filter.php?c=${category}`);
      const { meals } = response.data;
      setRecipes(meals);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await mealDBAPI.get("/categories.php");
        const { categories } = response.data;
        setCategories(categories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const lowercasedSearch = search.toLowerCase();
    const filteredCategories = categories.filter((category) =>
      category.strCategory.toLowerCase().includes(lowercasedSearch)
    );

    setFilteredCategories(filteredCategories);
  }, [categories, search]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Obtaining recipes based on search term
        const response = await mealDBAPI.get(`/search.php?s=${search}`);
        const { meals } = response.data;
        setRecipes(meals);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [search]);

  return (
    <main className="Home">
      <section className="hero">
        <form
          className="d-flex"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            id="searchPosts"
            className="form-control me-2"
            type="text"
            placeholder="Search"
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-outline-success" type="submit">
            <FaSearch />
          </button>
        </form>
      </section>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <section className="main-container">
          <div className="categories">
            <h3>Categories</h3>
            <ul className="categories-list">
              {filteredCategories.map((category) => (
                <li key={category.idCategory}>
                  <button
                    onClick={() => fetchRecipesByCategory(category.strCategory)}
                  >
                    {category.strCategory}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="recipes">
            <h2>Recipes</h2>
            <ul className="recipes-list">
              {recipes.map((recipe) => (
                <li key={recipe.idMeal}>
                  <Link to={`/recipes/${categoryName}/${recipe.idMeal}`}>
                    <div className="recipe-item">
                      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                      <span>{recipe.strMeal}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
};

export default Home;
