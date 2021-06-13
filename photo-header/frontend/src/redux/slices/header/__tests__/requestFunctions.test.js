import { getServiceData } from '../requestFunctions';
import { mockData } from '../../../../../../mock/mockData/frontend';

describe('Getting data from server', () => {
    test('should return array of 10 photos', async () => {
        const { photos } = await getServiceData(1);

        expect(photos).toHaveLength(10);
        expect(photos[0].PropertyId).toBe(1);
        expect(photos).toEqual(mockData[0].photos);
    });

    test('should return array of 5 photos', async () => {
        const { photos } = await getServiceData(78);

        expect(photos).toHaveLength(5);
        expect(photos[0].PropertyId).toBe(78);
        expect(photos).toEqual(mockData[2].photos);
    });
});
