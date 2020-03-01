# MiniLinks

> A URL shortener, à la Bitly, TinyURL, or Rebrandly.

<!-- Badges  -->

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

MiniLinks is a very cruddy app. Users can register, login, logout, create shortened URLs, edit them, delete them, view how many times they've been visited (both uniquely and overall) and the timestamps of when they were visited as well as the date they were created.

This app was made in three days on top of other coursework, and the UI reflects that.

## Usage

![MiniLinks](https://raw.githubusercontent.com/bryce-mcmath/tinyapp/master/docs/demo.gif)

The above gif demonstrates basic usage. For further screencaps, please navigate to the [docs folder](https://github.com/bryce-mcmath/tinyapp/tree/master/docs)

## Table of contents

- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing and running](#installing-and-running)
- [Running the tests](#running-the-tests)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [Known issues / bugs](#known-issues-/-bugs)
- [Feature roadmap](#feature-roadmap)

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

If you don't have Nodejs and npm installed, install them from [here.](https://nodejs.org/en/)

### Installing and Running

#### Windows Users

One extra step for Windows users. After this, do what everyone else does. In the root directory:

```
npm i -g node-gyp node-pre-gyp windows-build-tools chokidar
```

You can thank bcrypt for this, we were not supposed to use bcryptjs for some good reason I am unaware of

#### Everyone Else

In the root directory:

```
npm install
```

And then:

```
npm run server
```

Then navigate to localhost:5050 in your browser.

## Running the tests

In the root directory:

```
npm run test
```

## Dependencies

- [Nodejs](https://nodejs.org/en/) - Javascript runtime
- [Express](https://expressjs.com/) - Framework used for API in Node
- [body-parser]() - Easily extract data from request bodies
- [bcrypt]() - Password hashing
- [cookie-session]() - Encrypted cookies to create safer sessions
- [ejs]() - Templating Engine
- [method-overide]() - Allowing more HTTP methods than POST and GET

## Dev Dependencies

- [Chai]() - Assertion library
- [Mocha]() - Testing framework
- [nodemon]() - Auto reload server for quicker debugging

## Meta

Bryce McMath – [bryce-mcmath](https://github.com/bryce-mcmath) – [bryce.j.mcmath@gmail.com](mailto:bryce.j.mcmath@gmail.com)

## Known issues / bugs

- The UI is destitute
- There is some client side validation, but you can still send app-breaking data to the server if you put some effort into it
- Very little testing coverage, I did the minimum required in favour of adding more features

## Feature roadmap

If I had more time, I would...

- Add way more test coverage
- Add JSDoc comments
- Make it nice to look at
- Host it
- Attach it to a real database rather than a JSON file
