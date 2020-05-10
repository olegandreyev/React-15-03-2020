const nodemailer = require("nodemailer");

class EmailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'nickolas.wolff@ethereal.email',
        pass: 'vDfFaqc79MwGynXt5R'
      }
    });
  }

  async sendEmail({ content, subject, to }) {
    let info = await this.transporter.sendMail({
      from: '"Social App Network 👻" <nickolas.wolff@ethereal.email>', // sender address
      to: to,
      subject,
      html: content
    });
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }

}

module.exports = EmailSender;
