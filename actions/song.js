import {getLyric} from '../server/index';
import parseLyric from  '../plugin/parseUrl';

export const songAction = (song) => ({
    type: 'song',
    song
});

export const Lyric = (lyric) => ({
    type: 'getLyric',
    lyric
})

export const LyricIndex = (index) =>({
    type: 'roll',
    index
})

export const getLyricAction = (songId) => (dispatch) => {
        getLyric(songId).then(res => {
            let result = parseLyric(res.lrc.lyric);
            dispatch(Lyric(result));
        })
}

