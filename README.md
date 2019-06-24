[![forthebadge](https://forthebadge.com/images/badges/contains-technical-debt.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/does-not-contain-msg.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/gluten-free.svg)](https://forthebadge.com)
# Introducing - Etna 🌋

An _opinionated_ API Boilerplate project built with [Node.js](https://nodejs.org/en/), [TypeScript](https://www.typescriptlang.org/) , [objectionjs](https://vincit.github.io/objection.js/), [Knexjs](https://knexjs.org/) - Inspired by and built on top of [Matterhorn](https://github.com/MatterhornDev/matterhorn) 🏔️

#### Read my [blog article](https://www.dasithsblog.com/blog/Etna_a_nodejs_api_boilerplate/) for more info

- ⏱ Runtime: [Node.js](https://nodejs.org/en/)
- 🖥 API Framework: [Fastify](https://www.fastify.io/)
- 🔏 Type System: [TypeScript](https://www.typescriptlang.org/)
- 📎 ORM: [objectionjs](https://vincit.github.io/objection.js/)
- ❔ QueryBuilder: [Knexjs](https://knexjs.org/)
- 🗃️ Databases: RDMS (Relational database management system)
- 🎭 Test Runner: [Jest](https://jestjs.io/)
- 👕 Linter: [ESLint](https://eslint.org/)

## Quick Start

1. 🍴 Fork the repository
2. 👯‍♀️ Clone it to your computer
3. 🏃‍♀️ `npm install`
4. 🏃‍♀️ `npm run dev`

Configurations for database could be made to `.env` file.
```
APP_ENV=yourappenv
DATABASE_HOST=samplehost.com
DATABASE_USER=sample_user
DATABASE_PASSWORD=sample_pw
DATABASE_NAME=sample_db
DATABASE_PORT=3306
```
I have commited the `.env` file for you to get an idea of what the config file looks like but its not recomended that you do commit .env files into the repository.

## Features

1. Supports authentication with jwt.
2. Abstraction for the persistance layer(Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift) with Object Relational Mapping(ORM).
3. Abstraction layer for querys using a powerful query builder - [Knexjs](https://knexjs.org/)
4. Tests using [Jest](https://jestjs.io/)
5. Restful api - Sample Routes:
   1. Add candidates.
   2. Query candidates.
   3. Get distinct list of technologies.

## Project structure

```
📂 jest
📂 migrations
📂 src
 |--📂 database
    |-- 📄 connect
    |-- 📄 index
 |--📂 models
    |-- 📂 modelName
        |-- index
 |--📂 plugins
 |--📂 routes
    |-- 📂 routePathName
        |-- 📄 index
        |-- 📄 handler
 |-- 📄 index
 |-- 📄 server
📂tests
    |--📂 routes
        |-- 📂 routePathName
            |-- 📄 index
            |-- 📄 handler
```

## Scripts

The following npm scripts can be run using `npm run <script>`. This project relies on `opn` and `rimraf` utilities in order to support cross-platform opening and deleting files.

- `build` - build the TypeScript files and output to `lib/`
- `build:watch` - automatically rebuild files if changes are detected in `src/`
- `clean`- recursively delete the `lib/` and `coverage/` directories
- `clean:build`- recursively delete the `lib/` directory
- `clean:coverage` - recursively delete the `coverage/` directory
- `coverage`- run the test suite and generate code coverage reports
- `coverage:open` - run npm run coverage then open the results in a browser
- `dev`- concurrently run `build:watch` and `start:watch`
- `lint`- run the linter configured by TSLint on the `src/` directory
- `start` - run the app from `lib/`. Make sure to use npm run build first!
- `start:watch` - relaunch the server if new changes are detected in `lib/`
- `test`- run unit tests defined in the `tests/` directory
- `test:ci`- run unit tests and generate necessary files for CI integration

## Command Line Arguments & Environment Variables

Etna implements example usage of both command line arguments and environment variables. It uses `yargs-parser` to manage command line arguments. Command line arguments are passed in through the start command: `node lib/index.js <command line arguments>`. The `--log` argument has been enabled as an example. Additionally it also uses the .env arguments specified on `.env` file by using [dotenv](https://github.com/motdotla/dotenv). Running `npm run start` starts up the project without any command line arguments. This command is intended to be used in production, so logging is disabled by default (i.e. we don't pass the `--log` argument). If you are using this command to test your code locally and want to see the logging output, then run `npm run start -- --log`. This passes the command line argument through npm and into the aliased command.

Environment variables work in a similar way to command line arguments. They can be set in multiple ways depending on the terminal and operating system you are using. In a bash terminal you can specify environment variables as you use any of the above mentioned scripts by prepending the assignment to the command. For example, this project has the _PORT_ environment variable enabled. In a bash terminal run `PORT=8080 npm run start` to run the API on port 8080.

## Jest

Etna has a unique Jest set up. Under the [`jest/`](./jest) directory there are three configuration files [`ci.config.json`](./jest/ci.config.json), [`coverage.config.json`](./jest/coverage.config.json), and [`test.config.json`](./jest/test.config.json). Each configuration file maps to a specific jest experience.

#### npm run test

Runs jest with the `test.config.json` configuration. This configuration does not collect any code coverage.

#### npm run coverage

Runs jest with the `coverage.config.json` configuration. It runs the same test suite as `npm run test` and collects coverage from all files under the [`src/`](./src) directory. It outputs the coverage information in the following formats: `json`, `text`, `lcov`, and `html`. It does not rely on any external reporter dependencies.

#### npm run test:ci

Runs jest with the `ci.config.json` configuration. It runs the same test suite as `npm run test` and collects coverage similar to the `npm run coverage` command, but utilizes jest's built in `ci` caching functionality. Additionally, it outputs the coverage in the following formats: `html`, `json`, and `cobertura`. It utilizes `jest-junit` reporter to generate compatible junit xml files for Azure DevOps test reporting, and the `cobertura` format for the code coverage reporting.

<hr>
