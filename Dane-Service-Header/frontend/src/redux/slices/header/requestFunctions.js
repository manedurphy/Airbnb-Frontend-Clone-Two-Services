import axios from 'axios';

export async function getServiceData(id) {
    const { data } = await axios.get(`/api/properties/${id}`);
    return data.property;
}
