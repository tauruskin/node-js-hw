const { Router } = require("express");
const Joi = require("joi");
const router = Router();

const { validate } = require("../helpers/validate");
const { runAsyncWrapper } = require("../helpers/AsyncWrapper");
const { addNewUser, signIn, authorise, logout, currentUser, updateSubscription } = require("./users.controller");

const UserScheme = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});


router.post("/register", validate(UserScheme), runAsyncWrapper(addNewUser));

router.post("/login", validate(UserScheme), runAsyncWrapper(signIn));

router.post("/logout", runAsyncWrapper(authorise), runAsyncWrapper(logout));
  

router.get("/current", runAsyncWrapper(authorise), runAsyncWrapper(currentUser));

router.patch("/", runAsyncWrapper(authorise), runAsyncWrapper(updateSubscription));

exports.userRouter = router;