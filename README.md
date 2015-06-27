# Isomorphic React + Flux film database example

> Complete application example including user authentication using koa on server side, and React/Flux(Alt) on frontend. Also uses koa-mongo-rest to generate REST API, and restful.js to consume them. With a healthy dose of Bootstrap, using react-bootstrap.

**Demo:** https://react-example-filmdb.herokuapp.com


## Libraries Included

* [react](https://facebook.github.io/react/)
* [react-router](https://github.com/rackt/react-router)
* [react-hot-loader](https://github.com/gaearon/react-hot-loader)
* [react-bootstrap](http://react-bootstrap.github.io/)
* [alt](https://github.com/goatslacker/alt)
* [iso](https://github.com/goatslacker/iso)
* [koa](http://koajs.com/)
* [webpack](http://webpack.github.io/)
* [babeljs](https://babeljs.io/)
* [koa-mongo-rest](https://github.com/t3chnoboy/koa-mongo-rest)
* [restful.js](https://github.com/marmelab/restful.js)
* [formsy-react](https://github.com/christianalfoni/formsy-react)

## TL;DR

Use with `iojs^1.8.0` or `nodejs^0.12.0`, clone the repo, `npm install` and `npm run dev`.

Learn React ([react-prime-draft](https://github.com/mikechau/react-primer-draft)), learn Flux and Alt ([alt guide](http://alt.js.org/guide/)).

Build for production with `npm run build`.

## Concepts

**Koa** will be our server for the server side rendering, we use **alt** for our Flux architecture and **react-router** for routing in our app.

With **iso** as helper we can populate **alt** flux stores before the first rendering and have a complete async isomorphic React application.

**For a more comprehensive guide to the source code, see [wiki](https://github.com/tomaash/react-example-filmdb/wiki)**

## Flux

We use [alt](alt.js.org) singleton as [Flux](http://facebook.github.io/react/blog/2014/05/06/flux.html) implementation.

On the server, it's similar but Flux is initialized using `alt.bootstrap` and for next rendering, the data are emptied using `alt.flush`

## Installation / How-to

I recommend to use [io.js](https://iojs.org/) to take advantages of `ES6` without `--harmony` flag on `NodeJS`.

It's super easy to do with [nvm](https://github.com/creationix/nvm):

* `$ nvm install iojs`
* `$ nvm use iojs`
* `$ nvm alias default iojs` (to make `node` default to `iojs`)

But it works well with `nodejs^0.12.0` as well :)

### Run the project in development:

* `$ npm run dev`

### Run tests

* `$ npm test` will run the tests once
* `$ ./node_modules/.bin/karma start` will watch for changes and run the tests on change

### Build project:

Just run `$ npm run build`, it will produce these tasks:

* Run tests from `test/spec/**/*.jsx`
* Concat & minify styles to `/dist/app-[hash].css`
* Concat & minify scripts to `/dist/js/app-[hash].js`

### Run in production

Build the project first:

* `$ npm run build`

Then start the koa server:

* `$ NODE_ENV=production node server/index.js` (iojs)
* `$ NODE_ENV=production node --harmony server/index.js` (nodejs 0.12.x)

You can also use `processes.json` to run the application with [PM2 Monitor](https://github.com/Unitech/pm2) on your production server (customize it for your use):

* `$ pm2 start processes.json`

