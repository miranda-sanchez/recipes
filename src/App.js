import React from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import RecipePage from "./pages/RecipePage";
import Missing from "./pages/Missing";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route index exact path="/" element={<Home />} />
        <Route
          path="/recipes/:categoryName/:recipeId"
          element={<RecipePage />}
        />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
