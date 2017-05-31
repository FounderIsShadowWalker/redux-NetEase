const album = (state = {album: ''}, action) => {
    switch (action.type){
        case 'Album':
            return Object.assign({}, state, {album: action.album});
        default:
            return state;
    }
}

export default album;