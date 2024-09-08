import nodemailer from "nodemailer";

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // tls: {
    //   rejectUnauthorized: process.env.NODE_ENV === 'production', // Enable TLS certificate validation in production
    // },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;