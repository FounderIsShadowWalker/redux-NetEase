const tabReducer = (state = {activeIndex: 0}, action) => {
    switch (action.type){
        case 'TitleItem':
            return Object.assign({}, state, {activeIndex: action.activeIndex});
        default:
            return state;
    }
}

export default tabReducer;