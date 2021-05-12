import { getHostedByData } from '../helpers';

test('should get hostedBy data by propertyId', async () => {
    const data = await getHostedByData(85);

    expect(data.id).toBe(85);
    expect(data.Host.name).toBe('Avery');
    expect(data.CoHosts).toHaveLength(1);
});
