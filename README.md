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
source ./.env
docker-compose up
npm install
npm start
```

`setup.sh` executes some calls in order to create an initial state for testing. 

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
4. Backing services: Backend services are managed as "attached resources" I can attach or removed on demand via an URL. So our services are stateless, state is in another place (backend service) I can attach if needed. 
5. Build, release, run:
6. Processes: 
* 
* Reproduction: use of docker for infrastructure
