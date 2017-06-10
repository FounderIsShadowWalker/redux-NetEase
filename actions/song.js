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

export const addSong = (song) => ({
    type: 'addSong',
    song
});

export const addSongList = (songlist) => ({
    type: 'addSongList',
    songlist
})
export const lastSong = () => ({
    type: 'lastSong'
});

export const nextSong = () => ({
    type: 'nextSong'
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

export const getMusicUrlAction = (songId, song) => (dispatch) => {
    return new Promise((resolve, reject) => {
        getMusicUrl(songId).then(res => {
            dispatch(albumSongAction(song, res.data[0].url));
            resolve();
        })
    })
}