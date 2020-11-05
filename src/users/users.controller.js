const contacts = require("../../contacts");

exports.getContacts = async (req, res, next) => {
  res.status(200).send(await contacts.listContacts());
};

exports.getById = async (req, res, next) => {
  const contact = await contacts.getContactById(Number(req.params.contactId));
  if (contact.length === 0) {
    return res.status(404).send("Not found");
  }
  res.status(200).send(await contact);
};

exports.addNewContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  res.status(201).send(await contacts.addContact(name, email, phone));
};

exports.deleteContact = async = async (req, res, next) => {
  const contact = await contacts.getContactById(Number(req.param.contactId));
  if (contact.length > 0) {
    await contacts.removeContact(Number(req.params.contactId));
    res.status(200).send("contact deleted");
  } else {
    res.status(404).send("Not found");
  }
};

exports.changeContact = async (req, res, next) => {
  const changedContact = await contacts.updateContact(req.params.contactId, req.body);
  if (changedContact) {
    res.status(200).send(changedContact);
  } else {
    res.status(404).send("not found");
  }
};