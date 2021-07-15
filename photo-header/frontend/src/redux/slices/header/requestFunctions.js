import axios from 'axios';

export async function getServiceData(id) {
    const { data } = await axios.get(`/apps/airbnb-clone/api/photo-header/${id}`);
    return data;
}
