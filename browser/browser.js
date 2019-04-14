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
    return analysis[name] ? analysis[name] : [0,0];
}

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

const bioanalysis = (arr1, arr2) => {
    const bio = arr1.map((el, index) => {
        for (let i of arr2) {
            const key = Object.keys(i).shift();
            const val = i[key];
            i = [key,val].join(':');
            i = i.split(':').map(el => el.trim())
            const [name, reslut] = [i[0], i[1]];
            if (el === name) {
                return miniMax(reslut, normal(el)[0], normal(el)[1]);
            }
        }
        return 0;
    });
    return bio;
};



const getNormalizeValueWithNull = (val) => val === null ? 0 : parseFloat(val);

const getHemoglobin = (sex, years, curr) => miniMaxFromArray(curr, [0, 210]);
const getErythrocyte = (years, curr) => miniMaxFromArray(curr,[3,6]);
const getleukocyte = (curr) => miniMaxFromArray(curr,[0,20])
const getSex = (sex) => sex === 'М' ? 2 : 3;
const getTemperature = (val) => miniMax(val,32,42);

const getNormal = getNormalizeValueWithNull;
const getBio = bioanalysis;

const renderInput = (e, biochemistry_types) => {
    console.log(biochemistry_types)
    const newObj = {
        // "treatment": e.treatment,
        // "diagnosis": e.diagnosis,
        "age": (parseInt(e.age) / 120).toFixed(2),
        "sex": getSex(e.sex),
        // "palpation": e.palpation,
        "stomach": getNormal(e.stomach),
        "s_irritation": getNormal(e.s_irritation),
        "nausea": getNormal(e.nausea),
        // "paint_right": e.paint_right,
        "pain_upper": getNormal(e.pain_upper),
        "temperature": getTemperature(getNormal(e.temperature)),
        "gall_bladder": getNormal(e.gall_bladder),
        "alcohol": getNormal(e.alcohol),
        "vomitting": getNormal(e.vomitting),
        "dry_mouth": getNormal(e.dry_mouth),
        "weakness": getNormal(e.weakness),
        // "diseases": e.diseases,
        "hemoglobin": getHemoglobin(e.sex, e.age, getNormal(e.hemoglobin)),
        "erythrocyte:": getErythrocyte(e.age, getNormal(e.erythrocyte)),
        "leukocyte": getleukocyte(e.age, getNormal(e.leukocyte)),
        // "tongue": e.tongue,
        "biochemistry": getBio(biochemistry_types, e.biochemistry_raw)
    }
    let arr = new Array();
    Object.keys(newObj).forEach(el => {
        arr.push(newObj[el]);
    });
    return _.flatten(arr);
};

const renderOutput = e => {
    return { [e.hid]: 1 }
};

const renderAll = (e, biochemistry_types)=> {
    return {
        "input": renderInput(e,biochemistry_types),
        "output": renderOutput(e)
    }
}

const optionsTest = {
    errorThresh: 0.005,
    iterations: 50000,
    log: true,
    logPeriod: 50,
    learningRate: 0.2,
};

/**
 * 
 * @param {JSON array} data json объект со всеми данными
 * @param {*} options опции для нейросети
 * @returns JSON объект, который необходимо сохранить в отдельный файл
 */
const trainNetwork = (data, options = optionsTest) => {
    const biochemistry_types = data['biochemistry_types'];
    // console.log(data['list']);
    const trainData = data['list'].map(e => renderAll(e, biochemistry_types));
    const network = new brain.NeuralNetwork();
    const train = network.train(trainData,options);
    return JSON.stringify(network.toJSON(train));
}

/**
 * 
 * @param {JSON object} data json объект с единичным прецендентом
 * @param {JSON object} networkState данные с обучением нейросети
 */
const runNetwork = (data,networkState, biochemistry_types) => {
    const network = new brain.NeuralNetwork();
    network.fromJSON(JSON.parse(networkState));
    return network.run(renderInput(data, biochemistry_types));
}
