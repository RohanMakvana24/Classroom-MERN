import nodemailer from "nodemailer";

export const sendMail = async (toEmail, subject, htmlContent) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: "7888f4003@smtp-brevo.com",
        pass: "IhK0HYkaJAXBmbxU",
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
