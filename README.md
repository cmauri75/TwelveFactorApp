# TwelveFactorApp
Example implementation of principles in: [The Twelve Factors](https://12factor.net). A methodology to create project as: SaaS created by Heroku.

It concentrates on stateless app in cloud.

## Application
1. Work in team
2. Scalability 
3. Observability
4. Reproducibility

## Local Prepare
Start with
```
source ./dev.env.sh
docker-compose up
yarn
yarn start
```

`setup.sh` executes some calls in order to create an initial state for testing. 

To run from docker accessing local docker-compose machine you can override MONGO_HOST with local IP
```
docker build . -t twelvefactor:0.1.1
docker run -e MONGO_HOST=10.10.0.15 -p80:3000 twelvefactor
```

## Descrption

Node app with 4 Express endpoints for managing hotels bookings, user, rooms. Data is stored on Mongo and accessed via mongoose.

docker-compose starts mongodb

App can be started via npm, endpoints are read via .env file read by process.env instruction.

### Important:
* Service must be stateless, else it's hard move from a container to another, obstruct deployment. 
* An example of state is trying multiple DB access. Don't do it, if it fails app exit fast.

## Application of principles:
1. Codebase: Git for versioning, you find code position and history. 1->1 app and code. 1-N code and deploy.
2. Dependencies: are store in MANIFEST: package/docker-config, build is reproducible you find exactly what you need and versions. Dependencies must be separated from code
3. Config: Separate config from code, must be stored in environment
4. Backing services: Backend services are managed as "attached resources" I can attach or removed on demand via an URL. So our services are stateless, state is in another place I can attach if needed. 
5. Build, release, run. Process must be managed by reproducible tools, build is more packaging than compile. Docker in our case.
6. Processes: App must be a bunch of stateless modules, state is stored in backend service. Less deploy complexity, I can scale fast. It's related to microservices:
   1. Isolated
   2. Domain driven
   3. Asynchronous communication
   4. Stateless
7. Port binding: export service to external world via port-binding, so a service can be scaled via different multiple ports.
8. Concurrency: system garantee scalability via process instead of thread
9. Disposability: code must be ready to die with no side-effects. Fast startup & gracefully shutdown. Health and readiness are related to this principle.
10. Dev/prod parity: dev and prod should be exactly same env. Developer should deploy: devops base
11. Logs: It regards observability. Logs should be stored outside container, so other tool will take care of collecting and searching. A good practice is to treat logs as "flow", winston do it in javascript.


## Curiosity
node_modules in dockerignore is used in order to avoid sending the dir to docker_daemon 