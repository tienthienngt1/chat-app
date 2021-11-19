const stateInit = {
    user: [],
    isLogin: false,
}

const userReducer = (state = stateInit, action ) => {
    switch(action.type) {
        case "ADD_NEW_USER": {
            return;
        }
        case "IS_LOGIN" : {
            return {...state, isLogin: true};
        }

        default: return state
    }
}

export default userReducer;