"use strict";

function requestPromise(path, res, rej) {
    return new Promise((resolve, reject) => {
        if (rej) {
            reject(rej);
        }
        fetch('http://localhost:3000/' + path, {
            credentials: 'include',
        })
        .then(res => {
            return res.json();
        })
        .then(json => {
            let [flag, response] = res(json);
            if (flag) {
                resolve(response);
            } else {
                reject(response);
            }
        }).catch(e => {
            reject(e);
        });
    })
}


export function getBanner() {
    return requestPromise('indexBanner', json => {
        return [true, json];
    })
}

export function searchSong(keywords, limit, offset) {
    console.log(keywords, limit, offset);
    return requestPromise('search/?keywords=' + keywords + '&type=1&limit=' + limit + '&offset=' + offset,
        json => { return [true, json.result] }
    );
}

export function getLyric(songid) {
    return requestPromise('lyric?id=' + songid, json => {
        return [true, json];
    })
}

export function getComment(songid) {
    return requestPromise('comment?id=' + songid, json => {
        return [true, json];
    })
}
// export function hotAlbum() {
//     return requestPromise('recommend/resource', json => {
//         return [true, json];
//     })
// }