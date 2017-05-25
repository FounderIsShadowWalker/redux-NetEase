import React, {Component} from 'react';
import style from '../css/lyric.css';
import tempo from '../plugin/temo';

export default class Lyric extends Component{
    componentWillReceiveProps(nextState){
      var wrapper = document.querySelector('#wrapper'),
          height = document.querySelector('span').offsetHeight;

      let origin = wrapper.scrollTop;
      var topIndex = nextState.index - 5 < 0 ? 0 : nextState.index - 5;


      this.scroll(origin, topIndex * height, 10, function (value) {
          wrapper.scrollTop = value;
      });

    }

    scroll(A, B, rate, callback){
        if (A == B || typeof A != 'number') {
            return;
        }
        B = B || 0;
        rate = rate || 2;

        var step = function () {
            A = A + (B - A) / rate;

            if (Math.abs(A) < 1) {
                callback(B);
                return;
            }
            callback(A);
            requestAnimationFrame(step);
        };
        step();

    }

    render(){
        return (
            <div className={style.lyricWrapper} id="wrapper">
                {
                  this.props.lyric[0] &&  this.props.lyric.map((lyric, index) => {
                      return <span key={index} className={index == this.props.index ? style.activeSpan: style.lyricSpan }>
                          {lyric.content}</span>
                  })
                }
          </div>
        )
    }
}