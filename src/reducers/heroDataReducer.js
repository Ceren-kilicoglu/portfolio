const heroDataReducer = (state, action) => {
    switch (action.type) {
        case "SET_HERO_DATA":
            return { ...state, data: action.payload };
        default:
            return state;
    }
};

export default heroDataReducer;
