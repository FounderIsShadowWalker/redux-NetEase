const hotRecommand = (state = {recommandAlbum: []}, action) => {
    switch (action.type){
        case 'recommandAlbum':
            return Object.assign({}, state, {recommandAlbum: [action.recommandAlbum]});
        default:
            return state;
    }
}

export default  hotRecommand;