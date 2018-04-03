# Hacker News API clone

My own interpretation of the Hacker News API using Node, Express, and MongoDB.

https://hacker-news-api-clone.herokuapp.com

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

#### node.js

node.js must be installed on your machine (any versions will work; v7.10.0 was used for this project)

```
$ node -v // v7.10.0
```

To install node follow this guide -  https://nodejs.org/en/download/package-manager/#osx

#### npm

npm is required (any versions will work; v4.2.0 was used for this project)

```
$ npm -v // 4.2.0
```

To install npm follow this guide - https://docs.npmjs.com/getting-started/installing-node

#### mongoDB

mongoDB is required since it was the database of choice.

To install mongoDB follow this guide -  https://docs.mongodb.com/manual/administration/install-community/

Alternative you can use Robo 3T (a mongoDB management tool) to test whether the databses have been created correctly (we do this after running the seed file) - https://robomongo.org

### Install

Create a new folder on your machine and clone / fork + clone the repo. 

Open terminal and navigate to the folder storing the code

Install all of the required packages using npm

```
$ npm i  
```

### Start the server

#### Start mongoDB 

In a separate terminal window start mongod by running the following command.

```
$ mongod
```
Make sure no other clients are accessing the mongo ports. If they are locate the processes an stop them.

#### Seeding the database 

Navigate to the server folder and open the 'seed' folder.

Run the following command.

```
$ npm run seed:dev
```

This will populate the DEV database. It's only necessary for the DEV db because the TEST database is dropped and re-seeded before each block of tests.

```javascript
let usefulData;
  beforeEach((done) => {
    mongoose.connection
      .dropDatabase()
      .then(saveTestData) // where saveTestData is seed/test.seed.js
      .then((data) => {
        usefulData = data;
        console.log(`Useful data: ${Object.keys(usefulData)}`);
        done();
      })
      .catch(done);
  });
```

Test if the database was seeded by running Robo 3T or running the project test suite

#### Start the server

Navigate back to the route server folder and run the following command.

```
$ npm run start
```

Your should see this as the last lines of the output

```
listening on port 3000
connected to the Database: mongodb://127.0.0.1:27017/hacker-news-clone-api
```

#### Visually navigating the API 

In the browser navigate to http://localhost:3000/ and follow the instructions available there. All of the routes are listed and described on http://localhost:3000/api


## Running the tests

The tests are built using Mocha, Chai, and Supertest

To run the tests, type the following command in your terminal anywhere withing the project folder

```
$ npm t
```

The tests give a good summary of all of the routes and what features they have.

### Testing patterns

GET routes 

```javascript
it('responds with status code 200', (done) => {
    request(server) // imported from supertest
        .get('/')
        .end((err, res) => {
          if (err) done(err);
          else {
            const output =
              '<h1>Welcome to the Hacker News Clone API</h1> \n Go to /api for more...';
            expect(res.status).to.equal(200);
            expect(res.text).to.equal(output);
            done();
        }
    });
});
```

POST and PUT routes

```javascript

it('responds with status code 200 & returns new comment', (done) => {
    // uses model methods
    Articles.findOne({}, (err, article) => { 
    // finds a random article from the databases in order to pass it as a param to the post/put route 
    if (err) done(err);
    request(server)
        .post(`/api/articles/${article._id}/comments`)
        .send({ body: 'this is a test comment' })
        .end((error, res) => {
            if (error) done(error);
            expect(res.status).to.equal(200);
            expect(res.body.newComment).to.be.an('object');
            expect(res.body.newComment.body).to.equal('this is a test comment');
            done();
        });
    });
});
```

## File Structure

    ├── README.md
    ├── config.js
    ├── controllers
    |  ├── articles.js
    |  ├── comments.js
    |  ├── index.js
    |  ├── topics.js
    |  └── users.js
    ├── models
    |  ├── Articles.js
    |  ├── Comments.js
    |  ├── Topics.js
    |  ├── Users.js
    |  └── models.js
    ├── out.txt
    ├── package.json
    ├── routers
    |  └── router.js
    ├── seed
    |  ├── data
    |  ├── seed.js
    |  └── test.seed.js
    ├── server.js
    └── spec
       └── main.spec.js


## Built With

* [Mocha](https://mochajs.org) - Javascript test framework
* [Chai](http://chaijs.com/guide/) - Test assertion library
* [Husky](https://github.com/typicode/husky) - Git hooks made easy, used to chain linting and tests before commits
* [ESLint](http://eslint.org) - Linting utility
* [Prettier](https://www.npmjs.com/package/prettier) - Code formater, used to enforce linting at save
* [Airbnb Lint config](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) - A great source of javascript linting rules
* [nodemon](https://www.npmjs.com/package/nodemon) - server change monitoring and restart
* [mongoose.js](http://mongoosejs.com) - object modelling and db interaction
* [supertest](https://www.npmjs.com/package/supertest) - HTTP assertions, used in testing POST/PUT routest
* [chance]()
* [underscore](http://underscorejs.org) - JS library for helper functions
* [log4js](https://github.com/stritti/log4js) - logging framework
* [async](https://www.npmjs.com/package/async) - helper functions for async actions
* [moment.js](http://momentjs.com) - time library
* [express.js](https://expressjs.com) - web framework for nodeJS

*Airbnb's Javascript lint file was used everywhere but on the seed.js and test.seed.js files which used in their initial state. 

## Authors

* **Alan Ionita** - https://github.com/alanionita

## Acknowledgments

* The Northcoders Team for supplying the seed and test.seed files 🙌
