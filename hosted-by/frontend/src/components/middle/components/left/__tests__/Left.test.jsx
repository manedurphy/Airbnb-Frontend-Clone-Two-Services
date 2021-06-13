import React from 'react';
import Left from '../Left';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../../../redux/store';
import { setHostedByState } from '../../../../../redux/slices/hostedBy/hostedBySlice';
import { mockData } from '../../../../../mocks/mockData';

describe('LeftTop: displaying badges dynamically', () => {
    test('should display identity and superhost badges', () => {
        store.dispatch(setHostedByState(mockData[0]));

        const { getByText } = render(
            <Provider store={store}>
                <Left />
            </Provider>
        );

        expect(getByText('Identity verified')).toBeInTheDocument();
        expect(getByText('Superhost')).toBeInTheDocument();
        expect(getByText('751 Reviews')).toBeInTheDocument();
    });

    test('should NOT display identity and superhost badges', () => {
        store.dispatch(setHostedByState(mockData[1]));

        const { getByText, queryByText } = render(
            <Provider store={store}>
                <Left />
            </Provider>
        );

        expect(queryByText('Identity verified')).not.toBeInTheDocument();
        expect(queryByText('Superhost')).not.toBeInTheDocument();
        expect(getByText('610 Reviews')).toBeInTheDocument();
    });
});

describe('LeftMiddle: rendering "about" & "duringYourStay" info from user', () => {
    test('should pass about information as props and render', () => {
        store.dispatch(setHostedByState(mockData[0]));

        const { getByText } = render(
            <Provider store={store}>
                <Left />
            </Provider>
        );

        const about = 'Id leo in vitae turpis massa sed elementum tempus';
        expect(getByText(about)).toBeInTheDocument();
    });

    test('should only show "read more" button if text is more than 29 words', () => {
        store.dispatch(setHostedByState(mockData[1]));

        const { getAllByRole } = render(
            <Provider store={store}>
                <Left />
            </Provider>
        );

        const readMoreBtn = getAllByRole('button', { name: 'read more' })[0];
        expect(readMoreBtn).toBeInTheDocument();
    });

    test('"read more" button should disappear and show more text on click', () => {
        store.dispatch(setHostedByState(mockData[1]));

        const { getByText, getAllByRole, queryByText } = render(
            <Provider store={store}>
                <Left />
            </Provider>
        );

        const readMoreBtn = getAllByRole('button', { name: 'read more' })[0];
        const about = mockData[1].Host.about;

        expect(readMoreBtn).toBeInTheDocument();
        expect(queryByText(about)).not.toBeInTheDocument();

        userEvent.click(readMoreBtn);

        expect(readMoreBtn).not.toBeInTheDocument();
        expect(getByText(about)).toBeInTheDocument();
    });

    test('"read more" button should show full description of "during your stay" section', () => {
        store.dispatch(setHostedByState(mockData[1]));

        const { getByText, getAllByRole, queryByText } = render(
            <Provider store={store}>
                <Left />
            </Provider>
        );

        const readMoreBtn = getAllByRole('button', { name: 'read more' })[1];
        const duringYourStay = mockData[1].duringYourStay;

        expect(readMoreBtn).toBeInTheDocument();
        expect(queryByText(duringYourStay)).not.toBeInTheDocument();

        userEvent.click(readMoreBtn);

        expect(readMoreBtn).not.toBeInTheDocument();
        expect(getByText(duringYourStay)).toBeInTheDocument();
    });
});

describe('LeftMidde: Superhost conditional rendering', () => {
    test('should display Superhost description when host is a Superhost', () => {
        store.dispatch(setHostedByState(mockData[0]));

        const { getByText } = render(
            <Provider store={store}>
                <Left />
            </Provider>
        );

        expect(getByText('Avery is a Superhost')).toBeInTheDocument();
    });

    test('should NOT display Superhost description when host is a Superhost', () => {
        store.dispatch(setHostedByState(mockData[1]));

        const { queryByText } = render(
            <Provider store={store}>
                <Left />
            </Provider>
        );

        expect(queryByText('Maxim is a Superhost')).not.toBeInTheDocument();
    });
});
