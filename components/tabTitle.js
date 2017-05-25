import React, {Component} from 'react';
import style from '../css/tabTitle.css';

export default class tabTitle extends Component{

    constructor(props){
        super(props);
    }


    changeTitle(event){
        var title = event.target.innerHTML;
        this.props.TabChange(this.props.titles.indexOf(title));
    }

    render(){
        //渲染title
        return(
            <div className={style.wrapper}>
                {
                    this.props.titles && this.props.titles.map((title, index) =>
                        <div key={title} className={style.titleItem}>
                            <span onClick={this.changeTitle.bind(this)}
                                className={index == this.props.activeIndex ? style.activeItem : style.disActiveItem}>
                                {title}
                                </span>
                        </div>
                    )
                }
            </div>
        )
    }
}