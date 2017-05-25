import React, {Component} from 'react';
import TabTitle  from '../containers/tabTitle';
import TabContent from '../containers/tabContent';
import style from '../css/rightContent.css';


export default class Content extends Component{
    render(){
        return(
             <div className={style.rightContent}>
               <TabTitle/>
               <TabContent/>
             </div>
        )
    }
}