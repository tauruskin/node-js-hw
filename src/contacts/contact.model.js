const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

const contactScheme = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

contactScheme.statics.findContactByIdAndUpdate = findContactByIdAndUpdate;

async function findContactByIdAndUpdate(contactId, updateParams) {
  return this.findByIdAndUpdate(contactId, { $set: updateParams }, { new: true, });
}

contactScheme.plugin(mongoosePaginate);
const contactModel = mongoose.model("Contact", contactScheme);
module.exports = contactModel;