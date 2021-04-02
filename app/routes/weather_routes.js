module.exports = function(app, db) {
    app.get('/weather', (req, res) => {
        console.log(req.body)
        res.send('Hello')
    });
};