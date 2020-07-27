import * as ActionTypes from '../ActionTypes';

export const User = (
    state = {
        isLoggedIn: false,
        jwt_token: null
    },
    action: any
) => {
    switch(action.type){
        case ActionTypes.LOGIN_ACTION:{
            console.log("set token: ", action.payload);
            
            return {...state, isLoggedIn: true, jwt_token: action.payload};
        }
            
        case ActionTypes.LOGOUT_ACTION:{
            console.log("logout");
            return {...state, isLoggedIn: false, jwt_token: null}
            
        }
           
        default:
            return state;
    }
}