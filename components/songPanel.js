import React, {Component} from 'react';
import style from '../css/songPanel.css';

export default class songPanel extends Component{


    componentWillReceiveProps(nextState){
        console.log(nextState);
        if (nextState.song) {
            var songWrapper = document.querySelector('#songWrapper');
            songWrapper.style.display = 'block';
        }
    }


    maxWindow(){
        const {maxWindow} = this.props;
        maxWindow();
    }

    render(){
        const { song } = this.props;
        var author = [];
        if(song.artists || song.artist) {
            if(Object.prototype.toString.call(song.artists || song.artist).indexOf('String') > -1){
                song.artists = [song.artists];
            }
            song.artists.forEach((artist, index) => {
                 author.push(artist['name']);
            });
            author = author.join(' / ');
        }

        return(
            <div className={style.wrapper} id="songWrapper" onClick={this.maxWindow.bind(this)}>
                   <div className={style.imgWrapper}>
                       <img className={style.img}
                            src={song && (song.album.picUrl || song.picUrl)}
                       />
                   </div>
                   <div className={style.textWrapper}>
                       <div className={style.itemName}>
                            <span className={style.name}>{song && song.name}</span>
                            <span className={style.share}></span>
                       </div>
                       <div className={style.itemAuthor}>
                            <span className={style.author}>{author}
                            </span>
                            <span className={style.love}></span>
                       </div>
                   </div>
              </div>)
    }

}