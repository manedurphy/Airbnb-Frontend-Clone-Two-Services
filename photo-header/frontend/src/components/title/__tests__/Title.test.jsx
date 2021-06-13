import React from 'react';
import Title from '../Title';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import { handleGetServiceData } from '../../../redux/slices/header/HeaderServiceSlice';

describe('Title.jsx with mock data index 0', () => {
    beforeEach(() => store.dispatch(handleGetServiceData(1)));

    test('should render with proper title and subdetails, and icons', (done) => {
        const { getByText } = render(
            <Provider store={store}>
                <Title showIcons={true} />
            </Provider>
        );

        setTimeout(() => {
            expect(getByText('Share')).toBeInTheDocument();
            expect(getByText('Save')).toBeInTheDocument();
            expect(
                getByText('Lorem ipsum dolor sit amet, consectetur adipiscing')
            ).toBeInTheDocument();
            expect(getByText('Superhost')).toBeInTheDocument();
            expect(getByText('4.52')).toBeInTheDocument();
            expect(getByText('(151)')).toBeInTheDocument();
            done();
        }, 1500);
    });

    test('should render with proper title and subdetails, WITHOUT icons', (done) => {
        const { getByText, queryByText } = render(
            <Provider store={store}>
                <Title showIcons={false} />
            </Provider>
        );

        setTimeout(() => {
            expect(queryByText('Share')).not.toBeInTheDocument();
            expect(queryByText('Save')).not.toBeInTheDocument();
            expect(
                getByText('Lorem ipsum dolor sit amet, consectetur adipiscing')
            ).toBeInTheDocument();
            expect(getByText('Superhost')).toBeInTheDocument();
            expect(getByText('4.52')).toBeInTheDocument();
            expect(getByText('(151)')).toBeInTheDocument();
            done();
        }, 1500);
    });
});

describe('Title.jsx with mock data index 1', () => {
    beforeEach(() => store.dispatch(handleGetServiceData(2)));

    test('should render with proper title and subdetails, and icons', (done) => {
        const { getByText, queryByText } = render(
            <Provider store={store}>
                <Title showIcons={true} />
            </Provider>
        );

        setTimeout(() => {
            expect(getByText('Share')).toBeInTheDocument();
            expect(getByText('Save')).toBeInTheDocument();
            expect(
                getByText('Mi in nulla posuere sollicitudin aliquam ultrices')
            ).toBeInTheDocument();
            expect(queryByText('Superhost')).not.toBeInTheDocument();
            expect(getByText('4.16')).toBeInTheDocument();
            expect(getByText('(50)')).toBeInTheDocument();
            done();
        }, 1500);
    });

    test('should render with proper title and subdetails, WITHOUT icons', (done) => {
        const { getByText, queryByText } = render(
            <Provider store={store}>
                <Title showIcons={false} />
            </Provider>
        );

        setTimeout(() => {
            expect(queryByText('Share')).not.toBeInTheDocument();
            expect(queryByText('Save')).not.toBeInTheDocument();
            expect(
                getByText('Mi in nulla posuere sollicitudin aliquam ultrices')
            ).toBeInTheDocument();
            expect(queryByText('Superhost')).not.toBeInTheDocument();
            expect(getByText('4.16')).toBeInTheDocument();
            expect(getByText('(50)')).toBeInTheDocument();
            done();
        }, 1500);
    });
});
