const controllers = require('./controllers');

const router = (app) => {
    app.get('/', controllers.Pages.base);
};

module.exports = router;