import React, { Component } from 'react';
import style from '../css/leftBar.css';

export default class leftBar extends Component{
    render(){
        return (
            <div className={style.wrapper}>
                <div className={style.recommend}>
                    <div className={style.title}>
                        推荐
                    </div>
                    <div className={style.list}>
                        <div className={style.listItem}>
                            <span className={style.iconMusic}></span>发现音乐
                        </div>
                        <div className={style.listItem}>
                            <span className={style.iconFM}></span>私人FM
                        </div>
                        <div className={style.listItem}>
                            <span className={style.iconMV}></span>MV
                        </div>
                        <div className={style.listItem}>
                            <span className={style.iconFriend}></span>朋友
                        </div>
                    </div>
                </div>

                <div className={style.recommend}>
                    <div className={style.title}>
                        我的音乐
                    </div>
                    <div className={style.list}>
                        <div className={style.listItem}>
                            <span className={style.iconDownload}></span>下载音乐
                        </div>
                    </div>
                </div>

                <div className={style.recommend}>
                    <div className={style.title}>
                        创建的歌单
                    </div>
                    <div className={style.list}>
                        <div className={style.listItem}>
                            <span className={style.iconHeart}></span>我喜欢的音乐
                        </div>
                    </div>
                </div>

                <div className={style.recommend}>
                    <div className={style.title}>
                        收藏的歌单
                    </div>
                </div>
            </div>
        )
    }
}