import  {connect} from  'react-redux';
import NewSongs from '../components/newSongs';
import {mapDispatchToProps} from './searchList';

export const mapStateToProps = (state) => ({
    albumList: state.hotRecommand.recommandAlbum
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewSongs);

