const eatMyNetwork = testData['list'].map(renderAll);


// fs.writeFileSync('mydata.json', JSON.stringify(eatMyNetwork));

// const data = JSON.parse(fs.readFileSync('mydata.json', 'utf8'));

// const network = new brain.NeuralNetwork();

// const run = network.train(data, {
//     errorThresh: 0.005,
//     iterations: 50000,
//     log: false,
//     logPeriod: 50,
//     learningRate: 0.2,
//     hiddenLayers: [20, 20, 5, 15, 3]
// });

// const test = testData['list'];

// let arr = new Array();
// test.forEach(e => {

//     const output = network.run(renderInput(e));
//     output['nowhid'] = e['hid'];
//     arr.push(output);
// });

// fs.writeFile('result.json', JSON.stringify(arr), (err) => {
//     if (err) {
//         console.log(err);
//     }
// });

// const optionsTest = {
//     errorThresh: 0.005,
//     iterations: 50000,
//     log: true,
//     logPeriod: 50,
//     learningRate: 0.2,
// };