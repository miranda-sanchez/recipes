import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Recipes from "./components/Recipes";
import RecipePage from "./pages/RecipePage";
import Footer from "./components/Footer";
import mealDBAPI from "./api/api";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Obtaining all recipes
        const response = await mealDBAPI.get("/search.php?s=");
        const { meals } = response.data;
        setRecipes(meals);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const filteredResults = recipes.filter((recipe) =>
      recipe.strMeal.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults);
  }, [recipes, search]);

  return (
    <div className="App">
      <Header search={search} setSearch={setSearch} />
      <Nav />
      <Routes>
        <Route
          index
          path="/"
          element={<Home recipes={searchResults} search={search} />}
        />
        <Route
          path="/recipes/:categoryName"
          element={<Recipes search={search} />}
        />
        <Route
          path="/recipes/:categoryName/:recipeId"
          element={<RecipePage />}
        />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
