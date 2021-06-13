import React from 'react';
import Save from '../../Save';
import { Provider } from 'react-redux';
import { store } from '../../../../../../redux/store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('renders new heart icon on click', () => {
    render(
        <Provider store={store}>
            <Save />
        </Provider>
    );

    const svg = screen.queryByTitle('save-icon');
    expect(svg).toBeInTheDocument();
    expect(svg).not.toHaveStyle({ color: 'red' });

    userEvent.click(svg);
    const svgRed = screen.queryByTitle('save-icon-red');

    expect(svgRed).toBeInTheDocument();
    expect(svg).not.toBeInTheDocument();
});
