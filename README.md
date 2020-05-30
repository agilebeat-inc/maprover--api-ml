# maprover--api-tsjs-infer
Expose models with a lambda function through API Gateway


##To deploy:

1. Install serverless plugins:
```
serverless plugin install -n serverless-python-requirements
serverless plugin install -n serverless-reqvalidator-plugin
serverless plugin install -n serverless-aws-documentation
serverless plugin install -n serverless-plugin-custom-roles
```

2. Install node tensorflow module:
```
npm install @tensorflow/tfjs
```

4. Set up aws credentials
    - run command: ```aws configure```

5. Check your aws configuration by: 
    - listing s3 buckets: ```aws s3 ls```
    - you should see a list of all your buckets

6. Run:
    - serverless deploy command: ```sls deploy -v```
    - you should see list of endpoints: 
    ```
    endpoints:
    POST - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/prod/infer/highway-motorway
    POST - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/prod/infer/highway-trunk
    POST - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/prod/infer/highway-primary
    POST - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/prod/infer/highway-secondary
    POST - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/prod/infer/aeroway-helipad
    POST - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/prod/infer/amenity-hospital
    POST - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/prod/infer/amenity-police
    POST - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/prod/infer/amenity-firestation
    POST - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/prod/infer/landuse-quarry
    ```

3. Useful serverless comands in the project 
    - deploy project to the aws: ```sls deploy -v```
    - run local test: ```sls invoke local -f infer```
    - run test with post file ```sls invoke -f infer -p test/tile_test.json```
    - pull out logs for the lambda function ```sls logs -f infer```

4. Sources:
    - [aws nodejs canva](https://github.com/Automattic/node-canvas/wiki/Installation:-AWS-Lambda)
    - [node-canva](https://github.com/Automattic/node-canvas)
    - [problems with lambda so libs](https://github.com/Automattic/node-canvas/issues/680)
    - [build aws lambda issues](https://github.com/Automattic/node-canvas/issues/680)
    - [load image example](https://medium.com/@nico.axtmann95/scalable-image-classification-with-onnx-js-and-aws-lambda-ab3d7bd1723)
    - [tensorflow on aws - example](http://blog.zenof.ai/object-detection-in-react-native-app-using-tensorflow-js/)
    - [aws lambda nodjes - no body returned](https://medium.com/lifeomic/a-two-week-search-for-the-missing-body-of-a-lambda-function-response-c9ee79bd8093)
    - [example of resnet50](https://medium.com/@nico.axtmann95/scalable-image-classification-with-onnx-js-and-aws-lambda-ab3d7bd1723)
    - [encoding and decoding b64 in Node.js](https://stackabuse.com/encoding-and-decoding-base64-strings-in-node-js/)
    - [convert model to tsjs](https://www.tensorflow.org/js/tutorials/conversion/import_keras)
    - [save Keras model as tsjs model](https://www.tensorflow.org/js/tutorials/conversion/import_keras)

5. Lambda Tricks:
    - list files on the running machine
```
const fs = require('fs');

exports.handler = async (event, context) => {
  return fs.readdirSync("/usr/lib64").filter(p => p.match(/\.so/)).sort().join("\n");
};
```

6. Issues

NPM is very aggressive. Sometimes it innstalls dependencies in the node_modules folder.
When that happens the lambda package is too big to run (~80MB). When that happens remove
node_modules, package-lock.json and package.json files and check them out again from the 
repo. After that reinstall tensorflowjs with command:
```
npm install @tensorflow/tfjs
```

