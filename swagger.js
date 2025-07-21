const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'This API is used to manage students via operations like create, update, delete and retrieve.'
  },
  host: 'school-dla2.onrender.com',
  schemes: ['http']
};

const outputFile = './swagger-output.json';
const routes = ['./server.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);