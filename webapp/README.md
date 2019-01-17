# Rebloc app framework

## To get started
## Server side
Set DB environment in .env: copy the template .env-template and assign values. 
PostgresSQL on Azure requires a SSL cert in order to connect 
So modify  the config inside server/src/database/index.ts to point to the SSL cert location. 

## Client side
Copy configuration.ts.example to configuration.ts and set the values for Auth0 configuration. 

To get started using the kit follow following steps:
##### Repo cloning and setup:
1. Clone the git repo.

SERVER

1. `cd server` followed by `yarn`

##### Starting development servers:

To start server in development mode:
1. `cd server`
2. `yarn run watch`
3. `yarn run serve`



##### CLIENT

## Description
This React App uses Typescript, Material UI and Redux, React Router.

## Demo
*Visit [Demo link](https://...)*
#### Login credentials
* username/email: *anything*
* password: *anything*

## Features
### Authentication
The app uses redux to manage the authentication state, and uses redux-auth-wrapper library to guard the routes
#### Pages
*  Login Page

### Admin dashboard
The template comes with responsive modern charts, analytics, tables that are easily customizable to meet your data. 

### Other pages
* Inbox, Outbox, Drafts
* Profile Page (coming soon)

## How to run
### Local development
* Clone the project and cd into project
* npm install
* npm start and go to [link](*http://localhost:3000*)

### Deployment
* npm install
* npm run build
* npm run deploy

## Key technologies & Libraries used
* Material UI (1.1.0) - (for ui components)
* React Router
* Redux
* Typescript
* React (of course)

