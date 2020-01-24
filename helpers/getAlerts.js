// Returns array of alerts for a given visitor, if no alerts exist for that user or the visitor id doesn't exist in db, return empty array
const getAlerts = (visId, visitorsArr) => {
  for (let visitor of visitorsArr) {
    if (visitor.id === visId) {
      return visitor.alerts;
    }
  }
  return [];
};

module.exports = getAlerts;
