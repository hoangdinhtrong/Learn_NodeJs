const path = require('path');
const express = require('express');
const router = express.Router();

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'index.html'));
});

module.exports = router;
