## Folder Structure
I have used the approach of [Bulletproof Node.js architecture](https://softwareontheroad.com/ideal-nodejs-project-structure/) to structure the project. The project structure is as follows:

```
src
│   main.ts         # Application entry point
└───api             # Express route controllers for all the endpoints of the app
└───config          # Environment variables and configurations
└───loaders         # Split the startup process into modules
└───services        # All the business logic is here
└───types           # Type declaration files (d.ts) for Typescript

```
I also like feature-based folder structure, so I have created a folder for each feature. For example, if you are building a blog, you can have a folder called `blog` and inside it, you can have all the files related to the blog feature.

## Getting Started

### Step 1: Set up the Development Environment

To begin working on the project, you need to set up your development environment first.

Install [Node.js and NPM](https://nodejs.org/en/download/)

- on OSX, you can use [homebrew](http://brew.sh) and run `brew install node`
- on Windows, you can use [chocolatey](https://chocolatey.org/) and run `choco install nodejs`

### Install

- To install all dependencies, run `yarn install`

### Running in dev mode

- To start the development server, run `yarn start`
- The server address will be displayed to you as `http://0.0.0.0:3000`

### Building the project and run it

- To generate all JavaScript files from the TypeScript sources, run `yarn build`.
- The builded app can be found in the `dist` folder.

This project was inspired by Bulletproof Node.js architecture and was modified to fit specific needs.