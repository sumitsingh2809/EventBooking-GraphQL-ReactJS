const express = require('express');
const bodyParser = require('body-parser');
const graphQlHttp = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');

const isAuth = require('./middleware/is-auth');
const graphQlSchama = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(bodyParser.json());
app.use(cors());
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     if (req.method === 'OPTIONS') {
//         return res.status(200);
//     }
//     next();
// });
app.use(isAuth);
app.use('/graphql', graphQlHttp({
    schema: graphQlSchama,
    rootValue: graphQlResolvers,
    graphiql: true
}));

mongoose
    .connect(
        `mongodb://${process.env.DB_HOST}:27017/${process.env.DB_NAME}`,
        { useNewUrlParser: true }
    )
    .then(() => {
        console.log('MongoDB Connected!!');
        app.listen(8000, () => console.log('server running on 8000'));
    })
    .catch(err => console.log('Mongo Connection Failed.', err));