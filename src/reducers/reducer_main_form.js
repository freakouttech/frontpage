/*jshint esversion:6*/
import * as types from '../actions/types';

class Freakout {
    constructor() {
    }
    checkUser() {
        let user = {};

        console.log('user: ', user);
        // let token = Cookies.get('jwtToken');
        // if (token) {
        //     return JSON.parse(Cookies.get('sti-user'));
        // }
        return user;
    }
}
const initialState = {
    user: new Freakout().checkUser(),
    searchValue: "",
    products:[]
};
const headerMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ME_FROM_TOKEN_SUCCESS:
            if(state.user.status === 'authenticated'){
                return Object.assign({}, state,{user: action.payload, status: 'authenticated', error: null, loading: false});
            }else{
                return state;
            }
        case types.ME_FROM_TOKEN_FAILURE:
            return Object.assign({}, state, {error: action.payload.p, status: 'notAuthenticated'});
        case types.SIGNIN_USER_SUCCESS:
            return Object.assign({}, state, {user: action.payload, error: {okay: true}, status: 'authenticated', tooltip: false});
        case types.SIGNIN_USER_FAILURE:
            return Object.assign({}, state, {error: action.payload.p, status: 'notAuthenticated'});
        case types.SIGNUP_USER_SUCCESS:
            return Object.assign({}, state, {user: action.payload, status: 'authenticated', tooltip: false});
        case types.SIGNUP_USER_FAILURE:
            return Object.assign({}, state, {error: action.payload.p, status: 'notAuthenticated'});
        case types.GET_SEARCHVALUE_SUCCESS:
            return Object.assign({}, state, {searchValue: action.searchValue});
        default:
            return state;
    }
};
export default headerMenuReducer;