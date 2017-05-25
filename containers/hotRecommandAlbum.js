import {connect} from 'react-redux';
import HotRecommend from '../components/hotRecommand';
import * as actions from '../actions/recommandAction';

const mapStateToProps = (state) => ({
    hotAlbums: state.hotRecommand.recommandAlbum
})

const  mapDispatchToProps = (dispatch) => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HotRecommend);