import React from 'react';
import Icons from '../../Icons';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../../../../redux/store';

test('should render share and save buttons', () => {
    render(
        <Provider store={store}>
            <Icons />
        </Provider>
    );

    expect(screen.getByText('Share')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
});
