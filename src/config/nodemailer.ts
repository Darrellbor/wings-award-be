import nodemailer from 'nodemailer';
import { emailUser, emailpass, emailhost, emailfrom } from './';

class Nodemailer {
  createTransport() {
    return {
      transporter: nodemailer.createTransport({
        host: emailhost,
        port: 465,
        secure: true, // true for 465, false for other ports like 587
        auth: {
          user: emailUser,
          pass: emailpass,
        },
        tls: {
          rejectUnauthorized: false,
        },
      }),
      helperOptions: (email: string, subject: string, message: string) => {
        return {
          from: emailfrom,
          to: email,
          subject: subject,
          html: message,
        };
      },
    };
  }
}

export default new Nodemailer().createTransport();
