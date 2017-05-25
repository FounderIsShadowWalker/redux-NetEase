import React, {Component} from 'react';
import style from '../css/pagination.css';

export default class Pagination extends Component{

    pageChange(){
        var pageIndex = document.querySelector('#next').previousSibling.innerHTML * 1;
        var limit =  (this.props.pageIndex + 2) * 100 < this.props.songlist.songCount ? 100 : this.props.songlist.songCount % 100;
        if(pageIndex - 2 >= this.props.pageIndex) {
            this.props.pageIndexChange(this.props.pageIndex + 1);
            this.props.inputChange(this.props.searchText, limit, this.props.pageIndex + 1);
        }
    }

    prev(){
        if(this.props.pageIndex >=1) {
            this.props.pageIndexChange(this.props.pageIndex - 1);
            this.props.inputChange(this.props.searchText, 100, this.props.pageIndex - 1);
        }
    }

    next(){
        this.pageChange();
    }

    render(){

      var pages = this.props.songlist.songCount ? Math.ceil(this.props.songlist.songCount / 100)
                  : 0;

      return (
          <div className={style.wrapper}>
              <div className={style.prev} onClick={this.prev.bind(this)}></div>
              {
                  new Array(pages).fill('').map((item, index) => {
                      return <div key={index} className={this.props.pageIndex === index ? style.activeIndex : style.index}
                                onClick={this.pageChange.bind(this)}>
                          {index+1}</div>;
                  })
              }
              <div className={style.next} onClick={this.next.bind(this)} id="next"></div>
          </div>
      )
    }

}
