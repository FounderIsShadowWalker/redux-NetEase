import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import style from '../css/titleBar.css';
import SearchList from '../containers/searchList';

var timer = null;
var loadFlag = false;
export default class titleBar extends Component{

    searchSongs(event){
        var value = event.target.value;
        if(value !== "") {
            this.throttle.call(this, this.props.inputChange, 200, value);
        }
    }

    throttle(fn, delay, para){

        timer && (clearTimeout(timer), timer = null);

        timer = setTimeout(() => {
              loadFlag = false;
              fn(para, 100, 0).then(() => {
                  loadFlag = true;
              });
        }, delay)
    }

    showPanel(){
        this._setSearchPanel();
    }

    _setSearchPanel(){
        this.props.showSearchPanel(-1);
        this.props.minWindow();
    }
    _onSubmit(e){
        console.log('enter');
        e.preventDefault();
        if(loadFlag) {
            loadFlag = false;

            this.showPanel();
        }
    }

    render(){
        return(
             <div className={style.wrapper}>
                 <div className={style.titleLeft}>
                    <span className={style.largeTitle}>网易云音乐</span>
                 </div>
                 <div className={style.titleSearch}>
                     <span className={style.searchPic}></span>
                     <form onSubmit={ e => this._onSubmit(e) }>
                         <input type="text" className={style.search} ref='searchText' onChange={this.searchSongs.bind(this)}
                                             placeholder="搜索音乐,歌手，歌词，用户"/>
                         <SearchList/>
                     </form>
                 </div>
                 <div className={style.titleRightMail}>
                    <span className={style.mail}></span>
                 </div>
                 <div className={style.titleRightSetting}>
                     <span className={style.setting}></span>
                 </div>
                 <div className={style.titleRightFigure}>
                     <span className={style.figure}></span>
                 </div>
             </div>
        )
    }
}