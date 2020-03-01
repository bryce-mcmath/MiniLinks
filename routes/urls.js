const express = require('express');
const router = express.Router();

// Request handlers
const {
  urlsGet,
  urlsPost,
  urlsNewGet,
  urlGet,
  urlPut,
  urlDelete
} = require('../request_handlers/handlers');

/**
 * Renders main page which lists urls
 * @method get
 */
router.get('/', urlsGet);

/**
 * Handles new short URL requests
 * @method post
 */
router.post('/', urlsPost);

/**
 * Renders page for creating new short URLS
 * @method get
 */
router.get('/new', urlsNewGet);

/**
 * Renders specific page for a given short URL
 * @method get
 */
router.get('/:shortURL', urlGet);

/**
 * Handles requests to update a short URL's corresponding long URL
 * @method put
 */
router.put('/:shortURL', urlPut);

/**
 * Handles requests to delete a short URL
 * @method delete
 */
router.delete('/:shortURL', urlDelete);

module.exports = router;
