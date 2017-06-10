import {connect} from 'react-redux';
import FootBar from '../components/footBar';
import * as actions from '../actions/song';
import * as commentAction from  '../actions/comment';

const mapStateToProps = (state) => ({
   song: state.song.song,
   duration: state.song.duration,
   lyric: state.lyric.lyric,
   songlist: state.songlist.songlist,
   playIndex: state.songlist.playIndex
});

const mapDispatchToProps = (dispatch) => ({
    rollLyric(index){
       dispatch(actions.LyricIndex(index));
    },

    setSongs(song, mp3Url){
        if(mp3Url){
            dispatch(actions.songAction(song));
        }
        else{
            dispatch(actions.albumSongAction(song, mp3Url));
        }

        dispatch(commentAction.commentThunk(song.id));
    },

    getLyric(songId){
        return dispatch(actions.getLyricAction(songId));
    },

    prev(){
        dispatch(actions.lastSong());
    },

    next(){
       dispatch(actions.nextSong());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FootBar);