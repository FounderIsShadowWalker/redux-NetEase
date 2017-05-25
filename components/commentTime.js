import React, {Component} from 'react';
import style from '../css/commentTime.css';

export default class CommentTime extends Component{
    formatTime(time){
        var time = new Date(time);
        return `${time.getFullYear()}年${time.getMonth() + 1}月${time.getDay()}日 ${time.getHours()}:${time.getMinutes()}`;
    }

    render(){
        const time = this.formatTime(this.props.time);

        return <span className={style.time}>{time} </span>
    }
}