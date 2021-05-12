import React from 'react';
import Top from '../Top';
import { render } from '@testing-library/react';

describe('Top component', () => {
    test('should render props to screen', () => {
        const hostProps = {
            name: 'Mark',
            joinedOn: '2021-01-25T08:00:00.000Z',
            avatar: 'https://randomuser.me/api/portraits/women/66.jpg',
        };

        const { getByText, getByRole } = render(<Top host={hostProps} />);

        expect(getByText('Hosted by Mark')).toBeInTheDocument();
        expect(getByText('Joined in January 2021')).toBeInTheDocument();
        expect(getByRole('img', { name: 'host' })).toBeInTheDocument();
    });
});
