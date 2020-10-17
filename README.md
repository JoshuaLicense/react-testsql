# testSQL [![Build Status](https://travis-ci.org/JoshuaLicense/react-testsql.svg?branch=master)](https://travis-ci.org/JoshuaLicense/react-testsql) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/your/your-project/blob/master/LICENSE)

A dynamic SQL problem generator application to test your knowledge on SQL. Can be build to run in either _client_ or _server_ mode.

## Built using

- [ReactJS](https://github.com/facebook/react/)
- [create-react-app](https://github.com/facebook/create-react-app)
- [MaterialUI](https://github.com/mui-org/material-ui)

## Screenshots
![Home Page](/../screenshots/HomePage.png?raw=true "What the landing page looks like?")

## Demo

Currently there are two versions of testSQL hosted as a demo.

| Website                                        | Detail               |
| ---------------------------------------------- | -------------------- |
| https://react-testsql.herokuapp.com/           | Full version.        |
| https://joshualicense.github.io/react-testsql/ | Client-only version. |

## Still here? Good. Want to run it yourself?

### Prerequisites

Make sure you have **git**, and **yarn** or **npm** installed.

For the full version, a MongoDB container is **required**, the URI should be set inside `.env`. See [mLab](https://mongolab.com/) for a free option.

### Getting started

1.  Clone this repository locally.  
    `git clone https://github.com/JoshuaLicense/react-testsql.git`
1.  Change directory.  
    `cd react-testsql`
1.  Install all depedancies for testSQL.  
    `yarn`
1.  Configured a `.env` file using `env-example` as a template.
1.  Start testSQL.  
    `yarn start`  
    or  
    `yarn start:client`
1.  Open `localhost:3001` or `localhost:3000` (client only) in your browser.

##### [See a full list of commands here](https://github.com/JoshuaLicense/react-testsql/wiki/Package-scripts)

### FAQ

#### Why is the payload so large?

To ensure the application runs solely in the browser, react testSQL uses [SQL.js](https://github.com/kripken/sql.js/) which is SQLite compiled into JavaScript.

#### How can I add a new question?

See [here](https://github.com/JoshuaLicense/react-testsql/wiki/Creating-a-new-question).

**Please find additional help in the [wiki](https://github.com/JoshuaLicense/react-testsql/wiki/). Questions that are not found please raise an [issue](https://github.com/JoshuaLicense/react-testsql/issues/new).**
