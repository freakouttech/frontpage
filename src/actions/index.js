import {
    ME_FROM_TOKEN,
    ME_FROM_TOKEN_SUCCESS,
    ME_FROM_TOKEN_FAILURE,
    GET_SEARCHVALUE_SUCCESS
} from './types';

export function checkStatus(res) {
  if (res.payload.ok) {
    return res;
  }else{
      return res.payload.json().then((json) => {
        const p = res.payload;
        const err = new Error(json.message || res.statusText);
        throw Object.assign(err, { p });
      });
  }

}

export function parseJSON(response) {
    return response.payload.json();
}

export function meFromToken(token) {
    const request = fetch('/api/user/fromToken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    })
    return {
        type: ME_FROM_TOKEN,
        payload: request
    };
}

export function meFromTokenSuccess(currentUser) {
    return {
        type: ME_FROM_TOKEN_SUCCESS,
        payload: currentUser
    };
}

export function meFromTokenFailure(error) {
    return {
        type: ME_FROM_TOKEN_FAILURE,
        payload: error
    };
}

export function resetToken() { //used for logout
    return {
        type: RESET_TOKEN
    };
}

export function signUpUser(creds) {
    // creds = {name: name, pass:pass};
    const request = fetch('/user/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
    });
    return {
        type: SIGNUP_USER,
        payload: request
    };
}

export function signUpUserSuccess(user) {
    return {
        type: SIGNUP_USER_SUCCESS,
        payload: user
    };
}

export function signUpUserFailure(error) {
    return {
        type: SIGNUP_USER_FAILURE,
        payload: error
    };
}

export function resetUser() {
    return {
        type: RESET_USER,
    };
}

export function signInUser(creds) {
    // creds = {name: name, pass:pass};
    const request = fetch('/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
        });

    return {
        type: SIGNIN_USER,
        payload: request
    };
}

export function signInUserSuccess(user) {
    return {
        type: SIGNIN_USER_SUCCESS,
        payload: user
    };
}

export function signInUserFailure(error) {
    return {
        type: SIGNIN_USER_FAILURE,
        payload: error
    };
}

export function logoutUser() {
    return {
        type: LOGOUT_USER
    };
}


export function getSearchValueSuccess(searchValue){
    return{
        type: GET_SEARCHVALUE_SUCCESS,
        searchValue
    };
}
