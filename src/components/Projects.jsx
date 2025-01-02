import React, { useEffect, useState } from "react";
import { useLanguage } from '../contexts/LanguageContext';

const Projects = () => {
    const [projectsData, setProjectsData] = useState(null);
    const { language } = useLanguage();

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
                setProjectsData(data[language]);
            })
            .catch((error) => console.error("Error fetching projects data:", error));
    }, [language]);

    if (!projectsData) {
        return
    }

    return (
        <div className="projects-container bg-yellw dark:bg-d-bg h-[999px] flex flex-col items-center justify-center overflow-hidden">
            <h1 className="text-[48px] font-bold text-bl dark:text-yellw leading-[48px] mb-12 -ml-[785px] ">
                {projectsData.h1}
            </h1>
            <div className="flex flex-col gap-16 items-center">
                {projectsData.projects.map((project, index) => (
                    <div
                        key={index}
                        className="project-card bg-whit dark:bg-[#2B2727] shadow-lg rounded-[12px] overflow-hidden w-[960px] h-[360px] flex items-start "
                    >
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-[340px] h-full object-cover"
                        />
                        <div className="p-12 flex flex-col gap-4 flex-grow">
                            <h2 className="text-[32px] font-bold text-[#4338CA] dark:text-[#C1BAED] leading-[32px]">
                                {project.title}
                            </h2>
                            <p className="text-[#383838] dark:text-whit text-[16px] font-normal leading-[20px]">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="px-5 py-2 bg-bl dark:bg-[#8173DA] text-whit text-[14px] font-medium rounded-[23px] "
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-4 mt-auto">
                                <a
                                    href={project.viewSite}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline text-[#120B39] dark:text-yellw text-[16px] "
                                >
                                    View Site
                                </a>
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline text-[#120B39] dark:text-yellw text-[16px]"
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
