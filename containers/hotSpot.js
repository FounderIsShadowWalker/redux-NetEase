import {connect} from 'react-redux';
import HotSpot from '../components/hotSpot';
import * as tabAction from '../actions/tabAction';
import * as actions from '../actions/album';

export const mapStateToProps = (state) => ({
    albumList: state.hotRecommand.recommandAlbum
})

export const mapDispatchToProps = (dispatch) => ({
    showSearchPanel(theInputValue){
        dispatch(tabAction.tabTitleItem(theInputValue));
    },
    getAlbum(albumId){
        dispatch(actions.albumThunk(albumId));
    }
})

const recommandContainer =  connect(
    mapStateToProps,
    mapDispatchToProps
)(HotSpot);

export default  recommandContainer;
