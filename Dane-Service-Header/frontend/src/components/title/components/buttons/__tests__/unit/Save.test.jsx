import React from 'react';
import Save from '../../Save';
import { Provider } from 'react-redux';
import { store } from '../../../../../../redux/store';
import { render, screen } from '@testing-library/react';

test('should render', () => {
    render(
        <Provider store={store}>
            <Save />
        </Provider>
    );

    const svg = screen.queryByTitle('save-icon');
    expect(svg).toBeInTheDocument();
});
