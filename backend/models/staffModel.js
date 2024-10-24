const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true},
  work: { type: String, required: true },
});

const Staff = mongoose.model("Staff", staffSchema);
module.exports = Staff;