#! /usr/bin/env bash

# commands run to deploy serverless app
# inside the docker container
# once validated to work, this script should be the CMD arg of the Dockerfile when deploying

# the Dockerfile already set up environment variables in the container so that AWS configure can use them
# they are put in /opt/aws
# this is kinda cheezy
echo "Configuring AWS credentials"
export AWS_ACCESS_KEY_ID=$(awk 'NR == 2' /opt/aws | cut -f3 -d ' ')
export AWS_SECRET_ACCESS_KEY=$(awk 'NR == 3' /opt/aws | cut -f3 -d ' ')
aws configure set default.region us-east-1

repo_path="/opt/repo"
echo "Cloning repo into container"
git clone -b dev https://github.com/agilebeat-inc/maprover--api-tsjs-infer.git "${repo_path}"

cd "${repo_path}/maprover--api-tsjs-infer"

echo "Installing tensowflowJS and pruning Node modules"
npm install @tensorflow/tfjs && \
    npm prune --production

echo "Installing serverless plugins"
serverless plugin install -n serverless-python-requirements --save-dev
serverless plugin install -n serverless-reqvalidator-plugin --save-dev
serverless plugin install -n serverless-aws-documentation --save-dev
serverless plugin install -n serverless-plugin-custom-roles --save-dev
serverless plugin install -n serverless-domain-manager --save-dev

echo "Deploying with serverless"
serverless deploy -v
