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
        <div className="projects-container bg-yellw dark:bg-d-bg flex flex-col items-center justify-start overflow-hidden px-12 sm:px-8 py-12">
            {/* Başlık */}
            <h1 className="text-[28px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold text-bl dark:text-yellw leading-[32px] sm:leading-[40px] mb-4 sm:mb-6 md:mb-8 lg:mb-10  sm:mt-4 md:mt-6 lg:mt-8 text-left w-full sm:w-[500px] md:w-[700px] lg:w-[960px]">
                {state.projectsData.h1}
            </h1>

            {/* Projeler */}
            <div className="flex flex-col gap-8 sm:gap-12 md:gap-14 lg:gap-16 items-center w-full sm:w-[500px] md:w-[700px] lg:w-[960px] flex-grow">
                {state.projectsData.projects.map((project, index) => (
                    <div
                        key={index}
                        className="project-card bg-whit dark:bg-[#2B2727] shadow-lg rounded-[12px] overflow-hidden w-full sm:w-[500px] md:w-[700px] lg:w-[950px] lg:h-[330px] flex flex-col sm:flex-row items-start"
                    >
                        {/* Resim */}
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-auto sm:w-[180px] md:w-[240px] lg:w-[340px] sm:h-[330px] md:h-[350px] lg:h-[400px] object-cover"
                        />

                        {/* Proje Detayları */}
                        <div className="p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-4 flex-grow  ">
                            <h2 className="text-[16px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-bold text-[#4338CA] dark:text-[#C1BAED] leading-[24px] sm:leading-[32px]">
                                {project.title}
                            </h2>
                            <p className="text-[#383838] dark:text-whit text-[12px] sm:text-[14px] md:text-[16px] lg:text-[16px] font-normal leading-[16px] md:leading-[18px] lg:leading-[20px]">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-1 sm:gap-2">
                                {project.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="px-2 sm:px-4 py-1 sm:py-2 bg-bl dark:bg-[#8173DA] text-whit text-[10px] sm:text-[12px] md:text-[14px] font-medium rounded-[12px] sm:rounded-[16px]"
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
                                    className="underline text-[#120B39] dark:text-yellw text-[12px] sm:text-[14px] md:text-[16px]"
                                >
                                    View Site
                                </a>
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline text-[#120B39] dark:text-yellw text-[12px] sm:text-[14px] md:text-[16px]"
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
