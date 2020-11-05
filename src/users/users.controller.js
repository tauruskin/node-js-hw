const contacts = require("../../contacts");

exports.getContacts = async (req, res, next) => {
  res.status(200).send(await contacts.listContacts());
};

exports.getById = async (req, res, next) => {
  const contact = await contacts.getContactById(Number(req.params.contactId));
  console.log(contact.length);
  if (contact.length === 0) {
    return res.status(404).send("Not found");
  }
  res.status(200).send(await contact);
};