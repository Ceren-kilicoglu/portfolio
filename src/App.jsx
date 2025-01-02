import React from "react";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Profile from "./components/Profile";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { LanguageProvider } from "./contexts/LanguageContext";

function App() {
  return (
    <DarkModeProvider>
      <LanguageProvider>
        <Hero />
        <Skills />
        <Profile />
        <Projects />
        <Footer />
      </LanguageProvider>
    </DarkModeProvider>
  );
}

export default App;