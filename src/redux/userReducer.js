// Parsing user data from localStorage
const userData = JSON.parse(localStorage.getItem("user"));
let user = {};
// Checking if user data exists
if (userData) {
    user = userData;
}

// Initial state for user reducer
const initialState = {
    user: {}
};

// User reducer function
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        // Action dispatched on successful login
        case "LOGIN_SUCCESS":
            return {
                ...state,
                user: action.payload,
            };
        // Action dispatched on login error
        case "LOGIN_ERROR":
            return initialState;
        // Default case for other actions
        default:
            return state;
    }
}
