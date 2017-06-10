import React, {Component} from 'react';
import style from '../css/searchList.css';

export  default class searchList extends Component{

    componentDidMount(){
       var searchList = document.querySelector('#searchlist');
       document.body.onclick = function () {
           searchList.style.display = 'none';
       }
    }


    componentWillReceiveProps(nextState){
        if(nextState.songlist) {
            var searchList = document.querySelector('#searchlist');
            searchList.style.display = 'block';
        }
    }

    shouldComponentUpdate (nextProps, nextState) {
        if(nextProps.searchText === this.props.searchText){
            var searchList = document.querySelector('#searchlist');
            searchList.style.display = 'none';
            return false;
        };
        return true;
    }

    playMusic(index){

       this.props.setSongs(this.props.songlist.songs[index]);

       this.props.getLyric(this.props.songlist.songs[index].id);

       this.props.addSong(this.props.songlist.songs[index]);
    }

    render(){
        const {songlist} = this.props;
        return (
            <div className={style.wrapper} id="searchlist">
               <div className={style.title}>单曲</div>
                {
                        songlist && songlist.songs && songlist.songs.slice(0, 10).map((item, index) => {
                            return  (<div className={style.item} key={index} onClick={this.playMusic.bind(this, index)}>
                                        <span className={style.songName}> {item.name} -</span>
                                            {
                                                item.artists.map((item, index) => {
                                                return <span key={index} className={style.author}> {item.name} </span>
                                            })
                                        }
                                    </div>)
                    })
                }
            </div>
        )
    }

}