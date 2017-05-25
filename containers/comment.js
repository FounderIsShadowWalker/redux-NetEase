import {connect} from 'react-redux';
import Comment from '../components/comment';

const mapStateToProps = (state) => ({
   comment: state.comment.comment
});

const mapDispatchToProps = () => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Comment);