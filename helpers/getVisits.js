// Return array of all visits for a given short url. Each visit in this array will have a id attribute of the shortURL and a timestamp attribute of a date string
const getVisits = (url, visitorsArr) => {
  const visits = [];
  if (visitorsArr) {
    for (let visitor of visitorsArr) {
      // If visited urls isn't empty
      if (Object.keys(visitor.visited_urls).length > 0) {
        for (let id in visitor.visited_urls) {
          if (id === url) {
            const visitedUrls = visitor.visited_urls;
            for (let i = 0; i < visitedUrls[id].length; i++) {
              visits.push({ id: visitor.id, timestamp: visitedUrls[id][i] });
            }
          }
        }
      }
    }
  }
  return visits;
};

module.exports = getVisits;
