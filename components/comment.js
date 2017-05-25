import React, {Component} from 'react';
import style from '../css/comment.css';
import CommentTime from '../components/commentTime';

export  default  class Comment extends Component{

    render(){
        return (<div className = {style.wrapper}>
                    <span className={style.wonderfulComment}>精彩评论</span>
                    {
                        this.props.comment.hotComments && this.props.comment.hotComments.map((comment) => {
                        return <div className={style.itemWrapper}>
                                 <div className={style.imgWrapper}>
                                    <img src={comment && comment.user.avatarUrl} className={style.avator}/>
                                 </div>
                                    <div className={style.wordWrapper}>
                                       <div>
                                            <span className={style.user}>{comment && comment.user.nickname}:</span>
                                            <span>{comment.content}</span>
                                       </div>
                                        <CommentTime key={comment.time} time={comment.time}/>
                                        <div className={style.right}>
                                            <span className={style.likeCount}><span className={style.commentGood}></span>
                                                ({comment.likedCount})</span>
                                        </div>
                                    </div>
                                </div>
                    })
                    }
        </div>);
    }
}