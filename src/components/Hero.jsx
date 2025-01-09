import React, { useReducer, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { useDarkMode } from "../contexts/DarkModeContext";
import { useLanguage } from "../contexts/LanguageContext";
import heroDataReducer from "../reducers/heroDataReducer";


const Hero = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { language, toggleLanguage } = useLanguage();


  const [state, dispatch] = useReducer(heroDataReducer, { data: null });

  useEffect(() => {
    fetch("/hero.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data fetched successfully:", data);
        dispatch({ type: "SET_HERO_DATA", payload: data[language] });
      })
      .catch((error) => console.error("Error fetching hero data:", error));
  }, [language]);

  if (!state.data) {
    return <div>Loading...</div>;
  }

  const { profile, buttons, darkModeToggle } = state.data;

  return (
    <div className="hero-container   dark:bg-[#051121] overflow-hidden h-full sm:h-[671px] flex flex-col items-center justify-center  px-12 sm:px-8 py-12">
      {/* Header Section with Language and Theme Toggle */}
      <header className="flex items-center  justify-end w-full sm:w-[500px] md:w-[700px] lg:w-[960px] mb-8 ">
        {/* Language Button */}
        <button onClick={toggleLanguage} className="language-toggle font-normal text-[10px]  sm:text-[13px]  md:text-[15px] ">
          {language === "en" ? (
            <span>
              <span className={darkMode ? "text-[#f0f7f7]" : "text-[]"}>
                TÜRKÇE
              </span>
              <span className={darkMode ? "text-[#c6f3f5]" : "text-[]"}>
                &apos;YE GEÇ
              </span>
            </span>
          ) : (
            <span>
              <span className={darkMode ? "text-[#c6f3f5]" : "text-[]"}>
                GO
              </span>
              <span className={darkMode ? "text-[#f0f7f7]" : "text-[]"}>
                ENGLISH
              </span>
            </span>
          )}
        </button>

        {/* Vertical Separator */}
        <span className="text-[#D9D9D9] px-2 ">|</span>

        {/* Theme Button */}
        <div className="theme-switch flex items-center gap-2">
          <button
            className="theme-toggle w-[55px] h-[24px] bg-[] dark:bg-[#1D3557] rounded-full flex items-center p-1"
            onClick={toggleDarkMode}
          >
            <div
              className={`theme-indicator w-4 h-4 bg-[] dark:bg-[#c6f3f5] rounded-full transition-transform duration-300 ease-in-out transform ${darkMode ? "translate-x-0 rotate-[180deg]" : "translate-x-[31px] rotate-0"}`}
            ></div>
          </button>
          <p className="text-[] dark:text-[#f0f7f7] font-normal text-[10px]  sm:text-[13px]  md:text-[15px] ">
            {darkMode ? "LIGHT MODE" : darkModeToggle.text}
          </p>
        </div>
      </header>

      <section className="hero-name flex flex-col flex-grow sm:flex-row items-start w-full sm:w-[500px] md:w-[700px] lg:w-[960px] mb-4 sm:mb-32 md:mb-24 lg:mb-24 flex-grow text-center sm:text-left relative">
        {/* Profil Adı */}
        <h2 className="hero-name text-blue dark:text-[#f0f7f7]  font-bold text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] mt-4 sm:mt-4 md:mt-8 lg:mt-4 sm:mt-0 z-10">
          {profile.name}
        </h2>
      </section>

      {/* Profile Section */}
      <section className="hero-profile flex flex-col items-center text-center  sm:flex-row  w-full sm:w-[500px] md:w-[700px] lg:w-[960px] mb-8 mt-[70px] sm:mt-[34px] flex-grow  sm:text-left">
        <div className="hero-text flex-1 sm:pr-6">
          {/* Profile Name */}

          {/* Profile Title */}
          <h1 className="hero-title  dark:text-[#f0f7f7] font-bold text-[34px]  leading-[48px] sm:text-[38px] sm:leading-[44px] sm:w-[295px] md:text-[44px] md:leading-[51px] md:w-[350px]  lg:text-[54px] lg:w-[530px] lg:leading-[59.4px] mb-8">
            {profile.title}
          </h1>

          {/* Profile Description */}
          <p className="hero-description dark:text-[#c6f3f5] font-normal text-[15px]  leading-[22px]  sm:text-[18.5px] sm:w-[300px] sm:leading-[24px] md:text-[20px] md:leading-[25px] md:w-[370px] lg:text-[24px] lg:w-[530px] lg:leading-[29.05px] ">
            {profile.description}
          </p>

          {/* Social Buttons */}
          <div className="button-group flex gap-8 mt-16 sm:mt-8 md:mt-8 lg:mt-12 justify-center sm:justify-start">
            <button
              id="github"
              type="button"
              onClick={() => window.open(buttons.github.link, "_blank")}
              className="social-button dark:text-[#c6f3f5]"
            >
              <FontAwesomeIcon icon={faGithub} size="xl" />
            </button>
            <button
              id="linkedin"
              type="button"
              onClick={() => window.open(buttons.linkedin.link, "_blank")}
              className="social-button dark:text-[#c6f3f5]"
            >
              <FontAwesomeIcon icon={faLinkedinIn} size="xl" />
            </button>
          </div>
        </div>

        {/* Profile Image */}
        <div className=" mt-16 w-[250px] md:mt-0 lg:mt-0 sm:w-[200px]  md:w-[300px] lg:w-[300px]">
          <img
            src={profile.image}
            alt="Hero"
            className="hero-image object-cover rounded-[22px] sm:rounded-[22px] md:rounded-[22px] h-[250px] sm:h-[200px]  md:h-[275px] lg:h-[300px]"
          />
        </div>
      </section>
    </div>


  );
};

export default Hero;
