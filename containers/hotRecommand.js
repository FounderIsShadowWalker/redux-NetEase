import {connect} from 'react-redux';
import Corousel from '../components/corousel';
import * as actions from '../actions/recommandAction';

export const mapStateToProps = (state) => ({
    albumList: state.hotRecommand.recommandAlbum
})

export const mapDispatchToProps = (dispatch) => ({
    AlbumChange(Album){
        return dispatch(actions.delay(Album));
    }
})

const recommandContainer =  connect(
    mapStateToProps,
    mapDispatchToProps
)(Corousel);

export default  recommandContainer;


