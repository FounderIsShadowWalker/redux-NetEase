import {connect} from 'react-redux';
import TabTitle from '../components/tabTitle';
import * as actions from '../actions/tabAction';

export const mapStateToProps = (state) => (
    {
        activeIndex: state.tabReducer.activeIndex,
        titles: ['推荐', '排行榜', '歌单', '主播电台', '最新音乐']
});

export const mapDispatchToProps = (dispatch) => ({
    TabChange(theInputValue){
        dispatch(actions.tabTitleItem(theInputValue));
    }
});

const TabTitleContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TabTitle);

export default  TabTitleContainer;





