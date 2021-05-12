export const convertDate = function (strDate) {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const date = new Date(strDate);
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${year}`;
};
