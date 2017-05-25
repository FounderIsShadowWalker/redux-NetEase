import {getComment} from '../server/index';

const CommentAction = (comment) => ({
    type: 'Comment',
    comment
})

export const commentThunk = (songId) => (dispatch) => {
    return new Promise((resolve, reject) => {
        getComment(songId).then(res => {
            dispatch(CommentAction(res));
            resolve();
        })
    });
}