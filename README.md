## Intel Home Assigment TODO Application

docker build -t tsemach/intel .
docker run -p 3000:3000 -d --name todo tsemach/intel
docker push tsemach/intel
