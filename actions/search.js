import {searchSong} from '../server/index';

const InputAction = (input) => ({
    type: 'input',
    input: input.input,
    searchText: input.searchText
});

const songCell = 100;
export const inputThunk =  (para, limit, offset) => (dispatch) => {
    return new Promise((resolve, reject) => {
        searchSong(para, limit, offset * songCell).then(res => {
                dispatch(InputAction({input: res, searchText: para}));
                resolve();
            })
    })
}