import axios from 'axios';

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR';
export const SELECT_SUBREDIT = 'SELECT_SUBREDIT';

export function selectSubredit(subreddit) { // reactjs, frontend, backend
    return {
        type: SELECT_SUBREDIT,
        payload: subreddit
    }
}

const fetchPostsRequests = () => ({
    type: FETCH_POSTS_REQUEST
})

const fetchPostsSuccess = (response) => ({
    type: FETCH_POSTS_SUCCESS,
    payload: response.data.data.children.map(child => child.data)
})

const fetchPostsError = error => ({
    type: FETCH_POSTS_ERROR,
    payload: error.response
})

export function fetchPosts(subreddit) {
    return dispatch => {
        dispatch(fetchPostsRequests())
        axios.get(`https://www.reddit.com/r/${subreddit}.json`)
            .then(response => dispatch(fetchPostsSuccess(response)))
            .catch(error => dispatch(fetchPostsError(error)))
    }

}