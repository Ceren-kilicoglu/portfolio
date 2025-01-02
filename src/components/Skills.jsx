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
        <div className="skills-container bg-[#F9F9F9] dark:bg-[#252128] h-[671px] overflow-hidden">
            <div className="flex justify-between w-[1000px] h-[430px] absolute top-[755px] left-[280px]">
                <h2 className="w-[128px] h-[58px] text-[#4832D3] dark:text-yellow font-bold text-[48px] leading-[58.09px]">
                    {state.data.title}
                </h2>
                <div className="grid grid-cols-2 flex justify-between gap-y-[35px] gap-x-[135px]">
                    {state.data.logos.map((logo) => (
                        <div key={logo.id} className="flex items-center gap-6">
                            <img
                                src={logo.logo}
                                alt={logo.name}
                                className="w-[120px] h-[120px] object-cover flex gap-6"
                            />
                            <p className="w-[146px] h-[36px] uppercase text-[#777777] dark:text-white font-medium text-[24px] leading-[36px]">
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
