import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FaUtensils } from "react-icons/fa";
import mealDBAPI from "../api/api";

const RecipePage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

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

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
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
              <button
                className="ingredients-btn btn-action"
                onClick={openModal}
                title="ingredients"
              >
                <FaUtensils />
              </button>
              <h3>Ingredients</h3>
              <ul>{renderIngredients()}</ul>
            </section>
          </div>

          {/* Ingredients modal */}
          <div
            className={`modal ${modalOpen ? "show" : ""}`}
            tabIndex="-1"
            role="dialog"
            style={{ display: modalOpen ? "block" : "none" }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Ingredients</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={closeModal}
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <ul>{renderIngredients()}</ul>
                </div>
              </div>
            </div>
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
