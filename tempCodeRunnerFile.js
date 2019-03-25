const getMaxValue = (obj) => {
    return Object.keys(obj).reduce((prev, curr) => (obj[prev] > obj[curr]) ? [prev, obj[prev]] : [curr, obj[curr]]);
}