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

    const { profile, aboutMe } = state.profileData;

    return (

        <div className='profile-container bg-bl dark:bg-d-bl overflow-hidden h-full flex flex-col items-center justify-center  px-12 sm:px-8 py-12  '>
            <div className="w-full sm:w-[500px] md:w-[700px] lg:w-[960px] mb-8 ">
                <div className='profile-text'>
                    <h1 className='text-yellw  font-bold text-[34px]  leading-[48px] w-[150px] text-left sm:text-[38px] sm:leading-[44px] sm:w-[295px] md:text-[44px] md:leading-[51px] md:w-[350px]  lg:text-[54px] lg:w-[530px] lg:leading-[59.4px] mb-8'>
                        {profile.title}
                    </h1>
                </div>
                <div className='profile-info flex flex-col lg:flex-row gap-8 lg:gap-16 w-full sm:w-[500px] md:w-[700px] lg:w-[960px] mx-auto'>
                    <div className='flex flex-col sm:flex-col md:flex-row lg:flex-row gap-8 lg:gap-16 w-full'>
                        <div className='flex flex-col  gap-4 lg:gap-6 w-full lg:w-1/3'>
                            <h2 className=' text-whit font-semibold text-[15px]  leading-[22px] w-[225px] text-left sm:text-[19px] sm:w-[300px] sm:leading-[24px] md:text-[20px] md:leading-[25px] md:w-[390px] lg:text-[24px] lg:w-[575px] lg:leading-[29.05px]'>
                                {profile.subtitle}
                            </h2>
                            <div className='flex gap-4 lg:gap-6 items-start'>
                                <div className={`text-yellw font-semibold text-[16px] sm:text-[16px] sm:leading-[26px] md:text-[16px] md:leading-[19px]  lg:text-[17px] lg:leading-[19px]  flex flex-col gap-[24px] ${language === "tr" ? 'w-[110px] h-[222px]' : 'w-[150px] h-[222px]'}`}>
                                    <p>{profile.labels.birth}</p>
                                    <p>{profile.labels.residence}</p>
                                    <p>{profile.labels.education}</p>
                                    <p>{profile.labels.preferredRole}</p>
                                </div>
                                <div className={`w-[200px] h-[250px] text-whit font-normal text-[16px] sm:text-[16px] sm:leading-[25.5px] md:text-[16px] md:leading-[19px] lg:text-[17px] lg:leading-[19px]  flex flex-col ${language === "tr" ? "gap-[24px] leading-[24px]" : "gap-[25px] leading-[28px]"}`}>
                                    <p>{profile.details.birth}</p>
                                    <p>{profile.details.residence}</p>
                                    <p>{profile.details.education}</p>
                                    <p>{profile.details.preferredRole}</p>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-4  md:ml-[-45px] lg:ml-0'>
                            <h2 className="text-whit font-semibold text-[15px]  leading-[22px] w-[225px] text-left sm:text-[19px]  sm:leading-[24px] md:text-[20px] md:leading-[25px] md:w-[390px] lg:text-[24px] lg:w-[575px] lg:leading-[29.05px]">
                                {aboutMe.title}
                            </h2>
                            <p className='text-whit font-normal text-[16px] sm:text-[16px] sm:w-[475px] sm:leading-[23px]  md:text-[15.5px] md:w-[345px] md:leading-[22px] lg:text-[17px] lg:leading-[28px]  lg:w-[500px]'>
                                {aboutMe.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    );
};

export default Profile;

