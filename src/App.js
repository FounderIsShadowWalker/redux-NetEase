import React, { Component } from 'react';

import TitleBar from '../containers/titleBar';
import LeftBar from '../components/leftBar';
import RightContent from '../components/rightContent';
import FootBar from '../containers/footBar';
import SongPanel from '../containers/songPanel';
import MaxSongPanel from '../containers/maxSongPanel';

import {Provider} from 'react-redux';
import { createLogger } from 'redux-logger'
import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';


import global from '../css/global.css';

const loggerMiddleware = createLogger();
const configureStore = (initialState) => {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            thunk,
            // loggerMiddleware
        )
    )
}

const store = configureStore();

export default class App extends Component {
  render() {

    return  (
        <Provider store = {store}>
                <div className={global.wrapper}>
                    <TitleBar/>
                <div className={global.middle}>
                    <LeftBar/>

                    <RightContent/>
                    <MaxSongPanel/>
                    <SongPanel/>
                </div>
                <div className={global.footBar}>
                    <FootBar/>
                </div>
            </div>
        </Provider>
       );
  }
}
