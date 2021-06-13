import React from 'react';
import Main from '../Main';
import { render } from '@testing-library/react';

test('should render', () => {
    const { getByTestId } = render(<Main />);

    const main = getByTestId('main');
    expect(main).toBeInTheDocument();
});
