import express from "express"
import User from "../model/usermodel.js";

 export const SignIn =  (async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    console.log(req.body.email);
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "invalid email or password" });
  })


export const  signUp =  async (req, res) => {
  const newUser = await new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
  });
  const user = await newUser.save();
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "shopping.cart.ind.lgo@gmail.com", // generated ethereal user
      pass: "kasmvuqnqvsbugfn", // generated ethereal password
    },
  });
  let x = await transporter.sendMail({
    from: "shopping.cart.ind.lgo@gmail.com", // sender address
    to: `${req.body.email}`, // list of receivers
    subject: "Thanks For Registering With Us.", // Subject line
    text: "welcome to shopping cart", // plain text body
    html: `<b>Thank you for registering with us${req.body.name} .</b>`, // html body
  });
  console.log(x);
  res.send({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user),
  });
};



  export const userProfile = (async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updateuser = await user.save();
      res.send({
        id: updateuser._id,
        name: updateuser.name,
        email: updateuser.email,
        token: generateToken(updateuser),
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })

export const removeUser = async (req, res) => {
      try {
          await User.remove({});
          res.status(200).json({ data: data });
      } catch (error) {
        console.log(error);
    res.status(404).send({ message: "try again" });
      }
}
  
export const dummyUsers = async(req, res) => {
    try {
        const createdUsers = await User.insertMany(req.body.users)
        res.status(200).json({ data: createdUsers });
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: "try again" });
    }
}


