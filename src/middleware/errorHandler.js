module.exports = (err, req, res, next) => {
  console.error(err);
  console.error("❌ ERROR:", err.message);
  res.status(400).json({ error: err.message });
};
