const express = require('../node_modules/express');
const router = express.Router();

// Request handlers
const { loginGet, loginPost } = require('../request_handlers/handlers');

/**
 * Renders login page
 * @method get
 */
router.get('/', loginGet);

/**
 * Handles login requests
 * @method post
 */
router.post('/', loginPost);

module.exports = router;
