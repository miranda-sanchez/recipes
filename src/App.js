import React from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import RecipePage from "./pages/RecipePage";
import About from "./pages/About";
import LetsTalk from "./pages/LetsTalk";
import Missing from "./pages/Missing";
import Footer from "./components/Footer";

function App() {
  const title = "Gourmet Galore";
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route index exact path="/" element={<Home title={title} />} />
        <Route
          path="/recipes/:categoryName/:recipeId"
          element={<RecipePage />}
        />
        <Route path="/about" element={<About />}></Route>
        <Route path="/lets-talk" element={<LetsTalk />}></Route>
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
