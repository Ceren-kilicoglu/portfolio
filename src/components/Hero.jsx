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
    <div className="hero-container flex overflow-hidden" >
      <div className="hero-blue-section  h-[671px] w-[1550px] bg-bl dark:bg-d-bl">
        {/* Profile  */}
        <div className="hero-name-section w-[960px] h-[72px] absolute top-[37px] left-[280px]">
          <h2 className="hero-name  text-[32px] leading-[72px] text-yellw font-bold">
            {profile.name}
          </h2>
        </div>
        <div className="hero-content w-[955px] h-[375.89px] absolute top-[148px] left-[280px] flex justify-between">
          <div className="hero-content-left pt-24">
            <h1 className="hero-title w-[528.88px] h-[118px] text-yellw text-[54px] leading-[59.4px] font-bold">
              {profile.title}
            </h1>
            <p className="hero-description pt-8 w-[528.88px] h-[58px] font-normal text-[24px] leading-[29.05px] text-white dark:text-gray-300">
              {profile.description}
            </p>
            <div className="button-group flex gap-[10px] pt-16">
              <button
                id="github"
                type="button"
                onClick={() => window.open(buttons.github.link, "_blank")}
                className="social-button bg-white dark:bg-gray-800 dark:border-whit dark:border-[1px] text-xl text-dark-bl dark:text-gray-300 font-medium pt-3 pr-5 pb-3 pl-3 rounded shadow hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                <FontAwesomeIcon icon={faGithub} size="lg" />
                <span className="pl-3">{buttons.github.text}</span>
              </button>
              <button
                id="linkedin"
                type="button"
                onClick={() => window.open(buttons.linkedin.link, "_blank")}
                className="social-button bg-white dark:bg-gray-800 dark:border-whit dark:border-[1px] text-xl text-dark-bl dark:text-gray-300 font-medium pt-3 pr-5 pb-3 pl-3 rounded shadow hover:bg-gray-100 dark:hover:bg-gray-900 "
              >
                <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
                <span className="pl-3">{buttons.linkedin.text}</span>
              </button>
            </div>
          </div>
          <div className="pl-[50px]">
            <img
              src={profile.image}
              alt="Hero"
              className="hero-image h-[375.89px] w-[350px] rounded-[18px] object-cover"
            />
          </div>
        </div>
      </div>

      <div className="green-container h-[671px] w-[710px] left-[1008px] bg-yellw dark:bg-d-bg">
        <div className="flex ">
          {/* Language Button */}
          <button
            onClick={toggleLanguage}
            className="language-toggle w-fit border-none cursor-pointer absolute left-[890px] top-[35px] font-semibold text-[15px] leading-[18.15px]"
          >
            {language === "en" ? (
              <span>
                <span
                  className={darkMode ? "text-[#8F88FF]" : "text-[#CBF281]"}
                >
                  TÜRKÇE
                </span>
                <span
                  className={darkMode ? "text-[#777777]" : "text-[#D9D9D9]"}
                >
                  &apos;YE GEÇ
                </span>
              </span>
            ) : (
              <span>
                <span
                  className={darkMode ? "text-[#777777]" : "text-[#D9D9D9]"}
                >
                  GO
                </span>
                <span
                  className={darkMode ? "text-[#8F88FF]" : "text-[#CBF281]"}
                >
                  {" "}
                  ENGLISH
                </span>
              </span>
            )}
          </button>
          {/* Theme Button */}
          <div className="theme-switch flex items-center space-x-3 absolute right-[295px] top-[32px]">
            <button
              className="theme-toggle w-[55px] h-[24px] bg-[#8F88FF] dark:bg-[#3A3A3A] rounded-full flex items-center p-1"
              onClick={toggleDarkMode}
            >
              <div
                className={`theme-indicator w-4 h-4 bg-[#FFE86E] dark:[#FFE86E] rounded-full transition-transform duration-300 ease-in-out transform ${darkMode ? "translate-x-0 rotate-[180deg]" : "translate-x-[31px] rotate-0"}`}
              ></div>
            </button>
            <p className="text-[#4731D3] dark:text-[#D9D9D9] font-semibold text-[15px] leading-[18.15px]">
              {darkMode ? "LIGHT MODE" : darkModeToggle.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
