// footerDataReducer.js
const footerDataReducer = (state, action) => {
    switch (action.type) {
        case "SET_CONTACT_DATA":
            return { ...state, contactData: action.payload };
        default:
            return state;
    }
};

export default footerDataReducer;
