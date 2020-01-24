// Return array of all visits for a given short url
const getVisits = (url, visitorsArr) => {
  const visits = [];
  if (visitorsArr) {
    for (let visitor in visitorsArr) {
      for (let id of visitor.visited_urls) {
        if (id === url) {
          visits.concat(visitor.visited_urls[id]);
        }
      }
    }
  }
  return visits;
};

module.exports = getVisits;
