import React, { useReducer, useEffect } from "react";
import { useLanguage } from '../contexts/LanguageContext';
import projectsDataReducer from "../reducers/projectsDataReducer";


const Projects = () => {
    const { language } = useLanguage();


    const [state, dispatch] = useReducer(projectsDataReducer, { projectsData: null });

    useEffect(() => {
        fetch("/projects.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Data fetched successfully:", data);
                dispatch({ type: "SET_PROJECTS_DATA", payload: data[language] });
            })
            .catch((error) => console.error("Error fetching projects data:", error));
    }, [language]);

    if (!state.projectsData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="projects-container bg-yellw dark:bg-d-bg overflow-hidden flex flex-col items-center justify-start  px-12 sm:px-8 py-12">
            {/* Başlık */}
            <h1 className="text-[28px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold text-bl dark:text-yellw leading-[32px] sm:leading-[40px] mb-4 sm:mb-6 md:mb-8 lg:mb-10  sm:mt-4 md:mt-6 lg:mt-8 text-left w-full sm:w-[500px] md:w-[700px] lg:w-[960px]">
                {state.projectsData.h1}
            </h1>

            {/* Projeler */}
            <div className="flex flex-col gap-8 sm:gap-12 md:gap-14 lg:gap-16 items-center w-full sm:w-[500px] md:w-[700px] lg:w-[960px] flex-grow">
                {state.projectsData.projects.map((project, index) => (
                    <div
                        key={index}
                        className="project-card bg-whit dark:bg-[#2B2727] shadow-lg rounded-[12px] overflow-hidden w-full sm:w-[500px] md:w-[700px] md:h-[350px]  lg:w-[950px] lg:h-[350px] flex flex-col sm:flex-row items-start"
                    >
                        {/* Resim */}
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-auto sm:w-[180px] md:w-[240px] lg:w-[340px] sm:h-[425px] md:h-[350px] lg:h-[400px] object-cover"
                        />

                        {/* Proje Detayları */}
                        <div className="p-4 sm:p-6 md:p-6 lg:p-8 flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-4 flex-grow  ">
                            <h2 className="text-bla dark:text-d-v font-bold text-[20px] sm:text-[24px] md:text-[26px] lg:text-[28px]  ">
                                {project.title}
                            </h2>
                            <p className="text-b dark:text-whit font-normal text-[15px] sm:text-[16px] md:text-[16px] lg:text-[18px]  leading-[22px] ">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-1 sm:gap-2">
                                {project.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="px-2 sm:px-4 py-1 sm:py-2 rounded-[22px] bg-bl dark:bg-[#8173DA] text-whit font-medium  text-[13px]  md:text-[15px] "
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2 sm:gap-3 md:gap-4 mt-auto">
                                <a
                                    href={project.viewSite}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline text-[#120B39] dark:text-yellw text-[14px] sm:text-[15px] md:text-[17px]"
                                >
                                    View Site
                                </a>
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline text-[#120B39] dark:text-yellw text-[14px] sm:text-[15px] md:text-[17px]"
                                >
                                    Github
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>



    );
};

export default Projects;
