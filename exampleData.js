const db = {
  users: {
    user_id: {
      id: 'skjadh',
      name: 'sakjd',
      email: 'asdkh',
      hashedpw: 'kj'
    }
  },
  urls: {
    shortURL: {
      longURL: '',
      user_id: '',
      created: Date.now()
    }
  },
  visitors: [
    {
      id: 'dsadsa',
      visited_urls: { sadsad: [Date.now()] },
      alerts: [{ type: 'danger', msg: 'u messed up' }]
    }
  ]
};

console.log(db);
