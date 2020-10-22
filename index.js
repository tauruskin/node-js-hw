const contacts = require("./contacts");

const argv = require("yargs").argv;

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      console.table(await contacts.listContacts());
      break;

    case 'get':
      console.table(await contacts.getContactById(id));
      break;

    case 'add':
      await contacts.addContact(name, email, phone);
      console.table(await contacts.listContacts());
      break;

    case 'remove':
      await contacts.removeContact(id);
      console.table(await contacts.listContacts());
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);