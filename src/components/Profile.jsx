import React, { useReducer, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import profileDataReducer from '../reducers/profileDataReducer';


const Profile = () => {
    const { language } = useLanguage();


    const [state, dispatch] = useReducer(profileDataReducer, { profileData: null });

    useEffect(() => {
        fetch("/profile.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Data fetched successfully:", data);
                dispatch({ type: "SET_PROFILE_DATA", payload: data[language] });
            })
            .catch((error) => console.error("Error fetching profile data:", error));
    }, [language]);

    if (!state.profileData) {
        return <div>Loading...</div>;
    }

    const { profile, aboutMe, image } = state.profileData;

    return (

        <div className='profile-container bg-bl dark:bg-d-bl h-auto overflow-hidden px-12 sm:px-8 py-12'>
            <div className='profile-text w-full sm:w-[500px] md:w-[700px] lg:w-[960px] mx-auto mb-8'>
                <h1 className='text-yellw text-[20px] sm:text-[28px] md:text-[36px] lg:text-[40px] font-bold leading-[24px] sm:leading-[32px] mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-left'>
                    {profile.title}
                </h1>
            </div>
            <div className='profile-info flex flex-col lg:flex-row gap-8 lg:gap-16 w-full sm:w-[500px] md:w-[700px] lg:w-[960px] mx-auto'>
                <div className='flex flex-col sm:flex-row lg:flex-row gap-8 lg:gap-16 w-full'>
                    <div className='flex flex-col gap-4 lg:gap-6 w-full lg:w-1/3'>
                        <h2 className='text-[#FFFFFF] text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] font-medium leading-[28px] mb-4'>
                            {profile.subtitle}
                        </h2>
                        <div className='flex gap-4 lg:gap-6 items-start'>
                            <div className={`text-yellw font-semibold text-[16px] leading-[24px] flex flex-col gap-[24px] ${language === "tr" ? 'w-[120px] h-[222px]' : 'w-[105px] h-[222px]'}`}>
                                <p>{profile.labels.birth}</p>
                                <p>{profile.labels.residence}</p>
                                <p>{profile.labels.education}</p>
                                <p>{profile.labels.preferredRole}</p>
                            </div>
                            <div className={`w-[189px] h-[222px] text-whit font-normal text-[16px] flex flex-col ${language === "tr" ? "gap-[24px] leading-[24px]" : "gap-[25px] leading-[28px]"}`}>
                                <p>{profile.details.birth}</p>
                                <p>{profile.details.residence}</p>
                                <p className='leading-[24px]'>{profile.details.education}</p>
                                <p>{profile.details.preferredRole}</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col  gap-4 lg:gap-6 w-full lg:w-1/2'>
                        <h2 className="text-[#FFFFFF] font-medium text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] leading-[28px] mb-4">
                            {aboutMe.title}
                        </h2>
                        <p className='text-[#FFFFFF] font-normal text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] leading-[28px]'>
                            {aboutMe.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>



    );
};

export default Profile;

