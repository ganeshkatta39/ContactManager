const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route Get /api/contacts
//@acess private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@desc Get a contact
//@route Get /api/contacts/:id
//@acess private
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
//@acess private
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
    user_id: req.user.id,
  });

  res.status(201).json(contact);
});

//@desc update a contact
//@route Put /api/contacts/:id
//@acess private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User not authorised to update the contact");
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
//@acess private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    req.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User not authorised to update the contact");
  }

  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json("contact deleted");
});

module.exports = {
  getContact,
  getContacts,
  deleteContact,
  updateContact,
  addContact,
};
