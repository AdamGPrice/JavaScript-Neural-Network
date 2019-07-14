class Layer {
    constructor(nodes) {
        this.nodes = nodes;
        this.values = new Matrix(this.nodes, 1);
        this.bias = new Matrix(this.nodes, 1);
    }
}

class Weight {

}

class NeuralNetwork {
    layers = [];
    weights = [];
    learningRate = 0.1;
    epochSize = 100;

    constructor(inputSize, outputSize) {
        this.layers.push(new Layer(inputSize));
        this.layers.push(new Layer(outputSize));
    }

    setLearningRate(rate) {
        this.learningRate = rate;
    }

    setEpochSize(size) {
        this.epochSize = size;
    }

    add(layer) {
        this.layers.splice(this.layers.length - 1, 0, layer);
    }

    generate() {
        for (let i = 0; i < this.layers.length - 1; i++) {
            this.weights.push(new Matrix(this.layers[i + 1].nodes, this.layers[i].nodes));
        }
    }

    predict(input) {
        this.layers[0].values = Matrix.fromArray(input);

        for (let i = 1; i < this.layers.length; i++) {
            this.layers[i].values = Matrix.product(this.weights[i - 1], this.layers[i - 1].values);
            //this.layers[i].values = Matrix.add(this.layers[i].values, this.layers[i].bias);
            this.layers[i].values.sigmoid();
        }
        return this.layers[this.layers.length - 1].values.toArray();
    }

    train(inputs, targets) {
        for (let i = 0; i < this.epochSize; i++) {
            let r = Math.floor(Math.random() * Math.floor(inputs.length));
            this.backpropagation(inputs[r], targets[r]);
        }
    }

    backpropagation(inputArray, targetArray) {

        this.predict(inputArray); // FeedForward

        let target = Matrix.fromArray(targetArray);
        let error = new Matrix(targetArray.length, 1);

        //let delta = [];
        //let gradients = [];

        for (let i = this.layers.length - 1; i > 0; i--) {
            //Calculate the error
            if (i == this.layers.length - 1) {
                error = Matrix.subtract(target, this.layers[i].values);
            } else {
                let weightT = Matrix.transpose(this.weights[i]);
                error = Matrix.product(weightT, error);
            }

            //Calculate the gradient
            let gradient = Matrix.gradient(this.layers[i].values);
            gradient = Matrix.multiply(gradient, error);
            gradient.multiply(this.learningRate);

            //Calcualte the deltas
            let nextLayerT = Matrix.transpose(this.layers[i - 1].values);
            let weightDeltas = Matrix.product(gradient, nextLayerT);

            //Ajust the weights
            this.weights[i - 1] = Matrix.add(this.weights[i - 1], weightDeltas);
            this.layers[i].value = Matrix.add(this.layers[i].values, gradient);
        }
    }
}