const initialState = {
    user: {},
}

// const userData = JSON.parse(localStorage.getItem("user"));
// let user = {};
// if (userData) {
//   user = userData;
// }
// const initialState = {
//   user: {}
// };

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                user: action.payload,
            };
        case "LOGIN_ERROR":
            return initialState;
        default:
            return state;
    }
}