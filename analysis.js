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


/**
 * 
 * @param {Number} val текущее значение
 * @param {Number} min минимальное значение
 * @param {Number} max максимальное значение
 * @returns {Number} значение в диапозоне от 0 до 1
 */
const miniMax = (val, min, max) => {
    const [minV, maxV] = [0, 1];
    return val != 0 ? ((val - min) * (maxV - minV)) / (max - min) : 0;
};
/**
 * 
 * @param {Number} cur текущее значение
 * @param {Array} arr массив значений минимума и максимума соответственно
 * @returns {miniMax} функция miniMax
 */
const miniMaxFromArray = (cur, arr) => {
    return miniMax(cur, arr[0], arr[1]);
};

// Возвращает максмальное значение для параметра
const normal = (name) => {
    const analysis = {
        'Общий белок': [48, 100],
        'Альбумин': [20, 40],
        'Креатинин': [50, 177],
        'Мочевина': [2.8, 10.9],
        'Билирубин общий': [3, 53],
        'Глюкоза': [2.8, 20.8],
        'АСТ': [0, 700],
        'АЛТ': [0, 80],
        'Билирубин прямой': [0, 15],
        'Билирубин непрямой': [0, 20],
        'Альфа-Амилаза': [0, 100],
        'Лактатдегидрогеназа': [10, 300]
    }
    return analysis[name];
}


const getNormalizeValueWithNull = (val) => val === null ? 0 : parseFloat(val);

const getHemoglobin = (sex, years, curr) => miniMaxFromArray(curr, [0, 210]);
const getErythrocyte = (years, curr) => miniMaxFromArray(curr,[3,6]);
const getleukocyte = (curr) => miniMaxFromArray(curr,[0,20])
const getSex = (sex) => sex === 'М' ? 2 : 3;
const getTemperature = (val) => miniMax(val,32,42);

module.exports = {
    'getBio': bioanalysis,
    'getSex': getSex,
    'getNormal': getNormalizeValueWithNull,
    'getHemoglobin': getHemoglobin,
    'getErythrocyte': getErythrocyte,
    'getleukocyte': getleukocyte,
    'getTemperature': getTemperature
}