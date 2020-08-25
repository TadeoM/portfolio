const base = (request, response) => {
    const req = request;
    const res = response;

    res.render('app');
}

module.exports.base = base;