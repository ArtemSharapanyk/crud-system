const {Router} = require('express');
const baseRouter = Router();

baseRouter.get('/', async (req, res) => {
    res.send('<H2>OO</H2>');
});


module.exports = baseRouter;