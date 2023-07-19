const router = require("express").Router();
const { User, validate } = require("../models/users");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validObjectId = require("../middleware/validObjectId");

// create user router
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ messgae: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(403)
      .send({ message: "User with this email already exist" });
  const salt = bcrypt.genSalt(Number(process.env.SALT));
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  let newUser = await new User({
    ...req.body,
    password: hashPassword,
  }).save();

  newUser.password = undefined;
  newUser.__v = undefined;

  res
    .status(200)
    .send({ data: newUser, message: "Account successfully created" });
});

// get all users routes
router.get("/", admin, async (req, res) => {
  const users = await User.find().select("-password - __v");
  res.status(200).send({ data: users });
});

//get user by Id
router.get("/:id", [validObjectId, auth], async (req, res) => {
  const user = await User.findById(req.params.id.select("-password-__v"));
  res.status(200).send({ data: user });
});

// update user by Id

router.put("/:id", [validObjectId, auth], async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  ).select("-password-__v");
  res.status(200).send({ data: user });
});

// delete user by id
router.delete("/:id", [validObjectId, auth], async (req, res) => {
  await User.findByIdAndDelete();
  res.status(200).send({ message: "Successfully deleted user" });
});
module.exports = router;
