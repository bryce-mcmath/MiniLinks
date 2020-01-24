// Returns random six character alphanumeric string with varied case
const generateId = () => {
  // assigns an array of random alphanumeric characters (lowercase)
  let str = Math.random()
    .toString(36)
    .substring(2, 8)
    .split('');

  let alph = 'abcdefghijklmnopqrstuvwxyz';

  for (let i = 0; i < str.length; i++) {
    // If it's a alphabet char, randomly uppercase
    if (alph.indexOf(str[i]) > -1 && Math.round(Math.random()) === 1) {
      str[i] = str[i].toUpperCase();
    }
  }

  return str.join('');
};

module.exports = generateId;
