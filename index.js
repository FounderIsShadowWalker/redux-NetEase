import React from 'react';
import { render } from 'react-dom';
import App from './src/App';

import './node_modules/normalize.css/normalize.css';
import './css/global.css'

render((<App />), document.querySelector('#root'));
