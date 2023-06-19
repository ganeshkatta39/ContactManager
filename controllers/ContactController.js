const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route Get /api/contacts
//@acess public
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

//@desc Get a contact
//@route Get /api/contacts/:id
//@acess public
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    req.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//@desc Add a contact
//@route Post /api/contacts
//@acess public
const addContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  console.log({ name, email, phone });
  if (!name || !email || !phone) {
    res.status(404);
    throw new Error("all the fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
  });

  res.status(201).json(contact);
});

//@desc update a contact
//@route Put /api/contacts/:id
//@acess public
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    req.status(404);
    throw new Error("Contact not found");
  }

  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updateContact);
});

//@desc Delete a contact
//@route Delete /api/contacts/:id
//@acess public
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    req.status(404);
    throw new Error("Contact not found");
  }
  await Contact.remove();
  res.status(200).json("contact deleted");
});

module.exports = {
  getContact,
  getContacts,
  deleteContact,
  updateContact,
  addContact,
};
