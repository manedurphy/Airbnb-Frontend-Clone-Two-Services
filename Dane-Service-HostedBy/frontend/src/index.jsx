import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { store } from './redux/store';

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <Route exact path="/rooms/:id" component={App} />
        </Provider>
    </Router>,
    document.getElementById('hostedby')
);
