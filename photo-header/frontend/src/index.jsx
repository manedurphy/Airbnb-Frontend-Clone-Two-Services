import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <Route exact path={'/apps/airbnb-clone/rooms/:id'} component={App} />
        </Provider>
    </Router>,
    document.getElementById('header'),
);
