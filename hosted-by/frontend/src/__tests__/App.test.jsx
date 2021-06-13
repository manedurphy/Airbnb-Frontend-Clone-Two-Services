import React from 'react';
import App from '../App';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

describe('dispatching received data to redux store on render', () => {
    test('should see data with propertyId of 85 in store', (done) => {
        render(
            <Provider store={store}>
                <App match={{ params: { id: 85 } }} />
            </Provider>
        );

        setTimeout(() => {
            expect(store.getState().hostedBy.responseTime).toBe(103);
            expect(store.getState().hostedBy.host.name).toBe('Avery');
            done();
        }, 1500);
    });

    test('should see data with propertyId of 14 in store', (done) => {
        render(
            <Provider store={store}>
                <App match={{ params: { id: 14 } }} />
            </Provider>
        );

        setTimeout(() => {
            expect(store.getState().hostedBy.responseTime).toBe(9);
            expect(store.getState().hostedBy.host.name).toBe('Maxim');
            done();
        }, 1500);
    });
});

describe('passing props to Top component', () => {
    test('should pass props to Top component and display them', async () => {
        const { findByText, findByRole } = render(
            <Provider store={store}>
                <App match={{ params: { id: 85 } }} />
            </Provider>
        );

        expect(await findByText('Hosted by Avery')).toBeInTheDocument();
        expect(await findByText('Joined in January 2021')).toBeInTheDocument();
        expect(await findByRole('img', { name: 'host' })).toBeInTheDocument();
    });
});
