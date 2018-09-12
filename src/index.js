import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Rx from 'rxjs/Rx'

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

import 'semantic-ui-css/semantic.min.css';

import createStore from './redux/configureStore';

import DM from './components/dm';
import Player from './components/player';
import Header from './components/header';

Amplify.configure(aws_exports);
const store = createStore();

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Header />
                <Route path="/player" component={Player} />
                <Route path="/dm" component={DM} />
            </div>
        </Router>
    </Provider>, 
    document.getElementById('root'));
registerServiceWorker();
