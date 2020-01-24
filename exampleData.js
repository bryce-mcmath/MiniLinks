const db = {
  users: {
    '[alphanumeric string]': {
      id: '[alphanumeric string]',
      name: 'Adam Sambler',
      email: 'adam@sandals.com',
      hashedpw: '[hash]'
    }
  },
  urls: {
    '[alphanumeric string]': {
      longURL: '[alphanumeric string]',
      user_id: '[alphanumeric string]',
      created: '[Date string]'
    }
  },
  visitors: [
    {
      id: '[alphanumeric string]',
      visited_urls: { '[alphanumeric string]': ['Date string', 'Date string'] },
      alerts: [{ type: '[bootstrap prefix]', msg: '[string]' }]
    }
  ]
};
