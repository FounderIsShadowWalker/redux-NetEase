const hotAlbum = (state = {albums: []}, action) => {
    switch (action.type){
        case 'hotAlbum':
            return Object.assign({}, state, {albums: [...state.albums, action.album]});
        default:
            return state;
    }
}

export  default  hotAlbum;