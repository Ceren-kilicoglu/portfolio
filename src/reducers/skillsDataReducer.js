// skillsDataReducer.js
const skillsDataReducer = (state, action) => {
    switch (action.type) {
        case "SET_SKILLS_DATA":
            return { ...state, data: action.payload };
        default:
            return state;
    }
};

export default skillsDataReducer;
