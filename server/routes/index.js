const auth = require('./auth');
const user = require('./user');
const news = require('./news');

const authenticate = require('../middleware/authenticate');

module.exports = app => {
    app.get('/', (req, res) => {
        res.status(200).send({ message: "Welcome to the AUTHENTICATION API. Register or Login to test Authentication."});
    });

    app.use('/api/auth', auth);
    app.use('/api/user', authenticate, user);
    app.use('/api/news', authenticate, news)
};
