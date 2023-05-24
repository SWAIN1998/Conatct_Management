import { NextApiRequest, NextApiResponse } from "next";
import { Contact } from "../../../types/contact";
import { generateId } from "../../../utils/generateId";

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
  const { method } = req;
  const { id } = req.query;
  const contactIndex = contacts.findIndex(
    (contact: Contact) => contact.id === id
  );

  switch (method) {
    case "GET":
      res.status(200).json(contacts[contactIndex]);
      break;
    case "PUT":
      const { firstName, lastName, status } = req.body;
      const contact = {
        id,
        firstName,
        lastName,
        status,
      };
      contacts[contactIndex] = contact;
      res.status(200).json(contact);
      break;
    case "DELETE":
      contacts.splice(contactIndex, 1);
      res.status(200).json({ message: "Contact deleted successfully" });
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
