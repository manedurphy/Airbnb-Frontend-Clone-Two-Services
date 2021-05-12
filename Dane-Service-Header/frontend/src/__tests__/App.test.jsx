import React from 'react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

//NOTE: Expecting 2 of several elements due to desktop and mobile views
describe('End to end behavior for header service', () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <App match={{ params: { id: 1 } }} />
            </Provider>
        );
    });

    test('should render with mock data index 0', (done) => {
        setTimeout(() => {
            expect(screen.getAllByText('Superhost')).toHaveLength(2);
            expect(screen.getByText('Share')).toBeInTheDocument();
            expect(screen.getByText('Save')).toBeInTheDocument();
            expect(
                screen.getAllByText(
                    'Lorem ipsum dolor sit amet, consectetur adipiscing'
                )
            ).toHaveLength(2);
            expect(
                screen.getAllByText(
                    'South Lake Tahoe, California, United States'
                )
            ).toHaveLength(2);
            expect(screen.getAllByText('4.52')).toHaveLength(2);
            expect(screen.getAllByText('(151)')).toHaveLength(2);
            expect(screen.getByText('Show all photos')).toBeInTheDocument();
            done();
        }, 1500);
    });

    test('Share button should display the share modal', () => {
        expect(screen.getByText('Facebook')).not.toBeVisible();

        const shareBtn = screen.getByText('Share');
        userEvent.click(shareBtn);

        expect(screen.getByText('Facebook')).toBeVisible();
    });

    test('Save button should change text from "Save" to "Saved"', () => {
        expect(screen.getByText('Save')).toBeInTheDocument();
        expect(screen.queryByText('Saved')).not.toBeInTheDocument();

        const saveBtn = screen.getByText('Save');
        userEvent.click(saveBtn);

        expect(screen.queryByText('Save')).not.toBeInTheDocument();
        expect(screen.getByText('Saved')).toBeInTheDocument();
    });

    test('Clicking the "Show all photos" button should activate the main modal, and clicking the "Close" button should hide it', () => {
        const showAllBtn = screen.getByText('Show all photos');
        const mainModal = screen.getByTestId('main-modal');
        const closeBtn = screen.getByText('Close');

        expect(mainModal).toHaveStyle('bottom: -100%');
        userEvent.click(showAllBtn);

        expect(mainModal).not.toHaveStyle('bottom: -100%');
        userEvent.click(closeBtn);

        expect(mainModal).toHaveStyle('bottom: -100%');
    });

    test('Directional buttons should change the photo being viewed by the user', (done) => {
        const rightBtn = screen.getByTestId('right');
        const leftBtn = screen.getByTestId('left');
        const desc1 = 'Sollicitudin aliquam ultrices sagittis orci';
        const desc2 = 'Eget mauris pharetra et ultrices neque';
        expect(screen.getByText(desc1)).toBeInTheDocument();
        expect(screen.queryByText(desc2)).not.toBeInTheDocument();

        userEvent.click(rightBtn);
        setTimeout(() => {
            expect(screen.queryByText(desc1)).not.toBeInTheDocument();

            expect(screen.getByText(desc2)).toBeInTheDocument();

            userEvent.click(leftBtn);

            setTimeout(() => {
                expect(screen.getByText(desc1)).toBeInTheDocument();
                expect(screen.queryByText(desc2)).not.toBeInTheDocument();
                done();
            }, 1000);
        }, 1000);
    });
});
