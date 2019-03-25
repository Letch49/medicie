const brain = require('brain.js');
const _ = require('lodash');
const testData = require('./data.json');
const fs = require('fs');

const renderInput = (e) => {
    return {
        "hid": parseInt(e.hid),
        [e.diagnosis]: 1,
        "age": parseInt(e.age),
        "sex": e.sex ,
        [String(e.palpation).toLowerCase()]: 1,
        "stomach": e.stomach == null ? 0 : parseFloat(e.stomach),
        "s_irritation": e.s_irritation == null ? 0 : parseFloat(e.s_irritation),
        "nausea": e.nausea == null ? 0 : parseFloat(e.nausea),
        [String(e.pain_right).toLowerCase()]: 1,
        "pain_upper": e.pain_upper == null ? 0 : parseFloat(e.pain_upper),
        "temperature": e.temperature == null ? 0 : parseFloat(e.temperature),
        "gall_bladder": e.gall_bladder == null ? 0 : parseFloat(e.gall_bladder),
        "alcohol": e.alcohol == null ? 0 : parseFloat(e.alcohol),
        "vomitting": e.vomitting == null ? 0 : parseFloat(e.vomitting),
        "dry_mouth": e.dry_mouth == null ? 0 : parseFloat(e.dry_mouth),
        "weakness": e.weakness == null ? 0 : parseFloat(e.weakness),
        [e.diseases]: 1,
        "hemoglobin": e.hemoglobin == null ? 0 : parseFloat(e.hemoglobin),
        "erythrocyte:": e.erythrocyte == null ? 0 : parseFloat(e.erythrocyte),
        "leukocyte": e.leukocyte == null ? 0 : parseFloat(e.leukocyte),
        [e.tongue]: 1,
        [e.biochemistry]: e.biochemistry === "" ? 0 : 1
    }
}

const renderOutput = (e) => {
    const data = { 1: e.treatment }
    const my = _.invert(data);
    Object.keys(my).forEach(el => {
        my[el] = 1;
    });
    return my;
};

const eatMyNetwork = testData['list'].map(e => {
    const out = {
        "input": renderInput(e),
        "output": renderOutput(e)
    };
    return out;
});

// fs.writeFile('mydata.json',JSON.stringify(eatMyNetwork), (err) => {
//     if (err) {
//         console.log(err);
//     }
// })

const data = JSON.parse(fs.readFileSync('mydata.json', 'utf8'))
const network = new brain.NeuralNetwork();

const run = network.train(data, {
    errorThresh: 0.0001, // порог ошибок, которого нужно достичь
    iterations: 20000, // максимальное число итераций обучения
    log: true, // нужен ли периодический console.log()
    logPeriod: 1000, // число итераций между логированиями
    learningRate: 0.6, // степень обучения
    hiddenLayers: [15, 5, 2],
    activation: 'sigmoid'
});
console.log(run);

// const output = network.run(renderInput({}));
const output = network.run({
    "hid": 29,
    "Острый калькулезный холецистит": 1,
    "age": 57,
    "Ж": 1,
    "напряженность мышц передней брюшной стенки": 1,
    "stomach": 0,
    "s_irritation": 0,
    "nausea": 1,
    "интенсивная": 1,
    "pain_upper": 0,
    "temperature": 0,
    "gall_bladder": 1,
    "alcohol": 1,
    "vomitting": 1,
    "dry_mouth": 0,
    "weakness": 1,
    "ЖКБ": 1,
    "hemoglobin": 111,
    "erythrocyte:": 4,
    "leukocyte": 15,
    "Чистый": 1,
    "": 0
});

const getMaxValue = (obj) => {
    return Object.keys(obj).reduce((prev, curr) => (obj[prev] > obj[curr]) ? [prev, obj[prev]] : [curr, obj[curr]]);
}
fs.writeFile('result.json', JSON.stringify(output), (err) => {
    if (err) {
        console.log(err);
    }
})

console.log(getMaxValue(output));
