const contactModel = require("./contact.model");

exports.getContacts = async (req, res, next) => {
  if (req.query.sub) {
    const filteredContacts = await contactModel.find({
      subscription: req.query.sub,
    });
    res.status(200).send(filteredContacts);
  }
  const { docs } = await contactModel.paginate({}, req.query);
  res.status(200).send(docs);
};

exports.getById = async (req, res, next) => {
  const contactId = req.params.contactId;
  const contact = await contactModel.findById(contactId);
  if (!contact) {
    return res.status(404).send("Not found");
  }
  res.status(200).send(contact);
};

exports.addNewContact = async (req, res, next) => {
  const newContact = await contactModel.create(req.body);
  res.status(201).send(newContact);
};

exports.deleteContact = async (req, res, next) => {
  const contactId = req.params.contactId;
  const deletedContact = await contactModel.findByIdAndDelete(contactId);
  console.log(deletedContact);
  if (deletedContact) {
    res.status(200).send("contact deleted");

  } else {
    res.status(404).send("Not found");
  }
};

exports.changeContact = async (req, res, next) => {
  const contactId = req.params.contactId;
  const changedContact = await contactModel.findContactByIdAndUpdate(contactId, req.body);
  if (changedContact) {
    res.status(200).send(changedContact);
  } else {
    res.status(404).send("Not found");
  }
};