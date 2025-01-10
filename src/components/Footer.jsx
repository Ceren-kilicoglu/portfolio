import React, { useEffect, useReducer } from 'react';
import { useLanguage } from '../contexts/LanguageContext';


const footerDataReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FOOTER_DATA':
            return { ...state, contactData: action.payload };
        default:
            return state;
    }
};

const Footer = () => {
    const { language } = useLanguage();

    const [state, dispatch] = useReducer(footerDataReducer, { contactData: null });

    useEffect(() => {
        fetch("/footer.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Data fetched successfully:", data);
                dispatch({ type: 'SET_FOOTER_DATA', payload: data[language] });
            })
            .catch((error) => console.error("Error fetching footer data:", error));
    }, [language]);

    if (!state.contactData) {
        return
    }

    const { heading, prompt, email, } = state.contactData;



    return (
        <div className='bg-[#F9F9F9] dark:bg-[#252128] overflow-hidden flex flex-col items-center justify-start  px-12 sm:px-8 py-12'>
            <div className='flex flex-col flex-grow gap-8 sm:gap-6 md:gap-4 lg:gap-6 items-center text-center h-[250px] w-full sm:w-[500px] md:w-[700px] lg:w-[960px]'>
                <h1 className='text-bl dark:text-vio font-bold w-[350px] sm:w-[450px] text-[34px] sm:text-[40px] md:text-[44px] lg:text-[48px] lg:w-[500px]  '>
                    {heading}
                </h1>
                <p className='text-b dark:text-whit font-medium text-[15px] w-[300px] sm:w-[350px] md:w-[450px] leading-[22px] w-[225px]  sm:text-[17px] sm:w-[300px] sm:leading-[24px] md:text-[18px] md:leading-[25px] md:w-[375px] lg:text-[22px] lg:w-[450px] lg:leading-[29.05px]'>
                    {prompt}
                </p>
                <p className='text-vio dark:text-vio font-medium underline text-[15px] sm:text-[20px] lg:text-[20px] leading-[24.2px] '>
                    {email}
                </p>
            </div>
        </div>



    );
};

export default Footer;
