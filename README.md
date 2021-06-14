# Airbnb Clone

I do NOT own the static assets (the AirBnb logo). The photos were gathered from Unsplash.

## Technologies Used
1. ReactJS/Redux
2. NodeJS
3. MySQL
4. Redis
5. Styled-Components
6. EC2
7. S3 bucket
8. Kubernetes
9. Linode LKE
10. Go

## Description
This is an Airbnb clone that I worked on with two software engineers for learning and improving my front end skills. The two services in this repository are the services that I built on the team. 


## Migration to Kubernetes
I have rewritten the microservices in Go under the `apis` directory and migrated the project into a Kubernetes environment. Under this directory, you will see the three microservices needed to run in our cluster. We have the `hosts` and `properties` APIs which are linked to their own databases, and the `get-data-api` which is responsible for gathering data from the other two services, manipulating that data to be in the shape that the front end requires, and caching the results in a Redis store. In the cluster their is a single Redis pod where data is written to, and several Redis replicas that are read from on subsequent requests.

I have descriptions on how to run each setup locally.

## Running Node Servers
```bash
# Clone the repository and cd into the root directory
git clone https://github.com/manedurphy/Airbnb-Frontend-Clone-Two-Services.git
cd Airbnb-Frontend-Clone-Two-Services

# Change into the directories: proxy, photo-header, and hosted-by and run the command for each
npm install
```

Once the dependencies are installed, you will need to seed your MySQL database. You will need MySQL installed locally on your machine or running in a docker container.
```bash
# CD into the hosted-by and photo-header directories and run
npm run seed
```
This should create records for 100 pages. From here you can open three terminal sessions and run each server individually. Make sure to `cd` into the correct directory before running the command.
```bash
npm run server
```

Alternatively you can setup an `ecosystem` configuration file and run all servers using `pm2`. In the root directory, you can then run the start command one time, rather than three. Be sure to explore the `package.json` files to understand the behaviors that I am describing.
```javascript
module.exports = {
    apps: [
        {
            name: 'photo-header',
            script: './photo-header/backend/serverStart.js',
            exec_mode: 'cluster',
            env: {
                NODE_ENV: 'production',
                MYSQL_USER: 'root',
                MYSQL_PASSWORD: 'Your database password',
                MYSQL_DB: 'Your database name',
                HOSTED_BY_API: 'http://localhost:5002',
            },
        },
        {
            name: 'hosted-by',
            script: './hosted-by/backend/serverStart.js',
            exec_mode: 'cluster',
            env: {
                NODE_ENV: 'production',
                MYSQL_USER: 'root',
                MYSQL_PASSWORD: 'Your database password',
                MYSQL_DB: 'Your database name',
            },
        },
        {
            name: 'proxy',
            script: './proxy/index.js',
            env: {
                NODE_ENV: 'production',
                PHOTO_HEADER_API: 'http://localhost:5001',
                HOSTED_BY_API: 'http://localhost:5002',
            },
        },
    ],
};
```

## Running in Docker using Compose
First, open up `scripts/seed.js`, and make sure the `hostsAPI` and `propertiesAPI` variables are set for Docker Compose. Then run
```bash
# This will build the images on your machine, run them in docker, and seed the database. All in one command :)
make compose
```


## Running in Kubernetes using Kind
You will need [Kind](https://kind.sigs.k8s.io/) installed on your machine to follow along. Make sure you are in the root directory for these steps.
```bash
# Create the k8s cluster
make cluster

# Wait for the nodes to reach a Ready status
kubectl get nodes

# Build the docker images and load them into Kind
make load

# Spin up the Nginx Ingress controller
make ingress-controller

# Run the application, and wait for all pods to reach a Ready status
make deploy-local
```

Next we will need to run the seed script. First open it in `scripts/seed.js`, and make sure that the `hostsAPI` and `propertiesAPI` are set to `http://localhost:5000`.

Next run these commands in separate terminals
```bash
# Port forward to the Ingress Controller
make forward

# Run the seed script
npm run seed
```

Nice! You should now seed a room at `http://localhost:5000/rooms/1`.


I had a great time with this project and feel very comfortable with HTML, CSS, and JS. I can safely say that I prefer backend techonlogies, but this was fun and I can appreciate the skillset of frontend developers.

[Showcase](https://www.youtube.com/watch?v=PWFy8-X4XdM&list=PLAIQMt1Wkn6hvVJO5QUP6xUtDCXpSioJN&index=1)