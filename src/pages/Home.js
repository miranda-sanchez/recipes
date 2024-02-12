import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import mealDBAPI from "../api/api";

const Home = ({ search = "" }) => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <main className="Home">
      <h2>Categories</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="categories">
          {filteredCategories.map((category) => (
            <li key={category.idCategory}>
              <Link to={`/recipes/${category.strCategory}`}>
                {category.strCategory}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default Home;
