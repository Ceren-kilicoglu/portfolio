import React, { useReducer, useEffect } from "react";
import { useLanguage } from '../contexts/LanguageContext';
import projectsDataReducer from "../reducers/projectsDataReducer";


const Projects = () => {
    const { language } = useLanguage();

    // useReducer ile state yönetimi
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
        <div className="projects-container bg-yellw dark:bg-d-bg min-h-screen sm:h-[800px] lg:h-[999px] flex flex-col items-center justify-center overflow-hidden px-4 sm:px-8">
            <h1 className="text-[48px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold text-bl dark:text-yellw leading-[24px] sm:leading-[32px] md:leading-[40px] lg:leading-[48px] mb-6 sm:mb-8 md:mb-10 lg:mb-12 lg:-ml-[785px] md:-ml-[550px] sm:-ml-[380px]  ">
                {state.projectsData.h1}
            </h1>
            <div className="flex flex-col gap-8 sm:gap-12 md:gap-14 lg:gap-16 items-center">
                {state.projectsData.projects.map((project, index) => (
                    <div
                        key={index}
                        className="project-card bg-whit dark:bg-[#2B2727] shadow-lg rounded-[12px] overflow-hidden w-full sm:w-[500px] md:w-[700px] lg:w-[960px] flex flex-col sm:flex-row items-start"
                    >
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full sm:w-[160px] md:w-[240px] lg:w-[340px] h-40 sm:h-full object-cover"
                        />
                        <div className="p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-4 flex-grow">
                            <h2 className="text-[16px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-bold text-[#4338CA] dark:text-[#C1BAED] leading-[16px] sm:leading-[24px] md:leading-[28px] lg:leading-[32px]">
                                {project.title}
                            </h2>
                            <p className="text-[#383838] dark:text-whit text-[12px] sm:text-[14px] md:text-[16px] lg:text-[16px] font-normal leading-[16px] md:leading-[18px] lg:leading-[20px]">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-1 sm:gap-2">
                                {project.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="px-2 sm:px-4 py-1 sm:py-2 bg-bl dark:bg-[#8173DA] text-whit text-[10px] sm:text-[12px] md:text-[14px] font-medium rounded-[12px] sm:rounded-[16px] md:rounded-[20px]"
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
