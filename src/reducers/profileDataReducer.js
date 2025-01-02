// profileDataReducer.js
const profileDataReducer = (state, action) => {
    switch (action.type) {
        case "SET_PROFILE_DATA":
            return { ...state, profileData: action.payload };
        default:
            return state;
    }
};

export default profileDataReducer;
