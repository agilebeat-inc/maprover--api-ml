#!/usr/bin/env bash

# copy AWS credentials into container:
echo "Configuring AWS credentials"
# change if needed
AWS_CRED_PATH='~/.aws/credentials'
awsID=$(awk 'NR == 2' ~/.aws/credentials | cut -f3 -d ' ')
awsKey=$(awk 'NR == 3' ~/.aws/credentials | cut -f3 -d ' ')

# the arg to this script should be the repo:tag identifier of the image
# that we start a container from
cid=$(docker run -dt $1)

echo "Container ID is ${cid}"

# lescript=$(realpath ./deploy.sh)
docker cp deploy.bash ${cid}:/opt/deploy.bash

# --env did not seem to work, so resorted to this stupid
# bash -c "big string" workaround
docker exec \
    ${cid} /bin/bash -c "export AWS_ACCESS_KEY_ID=${awsID} && export AWS_SECRET_ACCESS_KEY=${awsKey} && /opt/deploy.bash"

# clean up
docker stop ${cid}
docker container rm ${cid}