const userModel = require("./user.model");

exports.getContacts = async (req, res, next) => {
  const listContacts = await userModel.find();
  res.status(200).json(listContacts);
};

exports.getById = async (req, res, next) => {
  const contactId = req.params.contactId;
  const contact = await userModel.findById(contactId);
  if (!contact) {
    return res.status(404).send("Not found");
  }
  res.status(200).send(contact);
};

exports.addNewContact = async (req, res, next) => {
  const newContact = await userModel.create(req.body);
  res.status(201).send(newContact);
};

exports.deleteContact = async (req, res, next) => {
  const contactId = req.params.contactId;
  const deletedContact = await userModel.findByIdAndDelete(contactId);
  console.log(deletedContact);
  if (deletedContact) {
    res.status(200).send("contact deleted");
  } else {
    res.status(404).send("Not found");
  }
};

exports.changeContact = async (req, res, next) => {
  const contactId = req.params.contactId;
  const changedContact = await userModel.findContactByIdAndUpdate(contactId, req.body);
  if (changedContact) {
    res.status(200).send(changedContact);
  } else {
    res.status(404).send("Not found");
  }
};