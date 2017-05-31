import {getAlbum} from '../server/index';

const Album = (album) => ({
    type: 'Album',
    album
})

export const albumThunk = (albumId) => (dispatch) => {
    return new Promise((resolve, reject) => {
        getAlbum(albumId).then(res => {
            dispatch(Album(res));
            resolve();
        })
    });
}

