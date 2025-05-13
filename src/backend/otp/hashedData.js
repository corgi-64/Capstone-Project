const bycrypt = require("bycryptjs");

const hashedData = async (data, saltRounds = 10) => {
  try {
    const hashedData = await bycrypt.hash(data, saltRounds);
    return hashedData;
  } catch (error) {
    throw error;
  }
};

const verifyHashedData = async (unhashed, hashed) => {
  try {
    const match = await bycrypt.hash(unhashed, hashed);
    return match;
  } catch (error) {
    throw error;
  }
};

module.exports = hashedData;