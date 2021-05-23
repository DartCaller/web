[![ci](https://github.com/DartCaller/web/actions/workflows/ci.yml/badge.svg)](https://github.com/DartCaller/web/actions/workflows/ci.yml)
# Dart Frontend
This Repo contains the user facing frontend which enables Dart Game Management. It features and enables automatic Dart Score tracking via https://github.com/DartCaller/api and https://github.com/DartCaller/darts-recognition.

### :package: Built with
This project is built with:
- [Nuxt.js](https://nuxtjs.org/)
- [Vuesax](https://vuesax.com/)
- [Axios](https://axios-http.com/docs/intro) and [Socket.io](https://socket.io/) for Server Communication
- [Storybook](https://storybook.js.org/), [Cypress](https://www.cypress.io/) and [Jest](https://jestjs.io/) for Testing

## :computer: Running Locally

### :straight_ruler: Prerequisits

This project currently runs on
https://github.com/DartCaller/web/blob/b03f6c4de003109065e99fe2555d46a911e87b26/.nvmrc#L1

You can either use NVM which will activate the correct environment automatically with
```bash
nvm use
```
or choose the Node / npm yourself. If you have a different Node Versions it might also build but it's not tested.

After that

```bash
# install dependencies
$ npm install
```

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

### :bug: Testing

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

## :lock_with_ink_pen: License
Distributed under the GNU GPLv3 License. See [LICENSE](LICENSE) for more information.
