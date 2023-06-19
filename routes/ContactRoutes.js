const express = require("express");
const router = express.Router();
const {
  getContact,
  getContacts,
  deleteContact,
  updateContact,
  addContact,
} = require("../controllers/ContactController");

router.route("/").get(getContacts);

router.route("/").post(addContact);

router.route("/:id").put(updateContact);

router.route("/:id").get(getContact);

router.route("/:id").delete(deleteContact);
module.exports = router;
