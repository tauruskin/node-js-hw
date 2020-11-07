const { Router } = require("express");
const Joi = require("joi");
const router = Router();
const { getContacts, getById, addNewContact, deleteContact, changeContact, } = require("./users.controller");
const { validate } = require("../helpers/validate");
const { runAsyncWrapper } = require("../helpers/AsyncWrapper");

const createUserScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateUserScheme = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
}).min(1);

router.get("/api/contacts", runAsyncWrapper(getContacts));

router.get("/api/contacts/:contactId", runAsyncWrapper(getById));

router.post("/api/contacts", validate(createUserScheme, "missing required name field"),
  runAsyncWrapper(addNewContact));
  
router.delete("/api/contacts/:contactId", runAsyncWrapper(deleteContact));

router.patch("/api/contacts/:contactId", validate(updateUserScheme, "missing fields"),
  runAsyncWrapper(changeContact));

exports.userRouter = router;