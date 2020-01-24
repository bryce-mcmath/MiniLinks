const getUniqVisits = (url, visitors) => {
  let uniques = 0;
  for (let visitor of visitors) {
    const visitedUrls = visitor.visited_urls;
    for (let visitedUrl of visitedUrls) {
      if (visitedUrl === url) {
        uniques++;
        continue;
      }
    }
  }
  return uniques;
};

module.exports = getUniqVisits;
