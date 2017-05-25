import { getBanner} from '../server/index';

const recommandItemAction = (recommandAlbum) => ({
    type: 'recommandAlbum',
    recommandAlbum
})

const hotAlbumAction = (album) => ({
   type: 'hotAlbum',
   album
})

export const delay = () => (dispatch) => {
        return new Promise((resolve, reject) => {
            getBanner().then(res => {
                dispatch(recommandItemAction(res));
                resolve();
            })
        })
}

// export const hotAlbumThunk = () => (dispatch) => {
//     return new Promise((resolve, reject) =>{
//          hotAlbum().then(res => {
//              dispatch(hotAlbumAction(res));
//              resolve();
//          })
//     })
// }
//
