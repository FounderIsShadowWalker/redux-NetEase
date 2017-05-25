const comment = (state = {comment: ''}, action)  => {
    switch (action.type){
        case 'Comment':
            return Object.assign({}, state, {comment: action.comment});
        default:
            return state;
    }
}
export default comment;