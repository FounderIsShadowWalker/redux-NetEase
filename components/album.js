import React, {Component} from 'react';
import style from '../css/album.css';
import CommentTime from '../components/commentTime';
import TimeSpan from '../components/timeSpan';

export default class Album extends Component{
    playMusic(index){
        console.log(this.props.albumList.playlist.tracks[index].id);
        console.log(this.props);

        this.props.findMusicUrl(this.props.albumList.playlist.tracks[index].id, this.props.albumList.playlist.tracks[index])
            .then(() => {
                this.props.setSongs(this.props.albumList.playlist.tracks[index]);
                this.props.getLyric(this.props.albumList.playlist.tracks[index].id);
            })
    }

    render(){
        const playList = this.props.albumList.playlist ? this.props.albumList.playlist : null;

        return(
            <div className={style.wrapper}>
                <div className={style.header}>
                    <div className={style.imgWraper}>
                        <img className={style.img} src={playList && playList.picUrl}></img>
                    </div>
                    <div className={style.info}>
                        <div className={style.right}>
                            <div className={style.rightTitle}>
                                <span>歌曲数 / 收听数</span>
                            </div>
                            <div className={style.rightContent}>
                                <span>{playList && playList.trackCount} / {playList && Math.floor(playList.playCount/10000)}万</span>
                            </div>
                        </div>
                        <div className={style.titleWrapper}>
                            <span className={style.songlistTitle}>歌单</span>
                            <span className={style.songlistName}>{playList&& playList.name}</span>
                        </div>
                        <div className={style.authorWrapper}>
                            <img className={style.authorImg} src={playList&& playList.creator.avatarUrl}></img>
                            <span className={style.authorText}>{playList&& playList.creator.nickname}</span>
                            <CommentTime time={playList && playList.trackUpdateTime}/>
                        </div>
                        <div className={style.buttonGroup}>
                            <div className={style.buttonWrapper}>
                                <span className={style.buttonContent}><span className={style.playAll}></span>
                                    播放全部
                                    <span className={style.add}></span>
                                </span>
                            </div>
                            <div className={style.buttonWrapper}>
                                <span className={style.buttonContent}><span className={style.collect}></span>收藏<span style={{display: 'inline-block'}}>({playList && playList.subscribedCount})</span>
                                </span>
                            </div>
                            <div className={style.buttonWrapper}>
                                <span className={style.buttonContent}><span className={style.share}></span>分享({playList && playList.shareCount})
                                </span>
                            </div>
                            <div className={style.buttonWrapper}>
                                <span className={style.buttonContent}><span className={style.download}></span>下载全部
                                </span>
                            </div>
                        </div>
                        <div className={style.tagWrapper}>
                            <span className={style.title}>标签:</span>
                            {
                                playList && playList.tags && playList.tags.map((tag) =>{
                                    return <span key={tag}>{tag}<span style={{color: 'gray'}}>/</span></span>
                                })
                            }
                        </div>
                        <div className={style.introWrapper}>
                            <span className={style.title}>简介:</span>
                            <span className={style.introContent}>{playList && playList.description}</span>
                        </div>
                    </div>
                </div>
                <div className={style.searchType}>
                    <span className={style.searchItem}>歌曲列表</span>
                    <span className={style.searchItem}>评论(975)</span>
                    <span className={style.searchItem}>收藏者</span>
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
                    </div>
                    <div className={style.songItemContent}>
                    {
                        playList && playList.tracks && playList.tracks.map((track, index) => {
                        return (
                            <div key={index} className={style.songItemWrapper} onClick={this.playMusic.bind(this, index)}>
                                <span className={style.songIndex}>{index+1}</span>
                                <span className={style.operation}>
                                    <span className={style.heart}></span>
                                    <span className={style.download}></span>
                                </span>
                                <span className={style.musicTitle}> {track.name} </span>
                                <span className={style.singer}>
                                    {
                                        track.ar.map((item, index) => {
                                            return <span key={index}> {item.name} </span>
                                        })
                                    }
                                </span>
                                <span className={style.album}>{track.al.name}</span>
                                <TimeSpan duration={track.dt}/>
                            </div>);
                        })
                    }
                    </div>
                </div>
            </div>
        )

    }
}