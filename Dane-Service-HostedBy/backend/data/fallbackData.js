module.exports = {
    id: 1,
    duringYourStay:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus nulla at volutpat diam ut venenatis tellus. Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Lobortis mattis aliquam faucibus purus in massa tempor nec feugiat. Viverra justo nec ultrices dui sapien. Tortor id aliquet lectus proin nibh nisl. Habitasse platea dictumst quisque sagittis purus sit. In metus vulputate eu scelerisque felis imperdiet proin. Morbi tristique senectus et netus et malesuada fames ac turpis. Odio tempor orci dapibus ultrices in iaculis nunc sed. Quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper',
    responseTime: 9,
    responseRate: 25,
    HostId: 1,
    PropertyId: 1,
    Host: {
        id: 1,
        name: 'Konnor',
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        numberOfReviews: 453,
        identityVerified: true,
        isSuperhost: false,
        avatar: 'https://randomuser.me/api/portraits/men/0.jpg',
        joinedOn: '2013-11-22T08:00:00.000Z',
        HostLanguages: [
            {
                LanguageId: 7,
                Language: {
                    name: 'Russian',
                },
            },
            {
                LanguageId: 2,
                Language: {
                    name: 'French',
                },
            },
        ],
    },
    CoHosts: [
        {
            id: 1,
            HostId: 101,
            HostedById: 1,
            Host: {
                name: 'Elvis',
                avatar: 'https://randomuser.me/api/portraits/women/50.jpg',
            },
        },
        {
            id: 2,
            HostId: 102,
            HostedById: 1,
            Host: {
                name: 'Sidney',
                avatar: 'https://randomuser.me/api/portraits/women/51.jpg',
            },
        },
    ],
};
