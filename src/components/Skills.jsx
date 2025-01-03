import React, { useReducer, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import skillsDataReducer from "../reducers/skillsDataReducer";


const Skills = () => {
    const { language } = useLanguage();

    // useReducer kullanarak state yönetimi
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
        <div className="skills-container bg-[#F9F9F9] dark:bg-[#252128] h-[450px] overflow-hidden">
            <div className="flex flex-col justify-between  h-[100px] absolute top-[725px] left-[5%]">
                <h2 className="w-[150px] h-[58px] text-[#4832D3] dark:text-yellow font-bold text-[28px] leading-[38px]">
                    {state.data.title}
                </h2>
                <div className="grid grid-cols-2 justify-between gap-y-[55px] gap-x-[25px] mt-8">
                    {state.data.logos.map((logo) => (
                        <div key={logo.id} className="flex items-center gap-2 ">
                            <img
                                src={logo.logo}
                                alt={logo.name}
                                className="w-[20vw] h-[20vw] object-cover"
                            />
                            <p className="w-[100px] h-[36px] uppercase text-[#777777] dark:text-white font-medium  leading-[38px] text-[4vw]">
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
