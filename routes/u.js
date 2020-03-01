<<<<<<< HEAD
const express = require('../node_modules/express');
=======
const express = require('express');
>>>>>>> ab5808035d6a5f8c523428f79b50e6524ba71778
const router = express.Router();

// Request handlers
const { shortUrlGet } = require('../request_handlers/handlers');

/**
 * Redirects from shortened URL to assigned long URL. Main functionality
 * @method get
 */
router.get('/:shortURL', shortUrlGet);

module.exports = router;
