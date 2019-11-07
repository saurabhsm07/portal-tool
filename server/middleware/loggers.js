
const loggers ={}

loggers.requestLogger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}, TIME: ${Date()}`);
    next()
}


module.exports = loggers