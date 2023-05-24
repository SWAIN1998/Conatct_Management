import { NextApiRequest, NextApiResponse } from "next";
import { Contact } from "../../../../types/contact";
import { generateId } from "../../../../utils/generateId";

const contacts: Contact[] = [
  {
    id: generateId(),
    firstName: "John",
    lastName: "Doe",
    status: "Active",
  },
  {
    id: generateId(),
    firstName: "Jane",
    lastName: "Doe",
    status: "Inactive",
  },
];

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const contact = contacts.find((contact: Contact) => contact.id === id);
  res.status(200).json(contact);
};
