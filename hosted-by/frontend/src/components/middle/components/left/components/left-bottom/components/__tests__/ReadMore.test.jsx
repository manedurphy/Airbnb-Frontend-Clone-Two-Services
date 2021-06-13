import React from 'react';
import ReadMore from '../read-more/ReadMore';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';

test('should activate click handler', () => {
    const handleClick = jest.fn();

    const { getByRole } = render(<ReadMore handleClick={handleClick} />);
    const readMoreBtn = getByRole('button', { name: 'read more' });

    userEvent.click(readMoreBtn);
    expect(handleClick).toHaveBeenCalled();
});
