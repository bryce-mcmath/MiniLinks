const express = require('../node_modules/express');
const router = express.Router();

// Request handlers
const { shortUrlGet } = require('../request_handlers/handlers');

/**
 * Redirects from shortened URL to assigned long URL. Main functionality
 * @method get
 */
router.get('/:shortURL', shortUrlGet);

module.exports = router;
