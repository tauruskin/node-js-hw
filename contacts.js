// import * as fs from "fs";

const fs = require("fs");
const path = require("path");

const { promises: fsPromises } = fs;

const contactsPath = path.join(__dirname, "./db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  return JSON.parse(await fsPromises.readFile(contactsPath, "utf-8"));
}

async function getContactById(contactId) {
  try {
    const list = await listContacts();
    return list.filter((item) => item.id === contactId);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const list = await listContacts();
    const result = list.filter((ite,) => item.id !== contactId);
    await fsPromises.writeFile(contactsPath, JSON.stringify(result));
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  const id = JSON.parse(JSON.stringify(Date.now()).slice(9, 11));
  try {
    const list = await listContacts();
    await fsPromises.writeFile(contactsPath, JSON.stringify([...list, { id, name, email, phone }]));
    
  } catch (error) {
    log(error);
  }

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};