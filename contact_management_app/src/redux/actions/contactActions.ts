import { Contact } from "../../../types/contact";
import { ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT } from "../types";

export const addContact = (contact: Contact) => ({
  type: ADD_CONTACT,
  payload: contact,
});

export const updateContact = (contact: Contact) => ({
  type: UPDATE_CONTACT,
  payload: contact,
  id: contact.id,
});

export const deleteContact = (id: string) => ({
  type: DELETE_CONTACT,
  payload: id,
});
