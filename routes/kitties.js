const express = require('express');
const core = require('ckwallet-core');
const config = require('../config/config.js');
const debug = require('debug')('app');

const router = express.Router();
const logger = new core.Logger(config.logger);
const database = new core.Database(config.database);

function getFirstIdClause(firstIdParam, sort) {
  let res = '';
  if (firstIdParam) {
    const id = parseInt(firstIdParam, 10);
    if (!Number.isNaN(id)) {
      let operator = '>=';
      if (!sort || /ID DESC/i.test(sort)) {
        // if sorting by ID descending then revers comprasion operator
        // default is ID DESC for getKitties
        operator = '<=';
      }
      res = `ID ${operator} ${id}`;
    }
  }
  return res;
}

async function getKitties(search, sort, firstId = null) {
  let res = null;
  try {
    if (sort && !/^[a-zA-Z0-9\s]+$/.test(sort)) {
      throw new Error('Invalid arg: orderBy');
    }
    await database.open(false, true);
    let sql = search ? database.queryParser.translateUserInput(search) : null;
    const orderBy = (sort && [sort]) || null;
    if (firstId) {
      const clause = getFirstIdClause(firstId, sort);
      sql = sql ? `${sql} AND ${clause}` : clause;
    }
    res = await database.getKitties(sql, orderBy, 20);
  } catch (err) {
    logger.error(`getKitties error: ${err}`);
    debug(`getKitties error: ${err}`);
  } finally {
    database.close();
  }
  return res;
}

/* GET users listing. */
router.get('/', (req, res) => {
  ((async function asyncGet() {
    const { search, sort, firstId } = req.query;
    const kitties = await getKitties(search, sort, firstId);
    res.json(kitties);
  })());
});

async function getSuggestions() {
  let res = null;
  try {
    await database.open(false, true);
    res = database.queryParser.getInputSuggestions();
  } catch (err) {
    logger.error(`getKitties error: ${err}`);
    debug(`getKitties error: ${err}`);
  } finally {
    database.close();
  }
  return res;
}

router.get('/suggestions', (req, res) => {
  ((async function asyncGet() {
    const suggestions = await getSuggestions();
    res.json(suggestions);
  })());
});

module.exports = router;
