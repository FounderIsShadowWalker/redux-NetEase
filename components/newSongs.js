import  React, {Component} from 'react';
import style from '../css/newSongs.css';

export default class newSongs extends Component{

    playSong(index){
        this.props.setSongs(this.props.albumList[0]['/api/v1/discovery/new/songs'].data[index-1]);

        this.props.getLyric(this.props.albumList[0]['/api/v1/discovery/new/songs'].data[index-1].id);
    }

    render(){
        const { albumList } = this.props;

        const data =  albumList[0] ? albumList[0]['/api/v1/discovery/new/songs'].data : null;

        const finalData = data ? (function () {
             var first = [], second = [];
             for(var i=0; i<20; i++){
                 if(i%2 === 0){
                     first.push(data[i]);
                 }else{
                      second.push(data[i])
                 }
             }
             return [first, second];
        }()) : null;

        return (
            <div className={style.wrapper}>
                <div className={style.titleWrapper}>
                    <span className={style.title}>新歌速递</span>
                </div>
                <div className={style.border}></div>

                <div className={style.columnWrapper}>

                     <div>
                        <div className={style.playAllWrapper}>
                            <span className={style.playAllText}>
                                <i className={style.icon}></i>播放全部
                            </span>
                    </div>

                        <div className={style.songColumn}>
                            {
                                finalData && finalData[0].map((item, index) => {
                                    return (<div key={index} className={style.songWrapper}
                                                 onClick={this.playSong.bind(this, (index + 1) * 2 - 1)}>
                                                <span className={style.index}>
                                                    {
                                                        (index + 1) * 2 - 1 < 10 ?
                                                            `0${(index + 1) * 2 - 1}` : (index + 1) * 2 - 1
                                                }
                                                </span>
                                                <span className={style.name}>{item.name}</span>
                                                <span className={style.artists}>{item.artists[0].name}</span>
                                            </div>)
                                })
                            }

                        </div>

                        <div className={style.songColumn}>
                            {
                                finalData && finalData[1].map((item, index) => {
                                    return (<div key={index} className={style.songWrapper}
                                                 onClick={this.playSong.bind(this, 2 * (index + 1))}>
                                                 <span className={style.index}>
                                                     {  2 * (index + 1) < 10 ?
                                                            `0${2 * (index + 1)}` : 2 * (index + 1)
                                                 }
                                                 </span>
                                                 <span className={style.name}>{item.name}</span>
                                                 <span className={style.artists}>{item.artists[0].name}</span>
                                            </div>)
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}