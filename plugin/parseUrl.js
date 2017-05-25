const parseLyric = (lyric) => {
   let _lrc = lyric.split('\n');
   let parsedLrc = [{
       time: 0,
       content: ''
   }];

   for(let i=0; i<_lrc.length; i++) {
       let timeReg = /^\[(\d{2})\:(\d{2}.*)](.*)$/i;
       let parsed = _lrc[i].match(timeReg);
       if(parsed == null){
           continue;
       }
       let min = parsed[1];
       let sec = parseFloat(parsed[2]);
       parsedLrc.push({
           'time': sec + min * 60,
           'content': parsed[3],
       });

   }

   return parsedLrc;
};

export default parseLyric;