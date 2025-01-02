// projectsDataReducer.js
const projectsDataReducer = (state, action) => {
    switch (action.type) {
        case "SET_PROJECTS_DATA":
            return { ...state, projectsData: action.payload };
        default:
            return state;
    }
};

export default projectsDataReducer;
