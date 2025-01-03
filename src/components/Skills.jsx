import React, { useReducer, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import skillsDataReducer from "../reducers/skillsDataReducer";


const Skills = () => {
    const { language } = useLanguage();


    const [state, dispatch] = useReducer(skillsDataReducer, { data: { title: "", logos: [] } });

    useEffect(() => {
        fetch("/logos.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((fetchedData) => {
                console.log("Data fetched successfully:", fetchedData);
                dispatch({ type: "SET_SKILLS_DATA", payload: fetchedData[language] });
            })
            .catch((error) => console.error("Error fetching logos data:", error));
    }, [language]);

    if (!state.data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="skills-container bg-[#F9F9F9] dark:bg-[#252128] flex flex-col items-center justify-start overflow-hidden px-4 sm:px-8 py-12">
            <div className="flex flex-col lg:flex-row items-start w-full sm:w-[500px] md:w-[700px] lg:w-[960px] lg:gap-6">
                <h2 className="text-[28px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#4832D3] dark:text-yellow leading-[32px] sm:leading-[40px] lg:leading-[58.09px] mb-4 sm:mb-6 md:mb-8 lg:mb-0 w-auto lg:w-[128px]">
                    {state.data.title}
                </h2>
                <div className="grid grid-cols-2 gap-8 sm:gap-12 lg:ml-[250px] md:gap-14 w-full sm:w-[500px] md:w-[700px] lg:w-[832px] lg:ml-[-20px]">
                    {state.data.logos.map((logo) => (
                        <div key={logo.id} className="flex items-center gap-[3vw] sm:gap-[3vw] md:gap-[3vw] lg:gap-6">
                            <img
                                src={logo.logo}
                                alt={logo.name}
                                className="w-[20vw] h-[20vw] sm:w-[15vw] sm:h-[15vw] md:w-[11vw] md:h-[11vw] lg:w-[120px] lg:h-[120px] object-cover"
                            />
                            <p className="uppercase text-[#777777] dark:text-white text-[4vw] sm:text-[3vw] md:text-[2vw] lg:text-[24px] font-medium leading-[5vw] sm:leading-[36px] md:leading-[36px] lg:leading-[36px]">
                                {logo.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>


    );
};

export default Skills;
