// Returns number of unique visits
const getUniqVisits = (url, visitors) => {
  let uniques = 0;
  for (let visitor of visitors) {
    if (Object.keys(visitor.visited_urls).length > 0) {
      const visitedUrls = visitor.visited_urls;
      for (let visitedUrl in visitedUrls) {
        if (visitedUrl === url) {
          uniques++;
          continue;
        }
      }
    }
  }
  return uniques;
};

module.exports = getUniqVisits;
