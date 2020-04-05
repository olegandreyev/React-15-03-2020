import { INCEREMENT, DECREMENT } from '../actions/count'

export default function countReducer(state = 0, action) {
    switch(action.type) {
        case INCEREMENT:
            return state + 1;
        case DECREMENT:
            return state - 1;
        default: return state        
    }
}
