const mongoose = require("mongoose");
const { Schema } = mongoose;

const userScheme = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscription: {
    type: String,
    enum: ["tree", "pro", "premium"],
    default: "free",
  },
  token: {type: String},
});

async function findUserByEmail(email) {
  return this.find({ email });
}
async function updateToken(id, newToken) {
  return this.findByIdAndUpdate(id, {
    token: newToken,
  });
}

userScheme.statics.findUserByEmail = findUserByEmail;
userScheme.statics.updateToken = updateToken;

const userModel = mongoose.model("User", userScheme);
module.exports = userModel;