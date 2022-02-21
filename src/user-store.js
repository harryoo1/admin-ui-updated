import { createStore } from "redux";

const initialState = {
    "users": [],
    "filtered": []
}
function userReducer(state = initialState, action){
    switch(action.type){
        case "SET_USERS" :
            return {...state, "users": action.payload, "filtered" : action.payload};
        
        case "SET_FILTERED" : 
            return {...state, "filtered" : action.payload};
        default:
            return state;
    }
}

export default createStore(userReducer);