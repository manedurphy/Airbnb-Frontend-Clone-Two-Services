import React, { useEffect } from 'react';
import Main from './components/main/Main';
import Top from './components/top/Top';
import Middle from './components/middle/Middle';
import { useDispatch, useSelector } from 'react-redux';
import {
    getHostedByState,
    handleGetHostedByData,
} from './redux/slices/hostedBy/hostedBySlice';

const App = ({ match: { params } }) => {
    const dispatch = useDispatch();
    const { host } = useSelector(getHostedByState);
    const { id } = params;

    useEffect(() => {
        dispatch(handleGetHostedByData(id));
    }, [id, dispatch]);
    return (
        host.name && (
            <Main>
                <Top host={host} />
                <Middle />
            </Main>
        )
    );
};

export default App;
