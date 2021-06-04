[![ci](https://github.com/DartCaller/web/actions/workflows/ci.yml/badge.svg)](https://github.com/DartCaller/web/actions/workflows/ci.yml)
![](https://img.shields.io/github/license/DartCaller/web)
![](https://img.shields.io/tokei/lines/github/DartCaller/web)

# Dart Frontend
This repository contains the user-facing frontend, which enables dart game management. It features and enables automatic dart score tracking together with https://github.com/DartCaller/api and https://github.com/DartCaller/darts-recognition.


### Deployments
- https://dart-web.timon.codes - the deployment of this website
- https://dartcaller.github.io/web - the Storybook ([exlpained down below](#book)) of this repository
- https://dashboard.cypress.io/projects/iei5pi/runs - the public [cypress](#rotating_light) dashboard, showing the latests integration test runs


# Table of Contents
- [:package: Tech Stack](#package)  
- [:computer: Running Locally](#computer)
  - [:straight_ruler: Prerequisits](#straight_ruler)
  - [:running: Run](#running)
  - [:gear: Configuration](#gear)
- [:lock: Security](#lock)
- [:book: Storybook](#book)
- [:bug: Testing](#bug)
  - [:sparkles: Linter](#sparkles)
  - [:black_joker: Jest](#joker)
  - [:rotating_light: Cypress](#rotating_light)
- [:lock_with_ink_pen: License](#lock_with_ink_pen)

<a name="package"/>

# :package: Tech Stack
- Framework: [Nuxt.js](https://nuxtjs.org/)
- State Handling: [Vuex](https://vuex.vuejs.org/)
- Design Framework: [Vuesax](https://vuesax.com/)
- Server Communication: [Axios](https://axios-http.com/docs/intro) & [Socket.io](https://socket.io/)
- Testing: [Storybook](https://storybook.js.org/), [Cypress](https://www.cypress.io/) & [Jest](https://jestjs.io/)
- Formatting: [Prettier](https://prettier.io/), [Eslint](https://eslint.org/) & [Styling](https://stylelint.io/)
- Authentication: [Auth0](https://auth0.com/)

<a name="computer"/>

# :computer: Running Locally
<a name="straight_ruler"/>

### :straight_ruler: Prerequisits

This project currently runs on node `v14.16.0`

You can either use [NVM](https://github.com/nvm-sh/nvm), which will activate the correct node environment automatically with
```bash
# has to be executed within the root directory of this repository
$ nvm use
```
or choose the Node / npm yourself. It might also build if you have a different Node Version, but I cannot promise it.

After that, you can install the dependencies
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

In addition to the above ENV variables, I currently have the values for authentication hardcoded. Meaning which authentication server to use to authenticate. I use [Auth0](https://auth0.com/) and if you want to run this project locally, you might want to change [these lines here](https://github.com/DartCaller/web/blob/b77c71c3fd96cc300c71f2a0a22ca7297f269829/plugins/auth0.js#L9-L12) to use your authentication service of choice.
You can also keep the values like they are, but then you will only be able to authenticate against my backend.

<a name="lock"/>

## :lock: Security
This project uses [Auth0](https://auth0.com/) and the [Authorization Code Flow](https://auth0.com/docs/flows/authorization-code-flow) for WS and HTTP authentication.
Of course, the production deployment uses SSL/TLS for both WS (meaning `wss://`) and HTTP (meaning `https://`) requests.  

<a name="book"/>

### :book: Storybook
With this project, I discovered [Storybook](https://storybook.js.org/) for the first time. So let me give you an overview of what it does and why I fell totally in love with it to ensure Clean Code, Documentation, and easy testability.

#### :question: What is Storybook
To quote an excellent first explanation from [this article](https://www.komododigital.co.uk/insights/react-storybook-why-should-you-use-it):
> Storybook is a development environment tool which is used as a playground for UI components. It allows us, the developers, to create and test components in isolation.

Feel free to open my storybook under https://dartcaller.github.io/web in a second tab so that the following descriptions are better understandable.

With Storybook, you write a little "story" file for each frontend component, in which you import your component and show various use case examples ([here](https://github.com/DartCaller/web/blob/fde2510bb85df54d24f77accf9e7b5247cd5229c/components/common/modal/CorrectScore.stories.js) an example of such a story file in my repo). When you then start your Storybook UI locally, Storybook shows your component in an iFrame sandbox using the use case examples you specified. Showing all specified components on the left provides you with an organized environment and lets you interact with every component in isolation.

#### :heart: Why I fell in love with Storybook
I immediately want to start and respond to anyone saying, "If Storybook is so great, why did you use it so little? You barely have all components in it and a bare minimum amount of test cases". Yes, that's true. The thing is that I discovered Storybook at the very end of the project. This and the fact that the last weeks of my project phase mainly were occupied with many presentations that needed to be prepared, let to this result.

But anyway. Storybook is fantastic, and I don't think I'll develop web applications without it any time soon.
Let me tell you why I love Storybook so much.

Storybook allows you to work at one component at a time in isolation without seeing the others. This advertises proper component modularisation so that the next time you want to work on a component, you can look at it in its most modularized form and interactively see how it behaves if you change specific component input properties.

Any project newcomers can use Storybook to get a feel of the components that exist and what they do. And it's especially great for testing.
That's why Storybook comes with great integration support for most popular testing libraries.
I, for example, used its help to integrate Jest for Unit and Snapshot Tests and Cypress for Integration Tests.

But before I integrated tests, I learned how to make testing the components even easier by dividing my components into two categories. [Presentational and Container components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0). Presentational components are constructed so that they don't handle any business logic and focus on how to render the data with HTML and CSS. On the other hand, container components have all the business logic on how to work with the data but don't know how to display it. For that, they pass the data to presentational components.
This separation of concern improves testability because now you can use unit tests to test the container components without worrying that the tests might break once the presentation of the data changes. Or you can snapshot test presentational components without worrying that they might break whenever the business logic changes. Testing becomes easy.

So to summarize, Storybook:
- with the help of Presentational and Container components makes testing easy
- helps you document components by providing a UI with all components and examples of how to use them
- makes development faster since you can view and work on one tiny component in complete isolation instead of needing to render your whole website

Again, my storybook is deployed for everyone to see under https://dartcaller.github.io/web


<a name="bug"/>

# :bug: Testing

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

Currently, this repo is equipped with a few testing tools that range from linters over snapshot tests to integration tests.
The tests are part of the CI / CD pipeline and are run on each push to the repository as it can be seen here https://github.com/DartCaller/web/actions.

In the following paragraphs I will go through the different testing tools used.

<a name="sparkles"/>

### :sparkles: Linter
For linting and code formatting we use [Prettier](https://prettier.io/), [Eslint](https://eslint.org/) & [Styling](https://stylelint.io/). 

It will run the linters before every commit automatically, ensuring that only correctly formatted code gets committed.
```bash
npm run lint
```

<a name="joker"/>

### :black_joker: Jest
As I already explpained in the paragraph about [Storybook](#book), Snapshot testing becomes super easy when I split my components into Presentational and Container Components. With the nice testing integrations from Storybook, I can use Jest to take a screenshot of the html markup of each component. Jest safes this information and if the markup changes, future snapshot tests fail. In that case, I then have to look if these markup changes were by accident and so represent a bug or not.

See https://storybook.js.org/docs/vue/workflows/snapshot-testing for more info.

<a name="rotating_light"/>

### :rotating_light: Cypress
Cypress is currently our tool to facilitate integration testing on the components. It is able to simulate user interactions on query the website's markup which makes it perfect for integration tests.
It also provides Screenshots and Videos of the test runs via a dashboard.

https://dashboard.cypress.io/projects/iei5pi/runs shows my Cypress dashboard where you can see past runs and also the screenshots and videos belonging to them.

More information on the tool either on https://cypress.io or https://storybook.js.org/docs/vue/workflows/interaction-testing

<a name="lock_with_ink_pen"/>

# :lock_with_ink_pen: License
Distributed under the GNU GPLv3 License. See [LICENSE](LICENSE) for more information.
