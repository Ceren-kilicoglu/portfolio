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
        return
    }

    const { profile, aboutMe } = state.profileData;

    return (

        <section className='profile-container bg-bl dark:bg-d-bl overflow-hidden flex flex-col items-center justify-start overflow-hidden px-12 sm:px-8 py-12 '>
            <section className="w-full sm:w-[500px] md:w-[700px] lg:w-[960px]  ">
                <div className='profile-text'>
                    <h1 className='text-yellw  font-bold text-[34px]  leading-[48px] w-[150px] text-left sm:text-[38px] sm:leading-[44px] sm:w-[295px] md:text-[44px] md:leading-[51px] md:w-[350px]  lg:text-[54px] lg:w-[530px] lg:leading-[59.4px] mb-8'>
                        {profile.title}
                    </h1>
                </div>
                <div className='profile-info flex flex-col lg:flex-row gap-8 lg:gap-16 w-full sm:w-[500px] md:w-[700px] lg:w-[960px] mx-auto'>
                    <div className='flex flex-col sm:flex-col md:flex-row lg:flex-row gap-8 lg:gap-16 w-full'>
                        <div className="w-full lg:w-1/3 ">
                            <h2 className="text-whit font-semibold text-[22px] leading-[25px] sm:text-[25px] lg:text-[28px] lg:leading-[30px] mb-6">
                                {profile.subtitle}
                            </h2>

                            <div className="space-y-7">
                                {/* Birth Information */}
                                <div className="bg-gradient-to-r from-pink-300 to-purple-500 dark:from-blue-900 dark:to-purple-1000 p-4 rounded-tl-[30px] rounded-br-[30px] shadow-lg hover:scale-105 transition-all">
                                    <p className="text-yellw font-semibold text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px] " >{profile.labels.birth}</p>
                                    <p className="text-whit font-semibold text-[14px] sm:text-[15px] md:text-[15px] lg:text-[15px]  mt-2">{profile.details.birth}</p>
                                </div>

                                {/* Residence */}
                                <div className="bg-gradient-to-r from-rose-400 to-fuchsia-500 dark:from-green-800 to-blue-800 p-4 rounded-tl-[30px] rounded-br-[30px] shadow-lg hover:scale-105 transition-all">
                                    <p className="text-yellw font-semibold text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px] ">{profile.labels.residence}</p>
                                    <p className="text-whit font-semibold text-[14px] sm:text-[15px] md:text-[15px] lg:text-[15px]  mt-2">{profile.details.residence}</p>
                                </div>

                                {/* Education */}
                                <div className="bg-gradient-to-r from-orange-400 to-pink-400 dark:from-pink-800 to-red-900 p-4 rounded-tl-[30px] rounded-br-[30px] shadow-lg hover:scale-105 transition-all">
                                    <p className="text-yellw font-semibold text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px] ">{profile.labels.education}</p>
                                    <p className="text-whit font-semibold text-[14px] sm:text-[16px] md:text-[15px] lg:text-[15px]  mt-2">{profile.details.education}</p>
                                </div>

                                {/* Preferred Role */}
                                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 dark:from-teal-800 to-green-900 p-4 rounded-tl-[30px] rounded-br-[30px] shadow-lg hover:scale-105 transition-all">
                                    <p className="text-yellw font-semibold text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px] ">{profile.labels.preferredRole}</p>
                                    <p className="text-whit font-semibold text-[14px] sm:text-[14px] md:text-[15px] lg:text-[15px]  mt-2">{profile.details.preferredRole}</p>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-6  lg:ml-0 '>
                            <h2 className="text-whit font-semibold  text-[18px]  leading-[22px] w-[225px] text-left sm:text-[20px] sm:w-[300px] sm:leading-[24px] md:text-[22px] md:leading-[25px] md:w-[390px] lg:text-[25px] lg:w-[575px] lg:leading-[29.05px]">
                                {aboutMe.title}
                            </h2>
                            <p className='text-whit font-normal text-[15px] sm:text-[16px] sm:w-[475px] sm:leading-[23px]  md:text-[16px] md:w-[345px] md:leading-[22px] lg:text-[18px] lg:leading-[28px]  lg:w-[500px]  '>
                                {aboutMe.description}
                            </p>
                            <p className='text-whit font-normal text-[15px] sm:text-[16px] sm:w-[475px] sm:leading-[23px]  md:text-[16px] md:w-[345px] md:leading-[22px] lg:text-[18px] lg:leading-[28px]  lg:w-[500px]  '>
                                {aboutMe.descriptiontwo}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </section>



    );
};

export default Profile;

