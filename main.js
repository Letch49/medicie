const brain = require('brain.js');
const _ = require('lodash');
const testData = require('./data.json');
const fs = require('fs');
const fn = require('./analysis');

const biochemistry_raw = testData['biochemistry_types'];
const renderInput = e => {
    const newObj = {
        // "treatment": e.treatment,
        // "diagnosis": e.diagnosis,
        "age": parseInt(e.age) / 100,
        "sex": fn.getSex(e.sex) / 2,
        // "palpation": e.palpation,
        "stomach": fn.getNormal(e.stomach),
        "s_irritation": fn.getNormal(e.s_irritation),
        "nausea": fn.getNormal(e.nausea),
        // "paint_right": e.paint_right,
        "pain_upper": fn.getNormal(e.pain_upper),
        "temperature": fn.getNormal(e.temperature) / 42,
        "gall_bladder": fn.getNormal(e.gall_bladder),
        "alcohol": fn.getNormal(e.alcohol),
        "vomitting": fn.getNormal(e.vomitting),
        "dry_mouth": fn.getNormal(e.dry_mouth),
        "weakness": fn.getNormal(e.weakness),
        // "diseases": e.diseases,
        "hemoglobin": fn.getHemoglobin(e.sex, e.age, fn.getNormal(e.hemoglobin)),
        "erythrocyte:": fn.getErythrocyte(e.age, fn.getNormal(e.erythrocyte)),
        "leukocyte": fn.getNormal(e.leukocyte),
        // "tongue": e.tongue,
        "biochemistry": fn.getBio(biochemistry_raw, e.biochemistry_raw)
    }
    let arr = new Array();
    Object.keys(newObj).forEach(el => {
        arr.push(newObj[el]);
    });
    console.log(_.flatten(arr))
    return _.flatten(arr);
};

const renderOutput = e => {
    return { [e.hid]: 1 }
};

const eatMyNetwork = testData['list'].map(e => {
    return {
        "input": renderInput(e),
        "output": renderOutput(e)
    };
});


fs.writeFileSync('mydata.json', JSON.stringify(eatMyNetwork))

const data = JSON.parse(fs.readFileSync('mydata.json', 'utf8'))
const network = new brain.NeuralNetwork();

const run = network.train(data, {
    errorThresh: 0.005,
    iterations: 50000,
    log: true,
    logPeriod: 50,
    learningRate: 0.2,
    hiddenLayers: [20, 20, 5, 15, 3]
});
console.log(run);

// const output = network.run(renderInput(testData['list'][5]));
const output = network.run(renderInput({
    "hid": "105",
    "treatment": " \u041e\u043c\u0435\u043f\u0440\u0430\u0437\u043e\u043b \u043a\u0430\u043f\u0441. 20 \u043c\u0433; per os, [1 \u043a\u0430\u043f\u0441] 2 \u0440. \u0432 \u0434\u0435\u043d\u044c \u0423\/\u0412 \u0441 02.02 \u043f\u043e 04.02  3. \u0421\u043e\u0441\u0442\u0430\u0432\u043d\u043e\u0439 \u043f\u0440\u0435\u043f\u0430\u0440\u0430\u0442 \u0432\/\u0432, 1 \u0440. \u0432 \u0434\u0435\u043d\u044c \u0423 02.02  \u041d\u0430\u0442\u0440\u0438\u044f \u0445\u043b\u043e\u0440\u0438\u0434 \u041f\u0424 \u0440-\u0440 0,9%, [3600 \u043c\u0433 - 400 \u043c\u043b]  \u0414\u0440\u043e\u0442\u0430\u0432\u0435\u0440\u0438\u043d-\u042d\u043b\u043b\u0430\u0440\u0430 \u0440-\u0440 2%, [80 \u043c\u0433 - 4 \u043c\u043b]  \u041c\u0435\u0442\u043e\u043a\u043b\u043e\u043f\u0440\u0430\u043c\u0438\u0434 \u0440-\u0440 0,5%, [10 \u043c\u0433 - 2 \u043c\u043b]  4. \u0413\u043b\u044e\u043a\u043e\u0437\u0430 \u041f\u0424 \u0440-\u0440 5%; \u0432\/\u0432, [20000 \u043c\u0433 - 400 \u043c\u043b] 1 \u0440. \u0432 \u0434\u0435\u043d\u044c \u0423 02.02  5. \u0414\u0438\u043a\u043b\u043e\u0444\u0435\u043d\u0430\u043a \u0440-\u0440 2,5%; \u0432\/\u043c, [75 \u043c\u0433 - 3 \u043c\u043b] 2 \u0440. \u0432 \u0434\u0435\u043d\u044c \u0423\/\u0412 \u0441 02.02 \u043f\u043e 03.02",
    "diagnosis": "\u041e\u0441\u0442\u0440\u044b\u0439 \u043a\u0430\u043b\u044c\u043a\u0443\u043b\u0435\u0437\u043d\u044b\u0439 \u0445\u043e\u043b\u0435\u0446\u0438\u0441\u0442\u0438\u0442",
    "age": "26",
    "sex": "\u0416",
    "palpation": "\u0411\u043e\u043b\u0435\u0437\u043d\u0435\u043d\u043d\u043e\u0441\u0442\u044c \u0432 \u043f\u0440\u0430\u0432\u043e\u043c \u043f\u043e\u0434\u0440\u0435\u0431\u0435\u0440\u044c\u0435",
    "stomach": "1",
    "s_irritation": "0",
    "nausea": "0",
    "pain_right": "\u0423\u043c\u0435\u0440\u0435\u043d\u043d\u044b\u0435",
    "pain_upper": "0",
    "temperature": null,
    "gall_bladder": "1",
    "alcohol": "1",
    "vomitting": "0",
    "dry_mouth": "0",
    "weakness": "1",
    "diseases": null,
    "hemoglobin": "149",
    "erythrocyte": "3.3",
    "leukocyte": "4.1",
    "tongue": "\u0421\u0443\u0445\u043e\u0439, \u0427\u0438\u0441\u0442\u044b\u0439",
    "biochemistry": "\u041e\u0431\u0449\u0438\u0439 \u0431\u0435\u043b\u043e\u043a: 73.8, \u041a\u0440\u0435\u0430\u0442\u0438\u043d\u0438\u043d: 71, \u041c\u043e\u0447\u0435\u0432\u0438\u043d\u0430: 6.9, \u0411\u0438\u043b\u0438\u0440\u0443\u0431\u0438\u043d \u043e\u0431\u0449\u0438\u0439: 3.6, \u0411\u0438\u043b\u0438\u0440\u0443\u0431\u0438\u043d \u043f\u0440\u044f\u043c\u043e\u0439: 3, \u0411\u0438\u043b\u0438\u0440\u0443\u0431\u0438\u043d \u043d\u0435\u043f\u0440\u044f\u043c\u043e\u0439: 3.3, \u0413\u043b\u044e\u043a\u043e\u0437\u0430: 7.4, \u0410\u0421\u0422: 19, \u0410\u041b\u0422: 26",
    "biochemistry_raw": [
        "\u041e\u0431\u0449\u0438\u0439 \u0431\u0435\u043b\u043e\u043a: 98.8",
        "\u041a\u0440\u0435\u0430\u0442\u0438\u043d\u0438\u043d: 78",
        "\u041c\u043e\u0447\u0435\u0432\u0438\u043d\u0430: 4.9",
        "\u0411\u0438\u043b\u0438\u0440\u0443\u0431\u0438\u043d \u043e\u0431\u0449\u0438\u0439: 2.6",
        "\u0411\u0438\u043b\u0438\u0440\u0443\u0431\u0438\u043d \u043f\u0440\u044f\u043c\u043e\u0439: 2",
        "\u0411\u0438\u043b\u0438\u0440\u0443\u0431\u0438\u043d \u043d\u0435\u043f\u0440\u044f\u043c\u043e\u0439: 2.8",
        "\u0413\u043b\u044e\u043a\u043e\u0437\u0430: 6.1",
        "\u0410\u0421\u0422: 10",
        "\u0410\u041b\u0422: 24"
    ]
}))

fs.writeFile('result.json', JSON.stringify(output), (err) => {
    if (err) {
        console.log(err);
    }
});
