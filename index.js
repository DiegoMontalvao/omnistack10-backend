const express = require ('express');

const app = express();

app.get('/', (req, resp) => {
    return resp.send('Hello World!');
});


app.listen(3333);