import nodemailer from 'nodemailer';
import { emailUser, emailpass, emailhost, emailfrom } from './';

class Nodemailer {
  createTransport() {
    const transporter = nodemailer.createTransport({
      host: emailhost,
      port: 465,
      secure: true, // true for 465, false for other ports like 587
      pool: true,
      auth: {
        user: emailUser,
        pass: emailpass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    return {
      transporter,
      helperOptions: (email: string, subject: string, message: string) => {
        return {
          from: emailfrom,
          to: email,
          subject: subject,
          html: message,
        };
      },
      closeTransport: () => {
        transporter.close();
      },
    };
  }
}

export default new Nodemailer().createTransport();
