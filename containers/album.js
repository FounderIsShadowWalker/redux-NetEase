import {connect} from 'react-redux';
import Album from '../components/album';
import * as actions from '../actions/song';
import * as commentAction from  '../actions/comment';

export const mapStateToProps = (state) => ({
  albumList: state.album.album,
  song: state.song.song
})

export const mapDispatchToProps = (dispatch) => ({
    setSongs(song){
        // dispatch(actions.albumSongAction(song));

        dispatch(commentAction.commentThunk(song.id));
    },

    getLyric(songId){
        return dispatch(actions.getLyricAction(songId));
    },

    findMusicUrl(songId, song){
        return dispatch(actions.getMusicUrlAction(songId, song));
    },

    addSong(song){
        dispatch(actions.addSong(song));
    },

    addSongList(songlist){
        dispatch(actions.addSongList(songlist));
    }
});



export default connect(
    mapStateToProps,
    mapDispatchToProps)(Album);