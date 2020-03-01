const express = require('../node_modules/express');
const router = express.Router();

// Request handlers
const { logoutPost } = require('../request_handlers/handlers');

/**
 * Handles logout requests
 * @method post
 */
router.post('/', logoutPost);

module.exports = router;
