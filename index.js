const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const { Pool } = require('pg');
const database = require('./db');
const produtoRoutes = require('./routes/produtoRoutes');


const initOptions = {
};

const pgp = require('pg-promise')(initOptions);
const db = pgp(database.connectionString);

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use('/produto', produtoRoutes);


app.get('/', (req, res) => {
    res.json({ info: 'API com Crud | Rotas: /produto' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
