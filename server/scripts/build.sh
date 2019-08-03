#!/bin/bash

if [ ! -f Dockerfile ]; then
	echo "Dockerfile is not exist, move to the server dirctory"

	exit 1
fi

tsc --sourcemap

[ ! -d client ] && mkdir client
rm -rf client/dist
(cd ../client; ng build --prod)
cp -r ../client/dist ./client/dist

docker build -t tsemach/intel .
docker push tsemach/intel

echo "user <docker run -p 3000:3000 -d --name todo tsemach/intel> to run the image"

exit 0

