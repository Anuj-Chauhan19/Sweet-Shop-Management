const Counter = require("../models/counter.mongo");

const getNextId = async () => {
  const counter = await Counter.findByIdAndUpdate(
    { _id: "sweetid" },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return counter.sequence_value;
};

module.exports = getNextId;
