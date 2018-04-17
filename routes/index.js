const express = require('express');
const path = require('path');

const router = express.Router();

// router.get('/null_kitty.png', (req, res) => {
//   res.sendFile(path.join(__dirname, '../assets/null_kitty.png'));
// });
/* GET home page. */
router.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;
