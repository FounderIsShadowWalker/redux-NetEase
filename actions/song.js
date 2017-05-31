import {getLyric, getMusicUrl} from '../server/index';
import parseLyric from  '../plugin/parseUrl';

export const songAction = (song) => ({
    type: 'song',
    song
});

export const albumSongAction = (song, mp3Url) => ({
    type: 'albumSong',
    song,
    mp3Url
})

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

export const getMusicUrlAction = (songId, song) => (dispatch) => {
    console.log(songId);
    return new Promise((resolve, reject) => {
        getMusicUrl(songId).then(res => {
            console.log(res);
            dispatch(albumSongAction(song, res.data[0].url));
            resolve();
        })
    })
}