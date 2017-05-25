import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import style from '../css/titleBar.css';
import SearchList from '../containers/searchList';

var timer = null;

export default class titleBar extends Component{

    searchSongs(event){
        var value = event.target.value;
        if(value !== "") {
            this.throttle(this.props.inputChange, 300, value);
        }
    }

    throttle(fn, delay, para){

        timer && (clearTimeout(timer), timer = null);

        timer = setTimeout(() => {
              fn(para, 100, 0);
        }, delay)
    }

    _onSubmit(e){
        e.preventDefault();
        this.props.showSearchPanel(-1);
        this.props.minWindow();
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