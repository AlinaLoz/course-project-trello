require('dotenv').config();
const graphqlHTTP = require("express-graphql");
const express = require("express");
const cors = require('express-cors');
const bodyParser = require("body-parser");
const app = express();
const bearerToken = require('express-bearer-token');

app.use(cors({allowedOrigins: ['localhost:3000']}));
app.use(bearerToken());
app.use(bodyParser.json());

const schema = require('./graphql/index');

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: global,
  graphiql: true
}));

// require('./routes')(app);

app.listen(8000, () => {
  console.log('working');
});
