const calculateAccountDuration = (effectiveDate, setEndDate, seasonEndDate) => {
  if (!effectiveDate) {
    return 0;
  }
  const start = new Date(effectiveDate);
  // const today = new Date();
  const endDate = new Date(setEndDate) || new Date();
  const seasonEnd = new Date(seasonEndDate) || new Date();

  let diffTime = 0;
  if (seasonEnd > endDate) {
    diffTime = endDate - start;
  } else {
    diffTime = seasonEnd - start;
  }

  //const diffTime = today - start;
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return days;
};

module.exports = {
  calculateAccountDuration,
};
