import { combineReducers } from 'redux';
import { SELECT_SUBREDIT, FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR, FETCH_POSTS_REQUEST } from "./actions";


function selectedSubredditReducer(state = 'reactjs', action) {
    switch(action.type) {
        case SELECT_SUBREDIT:
            return action.payload;
        default: 
            return state;    
    }
}

function postsReducer(state = {
    isLoading: false,
    items: [],
    error: null
}, action) {
    switch(action.type) {
        case FETCH_POSTS_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true
            }
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                items: action.payload
            }
        case FETCH_POSTS_ERROR:   
            return {
                isLoading: false,
                items: [],
                error: action.payload
            }
        default: return state;   
    }
}


const rootReducer = combineReducers({
    selectedSubreddit: selectedSubredditReducer,
    posts: postsReducer
})

export default rootReducer;
