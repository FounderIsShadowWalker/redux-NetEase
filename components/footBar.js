import React, {Component} from 'react';
import style from '../css/footBar.css';
import pause from '../img/pause.png';
import play from  '../img/playdown.png';
var index = 0;

export  default class footBar extends Component{

    componentWillReceiveProps(nextState){
        if(nextState.song) {
            this.Audio(nextState);
            this.bindEvent();
        }
    }

    playOrPause(){
        var  audio = document.querySelector('#audio'),
             record = document.querySelector('#record'),
             neddle = document.querySelector('#needle'),
             playIcon = document.querySelector('#playIcon');

        if(audio.paused){
            audio.play();
            playIcon.style.backgroundImage = `url(${pause})`;
            record.style.animationPlayState = 'running';
            neddle.style.transform = 'rotateZ(-30deg)';
        }
        else{
            audio.pause();
            playIcon.style.backgroundImage = `url(${play})`;
            record.style.animationPlayState = 'paused';
            neddle.style.transform = 'rotateZ(0deg)';
        }
    }

    Audio(nextState){
        var playIcon = document.querySelector('#playIcon'),
            audio = document.querySelector('#audio'),
            timer =  document.querySelector('#timer'),
            progressBar = document.querySelector('#progressBar'),
            progressCircle = document.querySelector('#progrssCircle'),
            progressWidth = progressBar.offsetWidth,
            progressCircleWidth = progressCircle.offsetWidth,
            that = this;

        playIcon.style.backgroundImage = `url(${pause})`;

        audio.volumn = 0.5;


            audio.ontimeupdate = function () {
                var time = Math.floor(audio.currentTime);
                var min = Math.floor(time / 60), s = time % 60;
                var rate = audio.currentTime / audio.duration;
                var progessRate = audio.buffered.end(audio.buffered.length - 1) / audio.duration;
                var left = -progressCircleWidth / 2 + progressWidth * rate;
                progressCircle.style.left = left + 'px';
                s = s < 10 ? '0' + s : s;
                time = min + ':' + s;

                timer.innerHTML = `${time}/${nextState.duration}`;
                progressBar.style.background = `linear-gradient(90deg, red ${rate * progressBar.offsetWidth}px,#EBEBEB 0px, #EBEBEB ${progessRate * progressBar.offsetWidth}px, gray 0px)`;


                //这里改变右边歌词栏的position;
                if (that.props.lyric) {
                    for (var i = index; ; i++) {
                        if (that.props.lyric[i] && that.props.lyric[i].time >= audio.currentTime) {
                            that.props.rollLyric(i-1);
                            index = i-1;
                            break;
                        }
                    }
                }

            };

            audio.onprogress = function () {
                var rate = audio.currentTime / audio.duration;
                var progessRate = audio.buffered.end(audio.buffered.length - 1) / audio.duration;
                progressBar.style.background = `linear-gradient(90deg, red ${rate * progressBar.offsetWidth}px, #EBEBEB 0px, #EBEBEB ${progessRate * progressBar.offsetWidth}px, gray 0px)`;

            }
    }

    setVolumn(percent){
        var  audio = document.querySelector('#audio');
        audio.volume = percent;
    }

    setSongProgress(percent){
        var audio = document.querySelector('#audio');

        audio.currentTime = Math.floor(audio.duration * percent);
        index = 0;
     }

    bindEvent(){
        var volumnButton = document.querySelector('#volumnButton'),
            progressBar = document.querySelector('#progressBar'),
            progressCircle = document.querySelector('#progrssCircle'),
            volumnBar = document.querySelector('#volumnBar');


        var that = this;
        volumnButton.onmousedown = function (e) {
            var startX = e.clientX,
                left = volumnButton.offsetLeft;

            document.onmousemove = function (e) {
                var x = e.clientX,
                    position = left + x - startX;

                if(position < -volumnButton.offsetWidth / 2){
                    position = -volumnButton.offsetWidth / 2;
                }

                if(position >  -volumnButton.offsetWidth / 2 + volumnBar.offsetWidth){
                    position =  -volumnButton.offsetWidth / 2 + volumnBar.offsetWidth;
                }

                var percent = (position / (volumnBar.offsetWidth - (volumnButton.offsetWidth / 2))).toFixed(1);

                that.setVolumn(percent);
                volumnBar.style.background = `linear-gradient(90deg, red ${percent * volumnBar.offsetWidth}px, gray 0px)`;

                volumnButton.style.left = position + 'px';

            }

            volumnButton.onmouseup = document.onmouseup = function (e) {
                document.onmousemove = null;
            }
        }

        progressCircle.onmousedown = function (e) {
            var startX = e.clientX,
                left = progressCircle.offsetLeft;


            document.onmousemove = function (e) {
                var x = e.clientX,
                    position = left + x - startX;

                if(position < -progressCircle.offsetWidth / 2){
                    position = -progressCircle.offsetWidth / 2;
                }

                if(position >  -progressCircle.offsetWidth / 2 + progressBar.offsetWidth){
                    position = -progressCircle.offsetWidth / 2 + progressBar.offsetWidth;
                }

                var percent = (position / (progressBar.offsetWidth - (progressCircle.offsetWidth / 2))).toFixed(1);

                that.setSongProgress(percent);


                progressCircle.style.left = position + 'px';

            }

            progressCircle.onmouseup = document.onmouseup = function (e) {
                document.onmousemove = null;
            }
        }

    }

    render(){
        return (
            <div className={style.frostGlass}>
                <div className={style.wrapper}>
                    <audio className={style.audio} id="audio"
                           src={this.props.song && this.props.song.mp3Url}
                           controls="controls"
                           autoPlay="autoplay"

                    ></audio>
                    <span className={style.prev}>
                        <i className={style.prevIcon}></i>
                    </span>
                    <span className={style.play} onClick={this.playOrPause}>
                        <i className={style.playIcon} id="playIcon"></i>
                    </span>
                    <span className={style.next}>
                        <i className={style.nextIcon}></i>
                    </span>
                    <span className={style.progressBar} id="progressBar">
                        <span className={style.progrssCircle} id="progrssCircle">
                        </span>
                    </span>
                    <span className={style.timeText} id="timer">0:00/{this.props.duration}</span>
                    <span className={style.volumn}></span>
                    <span className={style.volumnBar} id="volumnBar">
                        <span className={style.volumnButton} id="volumnButton"></span>
                    </span>
                    <span className={style.random}></span>
                    <span className={style.lyric}></span>
                    <span className={style.playList}></span>
                    <span className={style.songs}>345</span>
                </div>
            </div>
        )
    }
}