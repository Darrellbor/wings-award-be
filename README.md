# Wings Award Application For 2020 Set

## Live Link And Postman
- Live link here [Live Wings Award Backend Link](https://wings-award.netlify.app/)
- Postman Collection [Wings Award Backend Postman](https://documenter.getpostman.com/view/1425723/TVzXBaeT)

## How To Run
1. Start by installing all dependencies by running `npm install`
2. Next create a `.env` file at the root of the project and copy everything from `.env.example`
3. copy files from `.env.example` to `.env` using `cp .env.example .env`then populate it with required values where necessary.


> **Note:** please ensure that you have mongodb installed locally and is running.

## Important Commands
- run `npm i` or `npm install` to install all dependencies
- run `redis-server` to start up redis locally
- run `npm run start.dev` to start a dev server
- run `npm start` in a production environment
- run `npm run build` to build the ts file to js
- run `npm run test` to run unit tests
