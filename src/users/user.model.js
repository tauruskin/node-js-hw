const mongoose = require("mongoose");
const { Schema } = mongoose;

const userScheme = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});
userScheme.statics.findContactByIdAndUpdate = findContactByIdAndUpdate;

async function findContactByIdAndUpdate(contactId, updateParams) {
  return this.findByIdAndUpdate(
    contactId, {
    $set: updateParams,
  },
    {
      new: true,
    }
  );
}

const userModel = mongoose.model("Contact", userScheme);
module.exports = userModel;