[![ci](https://github.com/DartCaller/web/actions/workflows/ci.yml/badge.svg)](https://github.com/DartCaller/web/actions/workflows/ci.yml)
![](https://img.shields.io/github/license/DartCaller/web)
![](https://img.shields.io/tokei/lines/github/DartCaller/web)

# Dart Frontend
This Repo contains the user facing frontend which enables Dart Game Management. It features and enables automatic Dart Score tracking via https://github.com/DartCaller/api and https://github.com/DartCaller/darts-recognition.

#### Deployments
- https://dart-web.timon.codes - the deployment of this website
- https://dartcaller.github.io/web - the Storybook ([exlpained down below](#book)) of this repo
- https://dashboard.cypress.io/projects/iei5pi/runs - the public [cypress](#rotating_light) dashboard showing the latests integration test runs


# Table of Contents
- [:package:Tech Stack](#package)  
- [:computer: Running Locally](#computer)
  - [:straight_ruler: Prerequisits](#straight_ruler)
  - [:running: Run](#running)
  - [:gear: Configuration](#gear)
- [:lock: Security](#lock)
- [:bug: Testing](#bug)
  - [:sparkles: Linter](#sparkles)
  - [:rotating_light: Cypress](#rotating_light)
  - [:black_joker: Jest](#joker)
  - [:book: Storybook](#book)
- [:lock_with_ink_pen: License](#lock_with_ink_pen)

<a name="package"/>

## :package: Tech Stack
- Framework: [Nuxt.js](https://nuxtjs.org/)
- State Handling: [Vuex](https://vuex.vuejs.org/)
- Design Framework: [Vuesax](https://vuesax.com/)
- Server Communication: [Axios](https://axios-http.com/docs/intro) & [Socket.io](https://socket.io/)
- Testing: [Storybook](https://storybook.js.org/), [Cypress](https://www.cypress.io/) & [Jest](https://jestjs.io/)
- Formatting: [Prettier](https://prettier.io/), [Eslint](https://eslint.org/) & [Styling](https://stylelint.io/)

<a name="computer"/>

## :computer: Running Locally
<a name="straight_ruler"/>

### :straight_ruler: Prerequisits

This project currently runs on node `v14.16.0`

You can either use [NVM](https://github.com/nvm-sh/nvm) which will activate the correct node environment automatically with
```bash
nvm use
```
or choose the Node / npm yourself. If you have a different Node Versions it might also build but it's not tested.

After that you can install the dependencies
```bash
# install dependencies
$ npm install
```
<a name="running"/>

### :running: Run

```bash
# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

<a name="gear"/>

### :gear: Configuration

|ENV             |Description        |Default                         |
|--------------- |------------       |------------------------------  |
|REST_ADDRESS    |Root REST Endpoint |`https://dart-api.timon.codes`  |
|WS_ADDRESS      |Websocket Endpoint |`wss://dart-api.timon.codes/ws` |

Furthermore, I currently have the variables for the Authorization Grant Flow Endpoint hardcoded. So if you want to run this project locally you might want to changes [these lines here](https://github.com/DartCaller/web/blob/b77c71c3fd96cc300c71f2a0a22ca7297f269829/plugins/auth0.js#L9-L12), to your liking.

<a name="lock"/>

## :lock: Security
This project uses [Auth0](https://auth0.com/) and the [Authorization Code Flow](https://auth0.com/docs/flows/authorization-code-flow) for WS and HTTP authentication.
Of course the production deployment uses SSL/TLS for both WS (meaning `wss://`) and HTTP (meaning `https://) requests  

<a name="bug"/>

## :bug: Testing

```bash
# run linter
$ npm run lint

# run storybook
$ npm run storybook

# run jest snapshot tests
$ npm run test:snapshot

# run headless Integration tests
$ npm run test:ci:e2e
```

Currently this repo is equipped with a few testing tools that range from linters over snapshot tests to integration tests.

<a name="sparkles"/>

### :sparkles: Linter
For linting and code formatting we use [Prettier](https://prettier.io/), [Eslint](https://eslint.org/) & [Styling](https://stylelint.io/). 

The linters will also be run before every commit to ensure that only proper formatted code gets committed.
```bash
npm run lint
```

<a name="book"/>

### :book: Storybook
This repo makes use of [Storybook](https://storybook.js.org/) to build components in isolation. This tools pushes us not only to build more in a [Component Driven Development](https://www.componentdriven.org/) kind of way (from the “bottom up” starting with components and ending with screens) but also to split our components into [presentational and container components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0). This combination helps to write better tests more easily and also helps for the code quality.

The storybook is deployed for everyone to see under https://dartcaller.github.io/web

<a name="joker"/>

### :black_joker: Jest
We currently use jest for snapshot testing the components to make sure we get notified about markup changes. See https://storybook.js.org/docs/vue/workflows/snapshot-testing for more info

<a name="rotating_light"/>

### :rotating_light: Cypress
Cypress is currently our tool to facilitate integration testing on the components. More information on either https://cypress.io or https://storybook.js.org/docs/vue/workflows/interaction-testing

<a name="lock_with_ink_pen"/>

## :lock_with_ink_pen: License
Distributed under the GNU GPLv3 License. See [LICENSE](LICENSE) for more information.
