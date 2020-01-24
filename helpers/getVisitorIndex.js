// Returns index of visitor in db array, if doesn't exist returns -1
const getVisitorIndex = (id, visitorsArr) => {
  for (let i = 0; i < visitorsArr.length; i++) {
    if (visitorsArr[i].id === id) {
      return i;
    }
  }
  return -1;
};

module.exports = getVisitorIndex;
