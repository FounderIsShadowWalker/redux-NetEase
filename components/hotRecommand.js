import React, {Component} from 'react';
import style from '../css/hotRecommand.css'

export  default class RecommandAlbum extends Component{

    render(){
        const {hotAlbums} = this.props;

        return (
          <div className={style.wrapper}>
            <div className={style.titleWrapper}><span className={style.title}>个性化推荐</span></div>
            <div className={style.border}></div>
            <div className={style.albumWrapper}>
                <div className={style.item}>
                    <div className={style.imgWrapper}>
                         <span className={style.recommandWrapper}> 12 </span>
                    </div>
                    <div className={style.textWrapper}>
                        <div className={style.textInnerWrapper}>
                                            <span className={style.textUpRecommand}>
                                               个性化推荐
                                            </span>

                            <span className={style.textDownRecommand}>
                                      根据你的口味生成,每天更新!
                                            </span>
                        </div>
                    </div>
                </div>
                {
                    hotAlbums && hotAlbums[0] && hotAlbums[0]['/api/discovery/recommend/resource'].data
                        && hotAlbums[0]['/api/discovery/recommend/resource'].data.slice(0, hotAlbums[0]['/api/discovery/recommend/resource'].data.length - 1)
                        .map((item, index) => {

                         return  (<div key= {index} className= {style.item}>
                                    <div className={style.imgWrapper}>
                                        <img className={style.imgAlbum} src={item.picUrl}/>
                                    </div>
                                    <div className={style.textWrapper}>
                                        <div className = {style.textInnerWrapper}>
                                            <span className={style.textUp}>
                                                {item.name}
                                            </span>

                                            <span className={style.textDown}>
                                            {item.copywriter}
                                            </span>
                                        </div>
                                    </div>
                                </div>);
                    })
                }
            </div>
          </div>
        )
    }

}