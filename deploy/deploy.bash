#! /usr/bin/env bash

# commands run to deploy serverless app
# inside the docker container
# once validated to work, this script should be the CMD arg of the Dockerfile when deploying

aws configure set default.region us-east-1

repo_path="/opt/repo"
repo_name="maprover--api-ml" # when we change the repo name, it breaks things!!
echo "Cloning repo into container"
git clone -b dev "https://github.com/agilebeat-inc/${repo_name}.git" "${repo_path}"

cd "${repo_path}"

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
