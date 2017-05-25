import {connect} from 'react-redux';
import maxSongPanel from '../components/maxSongPanel';
import * as actions from '../actions/resizeWindow';
import * as commentAction from '../actions/comment';

export const mapStateToProps = (state) => ({
    position: state.maxSongPanel.position,
    url: state.song.picUrl,
    album: state.song.album,
    artist: state.song.artist,
    songName: state.song.songName
})

export const mapDispatchToProps = (dispatch) => ({
    minWindow(){
       dispatch(actions.minWindow())
    },
    getComment(songid){
        dispatch(commentAction.commentThunk(songid));
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(maxSongPanel);