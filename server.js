const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const db = require('./db.js');
const http = require('http');
const url = require('url');

const port = process.env.PORT || 9000;
const app = express();

const fs = require('fs')
const typeDefs = fs.readFileSync('./schema.graphql',{encoding:'utf-8'})
const resolvers = require('./resolvers.js')

const {makeExecutableSchema} = require('graphql-tools')
const schema = makeExecutableSchema({typeDefs, resolvers})

app.use(cors(), bodyParser.json());

const  {graphiqlExpress,graphqlExpress} = require('apollo-server-express')
app.use('/graphql',graphqlExpress({schema}))
app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}))

app.listen(
   port, () => console.info(
      `Server started on port ${port}`
   )
);

/*
http.createServer(function (req, res) {
  // const currentUrl = new url.URL( req.url );
  const current_url = new URL(`http://websitename.com${req.url}`);
  const parameters = current_url.searchParams;
  const queryStart = req.url.split('?')[0];
  const parametersCount = (parameters.toString().match(/=/g) || []).length;

  res.writeHead(200, {'Content-Type': 'text/html'});
  let retData = undefined;
  switch (queryStart) {
    case '/clients':

      if ( parametersCount == 0 ) {
        retData = db.clients.list();
      }
      else if ( parametersCount == 1 && parameters.has("id") ) {
        retData = db.clients.get( parameters.get("id") * 1 );
      }
      else if ( parametersCount == 1 && parameters.has("branch-id") ) {
        retData = [];

        const branch = parameters.get("branch-id") * 1;
        const clients = db.clients.list();
        clients.forEach( (client) => {
          if ( client.branch_id == branch ) {
            retData.push( client );
          }
        });
      }

      break;
    default:
      retData = "The given request does not exist.";
  }

  res.end(JSON.stringify(retData));
 
 }).listen(port);
 */