import axios from 'axios';

export const getHostedByData = async function (id) {
    const { data } = await axios.get(`/api/hosted-by/${id}`);
    const hostedby = JSON.parse(data.hostedby);
    return hostedby;
};
