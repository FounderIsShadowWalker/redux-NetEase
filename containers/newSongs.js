import  {connect} from  'react-redux';
import NewSongs from '../components/newSongs';

export const mapStateToProps = (state) => ({
    albumList: state.hotRecommand.recommandAlbum
})

export const mapDispatchToProps = (dispatch) => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewSongs);

