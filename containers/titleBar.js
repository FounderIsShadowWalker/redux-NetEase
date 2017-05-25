import {connect} from 'react-redux';
import TitleBar from '../components/titleBar';
import * as actions from '../actions/search';
import * as tabAction from '../actions/tabAction';
import * as windowAction from '../actions/resizeWindow';

export const mapStateToProps = (state) => ({
       input: state.titleBar.input,
});

export const mapDispatchToProps = (dispatch) => ({
    inputChange(theInputValue, limit, offset){
        return dispatch(actions.inputThunk(theInputValue, limit, offset));
    },
    showSearchPanel(theInputValue){
        dispatch(tabAction.tabTitleItem(theInputValue));
    },
    minWindow(){
        dispatch(windowAction.minWindow());
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TitleBar);
