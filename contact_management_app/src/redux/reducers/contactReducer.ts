import { Contact } from "../../../types/contact";
import { ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT } from "../types";

interface Action {
  type: string;
  payload: Contact | string | undefined | any;
}

interface State {
  contacts: Contact[];
}

const initialState: State = {
  contacts: [],
};

const contactReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact: Contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact: Contact) => contact.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default contactReducer;
