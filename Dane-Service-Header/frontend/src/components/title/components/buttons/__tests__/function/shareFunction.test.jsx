import React from 'react';
import Share from '../../Share';
import ShareModal from '../../../../../modal/share/ShareModal';
import { Provider } from 'react-redux';
import { store } from '../../../../../../redux/store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('should activate the share modal onto the page', () => {
    render(
        <Provider store={store}>
            <Share />
            <ShareModal />
        </Provider>
    );
    const shareBtn = screen.getByText('Share');
    const shareModal = screen.getByText(
        'Share this place with friends and family'
    );

    expect(shareModal).not.toBeVisible();
    userEvent.click(shareBtn);

    expect(shareModal).toBeVisible();
});
