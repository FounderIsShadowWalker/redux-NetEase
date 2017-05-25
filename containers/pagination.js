import {connect} from 'react-redux';
import Pagination from '../components/pagination';
import * as actions from '../actions/pagination';
import * as searchActions from '../actions/search';

export const mapStateToProps = (state) => ({
    songlist: state.titleBar.input,
    pageIndex: state.pagination.index,
    searchText: state.titleBar.searchText
})

const mapDispatchToProps = (dispatch) => ({
    pageIndexChange(index){
        dispatch(actions.paginationAction(index))
    },
    inputChange(theInputValue, limit, offset){
        return dispatch(searchActions.inputThunk(theInputValue, limit, offset));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Pagination);