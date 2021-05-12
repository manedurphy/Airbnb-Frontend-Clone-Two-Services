import React from 'react';
import Right from '../Right';
import { render } from '@testing-library/react';
import { store } from '../../../../../redux/store';
import { setHostedByState } from '../../../../../redux/slices/hostedBy/hostedBySlice';
import { mockData } from '../../../../../mocks/mockData';
import { Provider } from 'react-redux';

test('should dynamically render response time and response rate from the store', () => {
    store.dispatch(setHostedByState(mockData[0]));
    const { getByText } = render(
        <Provider store={store}>
            <Right />
        </Provider>
    );

    expect(getByText('Response rate: 95%')).toBeInTheDocument();
    expect(getByText('Response time: within a week')).toBeInTheDocument();
});

test('should render "within a day" if the response time of the host is less than 24 hours', () => {
    store.dispatch(setHostedByState(mockData[1]));
    const { getByText } = render(
        <Provider store={store}>
            <Right />
        </Provider>
    );

    expect(getByText('Response time: within a day')).toBeInTheDocument();
});
