const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const server = require('./schema');
const app = express();

//allow crossorigin
app.use(cors())

server.applyMiddleware({
  app
})

app.use(express.static('public'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));