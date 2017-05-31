import {combineReducers} from 'redux';
import tabReducer from './tabReducer';
import hotRecommand from './hotRecommand';
import hotAlbum from './hotAlbum';
import titleBar from './titleBar';
import song from './song'
import maxSongPanel from './maxSongPanel';
import lyric from './lyric';
import pagination from './pagination';
import comment from './comment';
import album from './album';

const mainReducer = combineReducers({
    tabReducer,
    hotRecommand,
    hotAlbum,
    titleBar,
    song,
    maxSongPanel,
    lyric,
    pagination,
    comment,
    album
})

export default mainReducer;