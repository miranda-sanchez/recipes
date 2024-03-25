import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaSearch, FaSearchPlus } from "react-icons/fa";
import mealDBAPI from "../api/api";
import useWindowSize from "../hooks/useWindowSize";

const Home = ({ title }) => {
  const { categoryName } = useParams();

  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  //Handling filter options
  const [accordionOpen, setAccordionOpen] = useState(false);

  //Handling .hero transition
  const [isSearchActive, setIsSearchActive] = useState(false);

  const { width } = useWindowSize();
  const heroHeight = isSearchActive
    ? 200
    : width >= 1200
    ? 500
    : width >= 992
    ? 400
    : 320;

  const handleSearchFocus = () => {
    setIsSearchActive(true);
  };

  const handleSearchBlur = () => {
    setIsSearchActive(false);
  };

  const fetchRecipesByCategory = async (category) => {
    try {
      const response = await mealDBAPI.get(`/filter.php?c=${category}`);
      const { meals } = response.data;
      setRecipes(meals);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const fetchRecipesByArea = async (area) => {
    try {
      const response = await mealDBAPI.get(`/filter.php?a=${area}`);
      const { meals } = response.data;
      setRecipes(meals);
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
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await mealDBAPI.get("/list.php?a=list");
        const { meals } = response.data;
        setAreas(meals.map((meal) => meal.strArea));
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };

    fetchAreas();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await mealDBAPI.get(`/search.php?s=${search}`);
        const { meals } = response.data;
        setRecipes(meals);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [search]);

  // Function to toggle .accordion visibility
  const toggleAccordion = () => {
    setAccordionOpen(!accordionOpen);
  };

  return (
    <main className="Home">
      <section
        className={`hero ${isSearchActive ? "hero-active" : ""}`}
        style={{ height: `${heroHeight}px` }}
      >
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
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
          />
          <button className="btn btn-outline-success btn-action" type="submit">
            <FaSearch />
          </button>
        </form>
      </section>

      <h1>{title}</h1>
      <h2>Recipes</h2>
      <button className="filter-btn" onClick={toggleAccordion}>
        Filter <FaSearchPlus />
      </button>
      <section className="main-container">
        <div
          className={`accordion ${accordionOpen ? "open" : ""}`}
          style={{
            display: width < 768 ? (accordionOpen ? "block" : "none") : "block",
          }}
        >
          <div className="accordion-item categories">
            <h3 className="accordion-header" id="categoriesHeader">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#categoriesCollapse"
                aria-expanded="true"
                aria-controls="categoriesCollapse"
              >
                Categories
              </button>
            </h3>
            <ul
              id="categoriesCollapse"
              className="accordion-collapse collapse categories-list"
              aria-labelledby="categoriesHeader"
              data-bs-parent="#accordionExample"
            >
              {categories.map((category) => (
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
          {/* Area Filter */}
          <div className="accordion-item area">
            <h3 className="accordion-header" id="areaHeader">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#areaCollapse"
                aria-expanded="true"
                aria-controls="areaCollapse"
              >
                Areas
              </button>
            </h3>
            <ul
              id="areaCollapse"
              className="accordion-collapse collapse area-list"
              aria-labelledby="areaHeader"
              data-bs-parent="#accordionExample"
            >
              {areas.map((area) => (
                <li key={area}>
                  <button
                    onClick={() => {
                      fetchRecipesByArea(area);
                    }}
                  >
                    {area}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="recipes">
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
    </main>
  );
};

export default Home;
