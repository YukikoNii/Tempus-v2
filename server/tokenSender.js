// // TODO: probably use an existing service later.
// import nodeemailer from "nodemailer";
// import jwt from "jsonwebtoken";

// console.log();

// const transporter = nodeemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

// const token = jwt.sign(
//   {
//     data: "Token Data",
//   },
//   "ourSecretKey",
//   { expiresIn: "15m" }
// );

// const mailConfiguration = {
//   from: process.env_EMAIL,
//   to: "yukiko_nii2@yahoo.co.jp",
//   subject: "Tempus: Verify your Email",
//   text: `Please follow this link to verify your email: http://localhost:5050/verify/${token}`,
// };

// transporter.sendMail(mailConfiguration, function (error, info) {
//   if (error) throw Error(error);
//   console.log("Email Sent Successfully");
// });
