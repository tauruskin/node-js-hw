const userModel = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UnauthorisedError } = require("../helpers/errors.constructor");

exports.addNewUser = async (req, res, next) => {
  const { email, password } = req.body;
  const passwordHash = await bcrypt.hash(
    password, Number(process.env.BCRYPT_SALT)
  );
  const [existUser] = await userModel.findUserByEmail(email);

  if (existUser) {
    return res.status(409).send("Email in use");
  }
  const newUser = await userModel.create({ email, password: passwordHash });
  res.status(201).send({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

exports.signIn = async (req, res, next) => {
  const {email, password} = req.body;
  const [existUser] = await userModel.findUserByEmail(email);

  if (existUser) {
    const validPassword = await bcrypt.compare(password, existUser.password);
    if (!validPassword) {
      return res.status(401).send("Email or password is wrong");
    }
    const token = jwt.sign({ id: existUser._id }, process.env.JWT_SECRET, {
      expiresIn: 2 * 24 * 60 * 60,

    });
    await userModel.updateToken(existUser._id, token);

    return res.status(200).send({
      token: token,
      user: {
        email: existUser.email,
        subscription: existUser.subscription,
      },

    });
  }
  res.status(401).send("Email or password is wrong");
};

exports.logout = async (req, res, next) => {
  const user = req.user;
  await userModel.updateToken(user._id, null);
  return res.status(204).send();
};

exports.authorise = async (req, res, next) => {
  // 1. витягнути токен користувача з заголовка Authorisation
  const authorisationHeader = req.get("Authorisation");
  const token = authorisationHeader.replace("Bearer ", "");

  // 2. витягнути id користувача з пейлоада або вернути користувачу
  // помилку зі статус кодом 401
  let userId;
  try {
    userId = await jwt.verify(token, process.env.JWT_SECRET).id;
  } catch (err) {
    next(new UnauthorisedError("Not authorised"));
  }

  // 3. витягнути відповідного користувача. Якщо такого немає - викинути
  // помилку зі статус кодом 401
  // userModel - модель користувача в нашій системі
  const user = await userModel.findById(userId);
  if (!user || user.token !== token) {
    throw new UnauthorisedError("Not authorised");
  }

  // 4. Якщо все пройшло успішно - передати запис користувача і токен в req
  // і передати обробку запиту на наступний middleware
  req.user = user;
  req.token = token;

  next();
};

exports.currentUser = async (req, res, next) => {
  const user = req.user;
  res.status(200).send({ email: user.email, subscription: user.subscription });
};

exports.updateSubscription = async (req, res, next) => {
  await userModel.findByIdAndUpdate(req, user._id, {
    subscription: "pro",
  });
  res.status(200).send("Subscription updated");
};