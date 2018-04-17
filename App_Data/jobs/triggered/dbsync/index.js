const path = require('path');
const { DatabaseSync } = require('ckwallet-core');
const config = require('../../../../config/config.prod');

// fix relative path for Azure execution
config.database.filename = path.join('../../../', config.database.filename);
config.logger.filename = path.join('../../../', config.logger.filename);

const sync = new DatabaseSync(config);
sync.run(true);
