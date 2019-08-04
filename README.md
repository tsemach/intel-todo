## Intel Home Assigment TODO Application

A Todo list managment application using Angular - NodeJS - MongoDB.

## Rnning using Docker
The application is deliver ad single docker image available in [public docker repository](https://cloud.docker.com/repository/docker/tsemach/intel).

### *To pull and run do*

````bash
docker run -p 3000:3000 -d --name todo tsemach/intel
````
> Make sure no other application is running on port 3000.

Browse to http://localhost:3000 

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

