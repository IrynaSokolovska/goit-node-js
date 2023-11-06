import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

export const contactsPath = path.resolve("db", "contacts.json");
console.log(contactsPath);

export const getAllContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
};
export const getContactById = async (id) => {
  const contacts = await getAllContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
};
export const addContact = async ({ name, email, phone }) => {
  const contacts = await getAllContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};
export const removeContact = async (id) => {
  const contacts = await getAllContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};
