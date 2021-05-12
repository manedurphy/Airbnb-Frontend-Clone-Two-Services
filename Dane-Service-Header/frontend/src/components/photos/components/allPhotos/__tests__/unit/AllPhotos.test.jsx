import React from 'react';
import AllPhotos from '../../AllPhotos';
import { mockData } from '../../../../../../../../mock/mockData/frontend';
import { store } from '../../../../../../redux/store';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

test('should render first five images in data set', async () => {
    render(
        <Provider store={store}>
            <AllPhotos photos={mockData[0].photos} />
        </Provider>
    );

    const images = await screen.findAllByRole('img', { name: 'house' });

    expect(mockData[0].photos.length).toBe(10);
    expect(images).toHaveLength(5);
});
