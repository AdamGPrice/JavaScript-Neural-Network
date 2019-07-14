let loadWeights;
let model

function preload() {
    loadWeights = loadStrings('weights.csv', 'csv');
}

function setup() {
    let writer = createWriter('weights.csv');

    model = new NeuralNetwork(2, 1);
    model.setLearningRate(0.8);
    model.setEpochSize(10);

    model.add(new Layer(16));
    model.add(new Layer(8));
    
    model.generate(loadWeights);
    
    console.log(model);
    
    let inputs = [
        [1, 1],
        [1, 0],
        [0, 1],
        [0, 0]
    ];
    
    let targets = [
        [0],
        [1],
        [1],
        [0]
    ];
    
    
    //model.train(inputs, targets);
    
    console.log("1, 1 = " + model.predict([1, 1])[0].toFixed(12));
    console.log("1, 0 = " + model.predict([1, 0])[0].toFixed(12));
    console.log("0, 1 = " + model.predict([0, 1])[0].toFixed(12));
    console.log("0, 0 = " + model.predict([0, 0])[0].toFixed(12));
    
    //model.save(writer);
}