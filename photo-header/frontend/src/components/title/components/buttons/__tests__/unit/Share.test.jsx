import React from 'react';
import Share from '../../Share';
import { Provider } from 'react-redux';
import { store } from '../../../../../../redux/store';
import { render, screen } from '@testing-library/react';

test('should render and have style underline', () => {
    render(
        <Provider store={store}>
            <Share />
        </Provider>
    );

    const shareIcon = screen.getByText('Share');

    expect(shareIcon).toBeInTheDocument();
    expect(shareIcon).toHaveStyle({
        textDecoration: 'underline',
    });
});
