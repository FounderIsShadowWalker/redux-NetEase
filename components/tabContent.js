import React, {Component} from 'react';
import RecommendContent from '../components/recommendContent';
import SearchPanel from '../containers/searchPanel';
import Album from '../containers/album';


export default class tabContent extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {
        console.log(this.props);
    }

    render(){
        var activeIndex = this.props.activeIndex;
        var showContent;
        switch (activeIndex){
            case -2:
                showContent = <Album/>;
                break;
            case -1:
                showContent = <SearchPanel/>;
                break;
            case 0:
                showContent = <RecommendContent/>
                break;

        }
        return (<div> {showContent} </div>);
    }
}