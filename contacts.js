import yargs from "yargs";
import * as contactsService from "./db/index.js";

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactsService.getAllContacts();
      return console.log(allContacts);
    case "getContactById":
      const oneContact = await contactsService.getContactById(id);
      return console.log(oneContact);
    case "addContact":
      const newContact = await contactsService.addContact({
        name,
        email,
        phone,
      });
      return console.log(newContact);
    case "removeContact":
      const deleteContact = await contactsService.removeContact(id);
      return console.log(deleteContact);

    default:
      console.log("Unknown action");
  }
};
const { argv } = yargs(process.argv.slice(2));
invokeAction(argv);
