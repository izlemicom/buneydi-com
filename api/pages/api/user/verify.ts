import handler from "../../../lib/api/handler";
import { prisma } from "../../../lib/db";
import nodemailer from "nodemailer";
import emailVerificationTemplate from "../../../lib/emailVerificationTemplate";

const api = handler();

api.get(async (req, res) => {
  const { email, verificationCode } = req.query;
  if (!email || !verificationCode) throw new Error("Veri eklenmemiş.");

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

  console.log(new Date().getTime() - getCode.createdAt.getTime());
  console.log(new Date().getTime());
  console.log(getCode.createdAt.getTime());
  console.log(new Date().getTime() - getCode.createdAt.getTime() < 180);

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
