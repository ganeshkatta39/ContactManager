const asyncHandler = require("express-async-handler");

//@desc Get all contacts
//@route Get /api/contacts
//@acess public
const getContacts = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "All contacts" });
});

//@desc Get a contact
//@route Get /api/contacts/:id
//@acess public
const getContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "a contact" });
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
  res.status(201).json({ message: "add contact" });
});

//@desc update a contact
//@route Put /api/contacts/:id
//@acess public
const updateContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "update contact" });
});

//@desc Delete a contact
//@route Delete /api/contacts/:id
//@acess public
const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "delete contact" });
});

module.exports = {
  getContact,
  getContacts,
  deleteContact,
  updateContact,
  addContact,
};
