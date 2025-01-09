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
        <div className="skills-container bg-[#F9F9F9] dark:bg-[#252128] flex flex-col items-center justify-start overflow-hidden px-12 sm:px-8 py-12">
            <div className="flex flex-col lg:flex-row items-start w-full sm:w-[500px] md:w-[700px] lg:w-[960px] lg:gap-6">
                <h2 className="text-bl  font-bold text-[34px]  leading-[48px] w-[150px] text-left sm:text-[38px] sm:leading-[44px] sm:w-[295px] md:text-[44px] md:leading-[51px] md:w-[350px]  lg:text-[54px] lg:w-[530px] lg:leading-[59.4px] mb-8">
                    {state.data.title}
                </h2>
                <div className="grid grid-cols-2 gap-8 sm:gap-12 lg:ml-[250px] md:gap-14 w-full sm:w-[500px] md:w-[700px] lg:w-[832px] lg:ml-[0px]">
                    {state.data.logos.map((logo) => (
                        <div key={logo.id} className="flex items-center gap-[3vw] sm:gap-[3vw] md:gap-[3vw] lg:gap-6">
                            <img
                                src={logo.logo}
                                alt={logo.name}
                                className="w-[17vw] h-[17vw] sm:w-[90px] sm:h-[90px] md:w-[100px] md:h-[100px] lg:w-[110px] lg:h-[110px] object-cover"
                            />
                            <p className="uppercase text-[#777777] dark:text-whit text-[2.9vw] sm:text-[15px] md:text-[18px] lg:text-[18px] font-medium leading-[5vw] sm:leading-[36px] md:leading-[36px] lg:leading-[36px]">
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
