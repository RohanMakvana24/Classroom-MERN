import nodemailer from "nodemailer";

export const sendMail = async (toEmail, subject, htmlContent) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: "7888f4005@smtp-brevo.com",
        pass: "CJyDdM8cF07ZPKNb",
      },
      tls: {
        rejectUnauthorized: false, // Disable strict SSL check
      },
    });
    let info = await transporter.sendMail({
      from: "rohanmakvana90@gmail.com",
      to: toEmail,
      subject: subject,
      html: htmlContent,
    });
    console.log("Email Send Succefully");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default sendMail;
