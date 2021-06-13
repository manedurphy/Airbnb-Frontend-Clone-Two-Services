import axios from 'axios';

export const getHostedByData = async function (id) {
    const { data } = await axios.get(`/api/hosted-by/${id}`);
    return data;
};
