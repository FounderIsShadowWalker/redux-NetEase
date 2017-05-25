import React, {Component} from 'react';
import Lyric from '../containers/lyric';
import Comment from '../containers/comment';
import style from '../css/maxSongPanel.css';

export default class MaxSongPanel extends Component{

    componentWillReceiveProps(nextState){
       var windowWrapper = document.querySelector('#windowWrapper');
       if(nextState.position){
            for(var prop in nextState.position) {
                windowWrapper.style[prop] = nextState.position[prop];
            }
       }
    }

    minWindow(){
        const {minWindow} = this.props;
        minWindow();
    }

    render(){
        return <div className={style.wrapper} id='windowWrapper'>
                    <div className={style.minButton} onClick={this.minWindow.bind(this)}></div>
                        <div className={style.songTable}>
                            <div className={style.songWrapper}>
                                <div className={style.left}>
                                    <div className={style.needle} id="needle"></div>
                                    <div className={style.record} id="record">
                                        <img className={style.albumPic} src={this.props.url}/>
                                    </div>
                                    <div className={style.buttonWrapper}>
                                        <button className={style.songAction}><span className={style.like}></span>喜欢</button>
                                        <button className={style.songAction}><span className={style.collect}></span>搜藏</button>
                                        <button className={style.songAction}><span className={style.download}></span>下载</button>
                                        <button className={style.songAction}><span className={style.share}></span>分享</button>
                                    </div>
                                </div>

                                <div className={style.right}>
                                    <div className={style.titleBar}>
                                        <span className={style.songName}>{this.props.songName}</span>
                                        <div className={style.songInfo}>
                                            <span className={style.albumName}>专辑: <span className={style.songData}>{this.props.album} </span></span>
                                            <span className={style.artist}>歌手:  <span className={style.songData}>{this.props.artist} </span></span>
                                            <span className={style.source}>来源:  <span className={style.songData}>搜索页</span></span>
                                        </div>
                                    </div>
                                <Lyric/>
                                </div>
                            </div>
                        </div>
                    <Comment/>
               </div>
    }
}