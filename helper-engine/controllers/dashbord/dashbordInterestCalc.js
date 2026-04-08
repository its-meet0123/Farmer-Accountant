const calculateAccountDuration = (effectiveDate) => {
  const start = new Date(effectiveDate);
  const today = new Date();

  const diffTime = today - start;
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return days;
};

module.exports = {
  calculateAccountDuration,
};
