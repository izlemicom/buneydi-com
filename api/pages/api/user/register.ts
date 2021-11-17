import handler from "../../../lib/api/handler";
import CryptoJS from "crypto-js";
import { prisma } from "../../../lib/db";
import nodemailer from "nodemailer";

const api = handler();

api.post(async (req, res) => {
  const { username, password, name } = req.body;
  if (!username || !password || !name) throw new Error("Veri eklenmemiş.");

  const user = await prisma.user.findUnique({ where: { email: username } });
  if (user) throw new Error("Daha önceden kayıt yapılmış.");
  var hash = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);
  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: username,
      password: hash.toString(),
    },
  });

  let transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"BuNeydi - İçerik Platformu" <info@buneydi.com>', // sender address
    to: "hakangksl@hotmail.com, info@buneydi.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  res.status(200).json(newUser);
});

export default api;
