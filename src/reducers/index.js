import { combineReducers } from 'redux';
import mainReducer from './reducer_main_form';

let rootReducer;
rootReducer = combineReducers({
    Freakout: mainReducer
});

export default rootReducer;