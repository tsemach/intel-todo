## Intel Home Assigment TODO Application

A Todo list managment application using Angular - NodeJS - MongoDB.

## Rnning from AWS - Zero Installation
Just open a browser on (http://18.222.101.203)

It use both AWS EC2 hosting the server and MLab mongodb cloud service to hosting the database.

## Rnning using Docker
The application is deliver ad single docker image available in [public docker repository](https://cloud.docker.com/repository/docker/tsemach/intel).

### *To pull and run do*

````bash
docker run -p 3000:3000 -d --name todo tsemach/intel
````

Browse to http://localhost:3000 
>Note: you may firewall issue since the container require access to MLab on port which may be blocked.

> Make sure no other application is running on port 3000.
> 
## Rnning using Docker Compose
Clone the project from github.com (just to get the docker-compose file) by:
````bash
git clone https://github.com/tsemach/intel-todo.git
````
Cd to intel-todo directory then run docker-compose by:
````bash
docker-compose up
````

## Running from Source (development enviroment)
1. Clone the project from github by:
   ````bash
   git clone https://github.com/tsemach/intel-todo.git
   ````
2. Run the server locally by
   ````bash
   cd server
   npm install
   npm start
   ````
   >this will run the server locally on port 3000
3. Run the client locally by:
   ````bash
   cd client
   npm install
   ng serve
   ````
   > this will angular development server on port 42000
4. Open a browser on http://localhost:4200

## System Components
* Client - is build using angular 8
* Server - is standrad NodeJS application
* Database - is based on MLab MongoDB cloud service.

## Docker Commands
````bash
docker build -t tsemach/intel .
docker push tsemach/intel
docker run -p 3000:3000 -d --name todo tsemach/intel
````

