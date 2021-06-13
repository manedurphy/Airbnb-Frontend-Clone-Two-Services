import React from 'react';
import Header from '../Header';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../../../redux/store';

test('should render with "share" & "save" text when showIcons state is true', () => {
    render(
        <Provider store={store}>
            <Header showIcons={true} />
        </Provider>
    );

    expect(screen.getByText('Share')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
});

test('should render with only share & save icons when showIcons state is false', () => {
    render(
        <Provider store={store}>
            <Header showIcons={false} />
        </Provider>
    );

    expect(screen.queryByText('Share')).not.toBeInTheDocument();
    expect(screen.queryByText('Save')).not.toBeInTheDocument();
});
