const express = require('../node_modules/express');
const router = express.Router();

// Request handlers
const { registerGet, registerPost } = require('../request_handlers/handlers');

/**
 * Renders register page
 * @method get
 */
router.get('/', registerGet);

/**
 * Handles registration requests
 * @method post
 */
router.post('/', registerPost);

module.exports = router;
