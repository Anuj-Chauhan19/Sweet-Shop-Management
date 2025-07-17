const mongoose = require("mongoose");
const Counter = require("./counter.mongo");

const SweetSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// PRE-SAVE HOOK: Auto-increment ID
SweetSchema.pre("save", async function (next) {
  if (this.isNew && this.id == null) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "sweetid" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.id = counter.seq;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

module.exports = mongoose.model("Sweet", SweetSchema);
