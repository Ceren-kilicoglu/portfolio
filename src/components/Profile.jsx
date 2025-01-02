import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const { language } = useLanguage();

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
                setProfileData(data[language]);
            })
            .catch((error) => console.error("Error fetching profile data:", error));
    }, [language]);

    if (!profileData) {
        return
    }

    const { profile, aboutMe, image } = profileData;

    return (
        <div className='profile-container bg-bl dark:bg-d-bl h-[552px] overflow-hidden '>
            <div className='profile-text w-[156px] h-[48px] absolute left-[280px] top-[1400px] '>
                <h1 className='text-yellw font-semibold text-[48px]  leading-[48px]   '>{profile.title}</h1>
            </div>
            <div className='profile-info w-[960px] h[290.68px] flex gap-[35px] absolute top-[1490px] left-[280px]'>
                <div className='w-[300px] h[290.68px]  flex flex-col gap-[35px] '>
                    <h2 className='w-[300px] h-[28px] text-[#FFFFFF] text-medium text-[30px] leading-[28px]'>{profile.subtitle}</h2>
                    <div className='flex '>

                        <div className={`text-yellw font-semibold text-[16px] leading-[24px] flex flex-col gap-[24px] ${language === "tr" ? 'w-[120px] h-[222px]' : 'w-[105px] h-[222px]'}`}>


                            <p>{profile.labels.birth}:</p>
                            <p>{profile.labels.residence}:</p>
                            <p>{profile.labels.education}:</p>
                            <p>{profile.labels.preferredRole}:</p>
                        </div>

                        <div className={`w-[189px] h-[222px] text-whit font-normal text-[16px]  flex flex-col  ${language === "tr" ? "gap-[24px] leading-[24px]" : "gap-[25px] leading-[24px]"}`}>
                            <p>{profile.details.birth}</p>
                            <p>{profile.details.residence}</p>
                            <p className='leading-[24px]'>{profile.details.education}</p>
                            <p>{profile.details.preferredRole}</p>
                        </div>
                    </div>

                </div>
                <div >
                    <img className='rounded-[10px] w-[300px] h-[290.68px] object-cover ' src={image} alt="Profile" />
                </div>
                <div className=' w-[300px] h-[290.68px] flex flex-col gap-[100px]'>
                    <h2 className="w-[300px] h-[25px] text-[#FFFFFF] font-medium text-[30px] leading-[30px]">{aboutMe.title}</h2>
                    <p className='w-[300px] h-[241.68px] text-[#FFFFFF]  font-normal text-[18px] leading-[27px]'>{aboutMe.description}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
