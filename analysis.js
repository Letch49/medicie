/**
 * 
 * @param {array} arr1 список анализов
 * @param {array} arr2 текущие анализы на пациента
 * @returns возвращаем список анализов, если нет в текущем, то заменяем на 0
 */
const bioanalysis = (arr1, arr2) => {
    const bio = arr1.map((el, index) => {
        for (let i of arr2) {
            i = i.split(':').map(el => el.trim())
            const [name, reslut] = [i[0], i[1]];
            if (el === name) {
                const normalAray = normal(el);
                return miniMax(reslut, normalAray[0], normalAray[1]);
            }
        }
        return 0;
    });
    return bio;
};


// Нормализация с использованием минимаксной функции.
const miniMax = (val, min, max) => {
    const [minV, maxV] = [0, 1];
    return (((val - min) * (maxV - minV)) / (max - min)) + minV
};
const miniMaxFromArray = (cur, arr) => {
    return miniMax(cur, arr[0], arr[1]);
};

// Возвращает максмальное значение для параметра
const normal = (name) => {
    const analysis = {
        'Общий белок': [56, 80],
        'Альбумин': [27, 40],
        'Креатинин': [62, 177],
        'Мочевина': [3.3, 6.7],
        'Билирубин общий': [3, 53],
        'Глюкоза': [3.4, 8.3],
        'АСТ': [123, 400],
        'АЛТ': [0, 20.5],
        'Билирубин прямой': [0, 15],
        'Билирубин непрямой': [0, 40], // not found взято рандомно
        'Альфа-Амилаза': [0, 30], // not found взято рандомно
        'Лактатдегидрогеназа': [13, 105] // not found взято рандомно
    }
    return analysis[name];
}


const getHemoglobin = (sex, years, curr) => {
    if (years >= 65) {
        return sex === 'М' ? miniMaxFromArray(curr, [125, 165]) : miniMaxFromArray(curr, [120, 157]);
    } else {
        return sex === 'М' ? miniMaxFromArray(curr, [130, 160]) : miniMaxFromArray(curr, [120, 155]);
    }
};

const getErythrocyte = (years, curr) => {
    const getMe = () => {
        if (years >= 65) {
            return [3.1, 5.7]
        } else if (years >= 50) {
            return [3.9, 5.6]
        } else if (years >= 36) {
            return [4.1, 5.6]
        } else if (years >= 30) {
            return [3.9, 5.5]
        } else {
            return [4.0, 5.8]
        }
    }
    return miniMaxFromArray(curr,getMe());
};

const getNormalizeValueWithNull = (val) => val === null ? 0 : parseFloat(val);
const getSex = (sex) => sex === 'М' ? 1 : 2;

module.exports = {
    'getBio': bioanalysis,
    'getSex': getSex,
    'getNormal': getNormalizeValueWithNull,
    'getHemoglobin': getHemoglobin,
    'getErythrocyte': getErythrocyte
}