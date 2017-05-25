const song = (state = {song: '', duration: '0:00', picUrl: '', album: '热门音乐', artist: '', songName: '', songId: ''}, action) => {
   switch (action.type){
       case 'song':
           const min = Math.floor(action.song.duration / 1000 / 60);
           var s = Math.floor(action.song.duration / 1000 % 60);
           s = s < 10 ? '0' + s : s;
           const timer = min + ':' + s;
           return Object.assign({}, state, {song: action.song , duration: timer, picUrl: action.song.album.picUrl,
                    album: action.song.album.alias[0] || '热门音乐', artist: action.song.artists[0].name, songName: action.song.name,
                    songId: action.song.id});
       default:
           return state;
   }
}

export default song;