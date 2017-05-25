import React, {Component} from 'react';
import RecommendContent from '../components/recommendContent';
import SearchPanel from '../containers/searchPanel';

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