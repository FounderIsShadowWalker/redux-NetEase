import {connect} from 'react-redux';
import songPanel from '../components/songPanel';
import * as actions from '../actions/resizeWindow';

const mapStateToProps = (state) => ({
    song: state.song.song,
});

const mapDispatchToProps = (dispatch) => ({
    maxWindow(){
        dispatch(actions.maxWindow())
    },

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(songPanel);

