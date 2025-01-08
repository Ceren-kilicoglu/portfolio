import React, { useEffect, useReducer } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
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
        return null;
    }

    const { heading, prompt, email, socialIcons } = state.contactData;

    const iconMap = {
        faTwitter,
        faInstagram
    };

    return (
        <div className='  h-[454px] bg-[#F9F9F9] dark:bg-[#252128] relative overflow-hidden px-12  sm:px-8 py-12 '>
            <div className='max-w-[483px]  sm:w-[500px] md:w-[700px] lg:w-[960px] mb-8 h-[290px] absolute left-1/2 transform -translate-x-1/2 top-[80px] flex flex-col gap-[24px] text-center sm:text-left'>
                <h1 className='font-bold text-[36px] sm:text-[48px] lg:text-[48px] leading-[52px] sm:leading-[72px] text-[#4731D3] dark:text-[#8F88FF]'>
                    {heading}
                </h1>
                <p className='font-normal text-[18px] sm:text-[24px] lg:text-[24px] text-[#120B39] dark:text-whit text-center'>
                    {prompt}
                </p>
                <p className='font-medium text-[16px] sm:text-[20px] lg:text-[20px] leading-[24.2px] underline text-[#4731D3] dark:text-[#8F88FF] ml-0 sm:ml-[125px]'>
                    {email}
                </p>
                <div className='flex gap-[10px] sm:gap-[15px] justify-center sm:justify-start sm:ml-[175px]'>
                    {socialIcons.map((icon, index) => (
                        <a key={index} href={icon.link} target='_blank' rel='noopener noreferrer' className='w-[30px] sm:w-[35px] h-[30px] sm:h-[35px] text-[#4731D3] dark:text-[#8F88FF]'>
                            <FontAwesomeIcon icon={iconMap[icon.icon]} />
                        </a>
                    ))}
                </div>
            </div>
        </div>



    );
};

export default Footer;
