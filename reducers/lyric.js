const Lyric = (state = {lyric: '', index: 0}, action) => {
    switch (action.type){
        case 'getLyric':
            return Object.assign({}, state, {lyric: action.lyric});
        case 'roll':
            return Object.assign({}, state, {index: action.index});
        default:
            return state;
    }
}

export  default Lyric;