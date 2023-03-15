const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Hello World people' });
});

module.exports = app;