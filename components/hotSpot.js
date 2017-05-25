import React, {Component} from 'react';
import style from '../css/hotSpot.css';

export default class hotSpot extends Component{

    render(){
        const { albumList } = this.props;

        const data =  albumList[0] ? albumList[0]['/api/discovery/hotspot'].data : null;

        const finalData = data ? [data.slice(0, 4), data.slice(4, 8)] : null;

        return (
            <div className={style.wrapper}>
                <div className={style.titleWrapper}>
                    <span className={style.title}>热门精选</span>
                </div>
                <div className={style.border}></div>

                 <div className={style.albumWrapper}>
                    {
                       finalData && finalData.map((row, index) => {
                           return (
                               <div key={index} className={style.row}>
                                   {
                                       row.map((itemAblum, index) => {
                                           return(
                                               <div key={index} className={style.item}>
                                                   <div className={style.itemWrapper}>
                                                       <div className={style.AlbumImage}>
                                                            <img src={itemAblum.picUrl}/>
                                                            <span className={style.listenCount}>
                                                                <i className={style.icon}></i>{Math.floor(itemAblum.playcount/10000)}万
                                                           </span>
                                                       </div>
                                                       <span className={style.AblumText}>{itemAblum.name}</span>
                                                   </div>

                                               </div>
                                           )
                                       })
                                   }
                               </div>
                           )
                       })
                    }
                </div>
            </div>
        )
    }
}