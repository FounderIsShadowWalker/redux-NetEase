import React, {Component} from 'react';
import TimeSpan from '../components/timeSpan';
import style from '../css/searchPanel.css';
import Pagination from '../containers/pagination';

export default class SearchPanel extends Component{
    playMusic(index){
        this.props.setSongs(this.props.songlist.songs[index]);

        this.props.getLyric(this.props.songlist.songs[index].id);
    }

    render(){
        const {songlist, searchText} = this.props;
        return (
            <div className={style.wrapper}>
                <span className={style.searchTitle}>搜索<span className={style.songCounts}>"{searchText}"</span>,找到{songlist.songs.length}首单曲</span>
                <div className={style.searchType}>
                        <span className={style.searchItem}>单曲</span>
                        <span className={style.searchItem}>歌手</span>
                        <span className={style.searchItem}>专辑</span>
                        <span className={style.searchItem}>MV</span>
                        <span className={style.searchItem}>歌单</span>
                        <span className={style.searchItem}>歌词</span>
                        <span className={style.searchItem}>主播电台</span>
                        <span className={style.searchItem}>用户</span>
                </div>
                <div className={style.border}></div>
                <div className={style.songItemWrapper}>
                    <div className={style.songItemTitle}>
                        <span className={style.songIndex}></span>
                        <span className={style.operation}>操作</span>
                        <span className={style.musicTitle}>音乐标题</span>
                        <span className={style.singer}>歌手</span>
                        <span className={style.album}>专辑</span>
                        <span className={style.duration}>时长</span>
                        <span className={style.hot}>热度</span>
                    </div>
                    <div className={style.songItemContent}>
                    {
                        songlist.songs && songlist.songs.map((item, index) => {
                            return  (
                                        <div key={index} className={style.songItemWrapper} onClick={this.playMusic.bind(this, index)}>
                                            <span className={style.songIndex}>{index+1}</span>
                                            <span className={style.operation}>
                                                <span className={style.heart}></span>
                                                <span className={style.download}></span>
                                            </span>
                                            <span className={style.musicTitle}> {item.name} </span>
                                            <span className={style.singer}>
                                            {
                                                item.artists.map((item, index) => {
                                                return <span key={index}> {item.name} </span>
                                                })
                                            }
                                            </span>
                                            <span className={style.album}>{item.album.name}</span>
                                            <TimeSpan duration={item.duration}/>
                                            <span className={style.hot}>
                                                <span className={style.popularity} style={{background: `linear-gradient(90deg, #C8C8C8  ${item.popularity}%, #DCDCDC 0px)`}}>
                                                </span>
                                            </span>
                                        </div>
                                    )
                            })
                    }
                    </div>
                </div>
            <Pagination/>
            </div>
        )
    }
}