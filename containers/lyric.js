import {connect} from 'react-redux';

import Lyric from '../components/lyric';

export const mapStateToProps = (state) => ({
    songId: state.song.songId,
    lyric: state.lyric.lyric,
    index: state.lyric.index
});

export const mapDispatchToProps = (dispatch) => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps)(Lyric);