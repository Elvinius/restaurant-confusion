import * as ActionTypes from './ActionTypes';

export const Comments = (state = {
    errMessage: null,
    comments: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return { ...state, isLoading: false, errMessage: null, comments: action.payload }
        case ActionTypes.ADD_COMMENT:
            let comment = action.payload;
            comment.id = state.comments.length;
            comment.date = new Date().toISOString();
            return { ...state, comments: state.comments.concat(comment) };
        case ActionTypes.COMMENTS_FAILED:
            return { ...state, isLoading: false, errMessage: action.payload, comments: [] }
        default:
            return state;
    }
}