import {connect} from 'react-redux';
import FootBar from '../components/footBar';
import * as actions from '../actions/song';

const mapStateToProps = (state) => ({
   song: state.song.song,
   duration: state.song.duration,
   lyric: state.lyric.lyric
});

const mapDispatchToProps = (dispatch) => ({
    rollLyric(index){
       dispatch(actions.LyricIndex(index));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FootBar);