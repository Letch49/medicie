const brain = require('brain.js');
const _ = require('lodash');
// const testData = require('./data.json');
// const fs = require('fs');
const fn = require('./analysis');

const renderInput = (e, biochemistry_types) => {
    console.log(biochemistry_types)
    const newObj = {
        // "treatment": e.treatment,
        // "diagnosis": e.diagnosis,
        "age": (parseInt(e.age) / 120).toFixed(2),
        "sex": fn.getSex(e.sex),
        // "palpation": e.palpation,
        "stomach": fn.getNormal(e.stomach),
        "s_irritation": fn.getNormal(e.s_irritation),
        "nausea": fn.getNormal(e.nausea),
        // "paint_right": e.paint_right,
        "pain_upper": fn.getNormal(e.pain_upper),
        "temperature": fn.getTemperature(fn.getNormal(e.temperature)),
        "gall_bladder": fn.getNormal(e.gall_bladder),
        "alcohol": fn.getNormal(e.alcohol),
        "vomitting": fn.getNormal(e.vomitting),
        "dry_mouth": fn.getNormal(e.dry_mouth),
        "weakness": fn.getNormal(e.weakness),
        // "diseases": e.diseases,
        "hemoglobin": fn.getHemoglobin(e.sex, e.age, fn.getNormal(e.hemoglobin)),
        "erythrocyte:": fn.getErythrocyte(e.age, fn.getNormal(e.erythrocyte)),
        "leukocyte": fn.getleukocyte(e.age, fn.getNormal(e.leukocyte)),
        // "tongue": e.tongue,
        "biochemistry": fn.getBio(biochemistry_types, e.biochemistry_raw)
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

// console.log(
//     runNetwork(testData['list'][0],trainNetwork(testData), testData['biochemistry_types'])
// )