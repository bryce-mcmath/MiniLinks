const { assert } = require('chai');

const { getUserByEmail, urlsForUser } = require('../helpers/helpers.js');

const testUsers = {
  A7ei0p: {
    name: 'Mark',
    id: 'A7ei0p',
    email: 'mark@gmail.com',
    password: 'purple-monkey-dinosaur'
  },
  e7I9U0: {
    name: 'Andy',
    id: 'e7I9U0',
    email: 'andy@gmail.com',
    password: 'dishwasher-funk'
  },
  '9Euh8s': {
    name: 'Tom',
    id: '9Euh8s',
    email: 'tom@gmail.com',
    password: 'tomnumberone'
  }
};

const testDb = {
  yE9q2m: { longURL: 'http://www.lighthouselabs.ca', userID: 'A7ei0p' },
  '2iIe3p': { longURL: 'http://www.google.ca', userID: 'A7ei0p' },
  n0r6Rs: { longURL: 'http://www.uvic.ca', userID: 'A7ei0p' },
  B4e77l: { longURL: 'http://www.reddit.com', userID: 'e7I9U0' },
  '9sm5xK': { longURL: 'http://www.twitter.com', userID: 'e7I9U0' }
};

describe('getUserByEmail', () => {
  it('should return a user given a valid email', () => {
    const user = getUserByEmail('andy@gmail.com', testUsers);
    const expectedOutput = 'e7I9U0';
    assert.equal(user, expectedOutput);
  });
  it('should return undefined when given an invalid email', () => {
    const user = getUserByEmail('john@gmail.com', testUsers);
    assert.isUndefined(user);
  });
});

describe('urlsForUser', () => {
  it('should return an object with URLs given a valid ID', () => {
    const urls = urlsForUser('A7ei0p', testDb);
    const expectedOutput = {
      yE9q2m: 'http://www.lighthouselabs.ca',
      '2iIe3p': 'http://www.google.ca',
      n0r6Rs: 'http://www.uvic.ca'
    };
    assert.deepEqual(urls, expectedOutput);
  });
  it('should return an empty object if the ID does not exist', () => {
    const urls = urlsForUser('fjlkadjflksjda', testDb);
    const expectedOutput = {};
    assert.deepEqual(urls, expectedOutput);
  });
  it('should return an empty object if the ID has no URLs associated with it', () => {
    const urls = urlsForUser('9Euh8s', testDb);
    const expectedOutput = {};
    assert.deepEqual(urls, expectedOutput);
  });
});
