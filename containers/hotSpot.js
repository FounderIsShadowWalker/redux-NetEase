import {connect} from 'react-redux';
import HotSpot from '../components/hotSpot';

export const mapStateToProps = (state) => ({
    albumList: state.hotRecommand.recommandAlbum
})

export const mapDispatchToProps = (dispatch) => ({})

const recommandContainer =  connect(
    mapStateToProps,
    mapDispatchToProps
)(HotSpot);

export default  recommandContainer;
