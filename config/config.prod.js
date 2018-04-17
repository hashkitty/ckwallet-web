const config = require('./config.dev');

// production would have different relative path
config.logger.filename = '../app_data/logs/ckwallet.log';
config.database.filename = '../app_data/ckdata.db';
config.production = true;
config.corsAllowOrigin = null; // not allow CORS for prod

module.exports = config;
