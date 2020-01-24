// Returns array of alerts for a given visitor, if no alerts exist for that user or the visitor id doesn't exist in db, return empty array
const getAlerts = (visIndex, visitorsArr) => {
  if (visitorsArr[visIndex]) {
    return visitorsArr[visIndex].alerts;
  }
  return [];
};

module.exports = getAlerts;
