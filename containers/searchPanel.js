import {connect} from 'react-redux';
import SearchPanel from '../components/searchPanel';

import {mapDispatchToProps} from './searchList';
const mapStateToProps = (state) => ({
    songlist: state.titleBar.input,
    searchText: state.titleBar.searchText,
    songId: state.song.songId
});

const TabContentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchPanel);


export default  TabContentContainer;