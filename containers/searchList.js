import  {connect} from 'react-redux';
import SearchList from '../components/searchList';
import * as actions from '../actions/song';
import * as commentAction from  '../actions/comment';

export const mapStateToProps = (state) => ({
    songlist: state.titleBar.input,
    songId: state.song.songId,
    searchText: state.titleBar.searchText
})

export const mapDispatchToProps = (dispatch) => ({
    setSongs(song){
        dispatch(actions.songAction(song));

        dispatch(commentAction.commentThunk(song.id));
    },

    getLyric(songId){
        return dispatch(actions.getLyricAction(songId));
    }


});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchList);
