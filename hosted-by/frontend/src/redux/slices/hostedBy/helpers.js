import axios from 'axios';

export const getHostedByData = async function (id) {
    const { data } = await axios.get(`/apps/airbnb-clone/api/hosted-by/${id}`);
    return data;
};
