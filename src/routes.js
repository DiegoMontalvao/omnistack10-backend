const { Router } = require ('express');

const routes = Router();

routes.post('/devs', (req, resp) => {
    console.log(req.body);
    return resp.json({ message: 'Hello omnistack!' });

});

module.exports = routes;
