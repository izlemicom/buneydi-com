import handler from "../../../lib/api/handler";
import { prisma } from "../../../lib/db";
import nodemailer from "nodemailer";
import emailVerificationTemplate from "../../../lib/emailVerificationTemplate";

const api = handler();

api.get(async (req, res) => {
  const { email, verificationCode } = req.body;
  if (!email || !verificationCode) throw new Error("Veri eklenmemiş.");

  const getCode = await prisma.verificationCode
    .findUnique({
      where: { email: email },
    })
    .catch((error) => {
      console.error(error);
      throw new Error("Bu sorunu çözmeye çalışıyoruz.");
    });

  let success = false;

  if (getCode.verificationCode === verificationCode) success = true;

  res.status(200).json({
    success: success,
  });
});

api.post(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new Error("Veri eklenmemiş.");

  const verificationCode = Math.floor(100000 + Math.random() * 900000);

  const previousCodes = await prisma.verificationCode
    .deleteMany({
      where: {
        email: email,
      },
    })
    .catch((error) => {
      console.error(error);
      throw new Error("Bu sorunu çözmeye çalışıyoruz.");
    });

  const createCode = await prisma.verificationCode
    .create({
      data: {
        email: email,
        verificationCode: verificationCode,
      },
    })
    .catch((error) => {
      console.error(error);
      throw new Error("Bu sorunu çözmeye çalışıyoruz.");
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
    to: email, // list of receivers
    subject: "E-posta Doğrulama Kodu", // Subject line
    html: emailVerificationTemplate(verificationCode), // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  res.status(200).json({
    success: true,
  });
});

export default api;
