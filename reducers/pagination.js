const Pagination = (state = {index: 0}, action) => {
    switch (action.type){
        case 'Pagination':
            return Object.assign({}, state, {index: action.index});
        default:
            return state;
    }
}

export default Pagination;