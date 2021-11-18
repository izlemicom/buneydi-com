import handler from "../../../lib/api/handler";
import { prisma } from "../../../lib/db";
import nodemailer from "nodemailer";
import emailVerificationTemplate from "../../../lib/emailVerificationTemplate";
import axios from "axios";

const api = handler();

api.get(async (req, res) => {
  const { email, verificationCode, token } = req.query;
  if (!email || !verificationCode) throw new Error("Veri eklenmemiş.");

  const response: any = await axios({
    params: {
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: token,
    },
    method: "POST",
    baseURL: "https://www.google.com",
    url: "/recaptcha/api/siteverify",
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (err) {
      const error = err.response.data.error;
      console.error(error);
      throw new Error(error);
    });
  console.log(response);
  if (!response.success) throw new Error("Çok fazla giriş yaptınız.");

  const getCode = await prisma.verificationCode
    .findUnique({
      where: { email: email.toString() },
    })
    .catch((error) => {
      console.error(error);
      throw new Error("Bu sorunu çözmeye çalışıyoruz.");
    });

  let success = false;

  if (!getCode)
    throw new Error("E-posta adresinize gönderilen kodun süresi doldu.");

  if (
    getCode.verificationCode === parseInt(verificationCode.toString()) &&
    new Date().getTime() - getCode.createdAt.getTime() < 180000
  ) {
    success = true;
    const previousCodes = await prisma.verificationCode
      .deleteMany({
        where: {
          email: email.toString(),
        },
      })
      .catch((error) => {
        console.error(error);
        throw new Error("Bu sorunu çözmeye çalışıyoruz.");
      });
  } else if (new Date().getTime() - getCode.createdAt.getTime() > 180000) {
    const previousCodes = await prisma.verificationCode
      .deleteMany({
        where: {
          email: email.toString(),
        },
      })
      .catch((error) => {
        console.error(error);
        throw new Error("Bu sorunu çözmeye çalışıyoruz.");
      });
    throw new Error("E-posta adresinize gönderilen kodun süresi doldu.");
  } else {
    throw new Error("E-posta adresinize gönderilen kodu yanlış girdiniz.");
  }

  res.status(200).json({
    success: success,
  });
});

api.post(async (req, res) => {
  const { email, token } = req.body;
  if (!email) throw new Error("Veri eklenmemiş.");
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (user) throw new Error("Daha önceden kayıt yapılmış.");
  const response: any = await axios({
    params: {
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: token,
    },
    method: "POST",
    baseURL: "https://www.google.com",
    url: "/recaptcha/api/siteverify",
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (err) {
      const error = err.response.data.error;
      console.error(error);
      throw new Error(error);
    });
  console.log(response);

  if (!response.success) throw new Error("Çok fazla giriş yaptınız.");

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
  let info = await transporter
    .sendMail({
      from: '"BuNeydi - İçerik Platformu" <info@buneydi.com>', // sender address
      to: email, // list of receivers
      subject: "E-posta Doğrulama Kodu", // Subject line
      html: emailVerificationTemplate(verificationCode), // html body
    })
    .catch((err) => {
      console.error(err);
      throw new Error("Bu sorunu çözmeye çalışıyoruz.");
    });
  console.log(info);
  console.log("Message sent: %s", info.messageId);

  res.status(200).json({
    success: true,
  });
});

export default api;
