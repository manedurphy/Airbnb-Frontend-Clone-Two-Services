import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { store } from './redux/store';

// Comment out for production build
//import './index.css'

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <Route exact path={'/apps/airbnb-clone/rooms/:id'} component={App} />
        </Provider>
    </Router>,
    document.getElementById('hostedby')
);
