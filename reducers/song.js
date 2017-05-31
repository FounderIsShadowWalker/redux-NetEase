const song = (state = {song: '', duration: '0:00', picUrl: '', album: '热门音乐', artist: '', songName: '', songId: ''}, action) => {
   switch (action.type){
       case 'song':
           var min = Math.floor(action.song.duration / 1000 / 60);
           var s = Math.floor(action.song.duration  / 1000 % 60);
           s = s < 10 ? '0' + s : s;
           var timer = min + ':' + s;
           return Object.assign({}, state, {song: action.song ,
                    duration: timer,
                    picUrl: action.song.album.picUrl,
                    album: action.song.album.alias[0]  || '热门音乐',
                    artist: action.song.artists[0].name ,
                    songName: action.song.name ,
                    songId: action.song.id
           });

       case 'albumSong':
           var min = Math.floor(action.song.dt / 1000 / 60);
           var s = Math.floor(action.song.dt  / 1000 % 60);
           s = s < 10 ? '0' + s : s;
           var timer = min + ':' + s;
           action.song = Object.assign({}, state, {
               song: action.song,
               mp3Url: action.mp3Url,
               duration: timer,
               picUrl: action.song.al.picUrl,
               album: action.song.al.name,
               artist: action.song.ar[0].name,
               songName: action.song.name,
               songId: action.song.id,
               name: action.song.name,
               artists: action.song.ar

           })

           return Object.assign({}, state, {
               song: action.song,
               duration: timer,
               mp3Url: action.mp3Url,
               picUrl: action.song.picUrl,
               album: action.song.album,
               artist: action.song.artist,
               songName: action.song.songName,
               songId: action.song.songId,
               name: action.song.name,
               artists: action.song.ar
           });

       default:
           return state;
   }
}

export default song;