'use strict';

const tf = require('@tensorflow/tfjs');

module.exports.inferHandler = async (event) => {
        const MODEL_URL = 'https://maprover-models.s3.amazonaws.com/TensorFlow/model.json'
        const model = await tf.loadLayersModel(MODEL_URL);
        var xs;
        xs = 10//parseFloat(event.xs);
        const input = tf.tensor2d([xs], [1,1]);
        const result = model.predict(input);
        const value = (await result.data())[0];

    const response = {
        statusCode: 200,
        xs : JSON.stringify(event.xs),
        body: JSON.stringify((await result.array())[0][0])
    };
    return response;
};