import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    stages: [
        { duration: '2m', target: 50 },
        { duration: '9m', target: 50 },
        { duration: '1m', target: 0 },
    ],

    thresholds: {
        http_req_duration: ['p(99)<1000'],
        http_req_failed: ['rate<0.01'],
    },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
    let responses;
    const BASE_URL = 'http://45.79.230.251';
    const roomNumber = Math.floor(Math.random() * 100 + 1);

    responses = http.batch([
        ['GET', `${BASE_URL}/rooms/1`, null, { tags: { name: 'StaticFiles' } }],
        ['GET', `${BASE_URL}/api/photo-header/${roomNumber}`, null, { tags: { name: 'PhotoHeaderData' } }],
        ['GET', `${BASE_URL}/api/hosted-by/${roomNumber}`, null, { tags: { name: 'HostedBy' } }],
    ]);

    responses.forEach((res) => {
        check(res, {
            'status code is 200': (r) => r.status === 200,
        });
    });

    sleep(1);
}
