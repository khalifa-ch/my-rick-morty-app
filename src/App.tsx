import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CharactersPage from "./pages/CharactersPage";
import { AboutPage } from "./pages/AboutPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CharactersPage />} />
        <Route path="/about/:id" element={<AboutPage />} />
        {/* Page avec ID dynamique */}
      </Routes>
    </Router>
  );
};

export default App;
