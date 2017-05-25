import React, {Component} from 'react';
import style from '../css/timeSpan.css';

export default class TimeSpan extends Component{
    render(){
        const min = Math.floor(this.props.duration / 1000 / 60);
        var s = Math.floor(this.props.duration / 1000 % 60);
        s = s < 10 ? '0' + s : s;
        const timer = min + ':' + s;
        return  <span className={style.duration}> {timer} </span>
    }
}