import axios from 'axios';

export async function getServiceData(id) {
    const { data } = await axios.get(`/api/headerService/${id}`);
    return data;
}
