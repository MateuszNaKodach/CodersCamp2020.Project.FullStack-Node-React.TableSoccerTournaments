# TourDeFoos - CodersCamp final project


### Frontend

#### Netlify Deployment

[![Netlify Status](https://api.netlify.com/api/v1/badges/8b1e040a-66a9-4aa9-be7c-0c5e002105df/deploy-status)](https://app.netlify.com/sites/wkps/deploys)


### Backend

[Swagger URL](https://coderscamp2020-tablesoccer.herokuapp.com/rest-api-docs/)

#### Swagger REST API

#### Test Coverage
[![codecov](https://codecov.io/gh/nowakprojects/CodersCamp2020.Project.FullStack-Node-React.TableSoccerTournaments/branch/develop/graph/badge.svg?token=CZ2VUMUK29)](https://codecov.io/gh/nowakprojects/CodersCamp2020.Project.FullStack-Node-React.TableSoccerTournaments)

#### Mutation Test Coverage
[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fnowakprojects%2FCodersCamp2020.Project.FullStack-Node-React.TableSoccerTournaments%2Fdevelop)](https://dashboard.stryker-mutator.io/reports/github.com/nowakprojects/CodersCamp2020.Project.FullStack-Node-React.TableSoccerTournaments/develop)

## Overview

**TourDeFoos is an application to organize and manage tournaments - in this case it's dedicated especially for foosball tournaments.**

**It was created as a final project of CodersCamp course.**


## Our Crew

Mentor **[Mateusz Nowak](https://github.com/nowakprojects)**

- [Anna Lamperska](https://github.com/lamparina)
- [Dominika Zwolenik](https://github.com/DomiZet)
- [Piotr Rynio](https://github.com/PiotrWR)
- [Tomasz Dworniczak](https://github.com/tomdworniczak)
- [Paweł Szambelan](https://github.com/Szambelan)


## Main functionalities

1. Tournament organisation (still in progress)
2. Creating players profiles (regardless of tournaments) and sending them confirmation emails via NodeMailer.
3. Tournament registration
4. Tournament tables module responsible for enable/disable tables during tournament
5. Division into teams and assignment to teams
6. Division of matches between teams - making tournament tree (still in progress)
7. Matches module responsible for starting and finishing matches


## Dependencies

The following technologies were used :

- Node.js
- Express
- Database: MongoDB / in memory save
- TypeScript
- Docker
- Nodemailer
- Jest
- MailHog
- Stryker
- React (next stage)

Our application follows the TDD approach and is almost **fully covered** by tests. The architecture has been designed according to the **DDD (Domain-driven design)**.


## Event Modeling

During this project we tried to use event modeling to model our application flow and for task division. We used for it miro web app.
![image](https://user-images.githubusercontent.com/31566345/111337374-537e9680-8676-11eb-861e-b1b358bfc0ab.png)

## Running the project

Running this project locally

###### Live version:

[App on Heroku](https://coderscamp2020-tablesoccer.herokuapp.com/rest-api-docs/)

###### From the repo:

1. Clone this project locally
2. Run `npm install` in your bash/command line
3. Run `npm run start:dev` in your bash/command line

## Development
1. Execute `docker-compose -f docker-compose.dev.yaml up` in main project catalog -  this will run the application in watch mode and all required dependencies.
2. Now following urls should be available:
    - REST API SWAGGER  |   http://localhost:5000/rest-api-docs/
    - FRONTEND (REACT)  |   https://localhost:3000
