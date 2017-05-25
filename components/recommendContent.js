import React, {Component} from 'react';
import HotSpot from '../containers/hotSpot';
import HotRecommand from '../containers/hotRecommand';
import RecommandAlbum from '../containers/hotRecommandAlbum';
import NewSongs from '../containers/newSongs';

export default class RecommendContent extends Component{
    render(){
        return (<div>
            <HotRecommand/>
            <HotSpot/>
            <RecommandAlbum/>
            <NewSongs/>
        </div>)
    }
}