const titleBar = (state = {input: '', searchText: ''}, action) => {
    switch (action.type){
        case 'input':
            return Object.assign({}, state, {input: action.input, searchText:action.searchText});
        default :
            return state;
    }
}

export default titleBar;