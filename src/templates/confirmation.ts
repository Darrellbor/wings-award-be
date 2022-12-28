import Logger from '../core/Logger';
import Nodemailer from '../config/nodemailer';
import { Types } from 'mongoose';
const { transporter, helperOptions, closeTransport } = Nodemailer;

export const confirmationEmail = async (
  email: string,
  signature: string,
  voteId: Types.ObjectId
): Promise<void> => {
  const mailBody = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Mailer Template</title>
      <link rel="preconnect" href="https://fonts.gstatic.com">
    </head>
  
    <body style="font-family: 'Open Sans', sans-serif;margin: auto;max-width: 550px;margin-top: 150px;">
      <div class="Mailer">
        <div class="Mailer__logo">
          <img src="https://lh3.googleusercontent.com/U0muk-tcN3wGnL31Q-tbWTiaIKswUvr5dP03hAFZfiArTLKKKWL-ElVCs4TqR6-obWPKQG2vv_WAn5rTrCX6FPBjGPFaZffvUEMYRGcxEOqB9nsYFhCAgHX0aN-nygXl-Fec6t9dZY11hrNGU3oCHqd4t8PVc7JbNCuzNdEGFANVuiL8gdvngG5Tt3OS5aTVQOmJIv8D-gvrNK9Xq9ICZhIlaxR0v2WudktDHHXRa8Kc7PXFa63o-8nAT1sm28z4cz0fNwAGBAqgWkdhROzVkK46-WwIgIh4RU6juZy9Oi6quAh6mv6mqglZZ57pBX40D3e3mtC6fugQFCiRSHWo71ku1RakPkycp_DPHpXS3QDux4J32rQKcq-sQICFiKGNSrXy0DJDK2J4grdyXXma6zT-w6FHKN732u364tUbBc0WuI74rZM5RGvrWCsiqVxlY7hMDNawu7RdkgBBb4eAL6Y2A_avYkk9OVzaa5xIILofq7hGkLq4fb37TxkCbYOvVaASEMFqbzJa-EujXK5o5YSlyfWnHJ71lHFXxUi4BHIkL1kq1Sw9dJ7da2uQ5aMdPhRG5_ecsPyKYgl8JA5VmuLs8CRClYRlCR4Le-9H2kg7sHf6ladDTYe3GQw-Wmagnys1vy7o_qcfRKDjLSMZhqFYHpGZHsaARPFKsYcEQDQ1cs5TaL8HbBr7_tj9gaMBoxmRawRFu_uXlYfGlPWlrJAZ=w154-h54-no?authuser=0" alt="logo">
        </div>
  
        <div class="Mailer__header" style="margin-top: 60px;margin-left: 20px;font-weight: 700;font-size: 25px;">Confirm Your Votes</div>
  
        <div class="Mailer__content" style="margin-top: 30px;margin-left: 26px;line-height: 1.8rem;letter-spacing: 0.4px;">
          Hello there,<br>
          You recently used this email to vote on the wings award 2020 platform
        </div>
  
        <a href="https://wings-award.netlify.app/confirmation/${email}/${signature}/${voteId}"><button class="Mailer__btn" style="background-color: #490a49;width: 100%;border-radius: 8px;color: #fff;padding: 20px;text-align: center;margin: auto;margin-top: 30px;margin-bottom: 10px;margin-left: 30px;outline: none;font-size: 18px;font-weight: bold;max-width: 500px;cursor: pointer;border: none;">Confirm Your Votes</button></a><br><br>
  
        <span class="Mailer__btn__help-text" style="margin-left: 30px;margin-top: 20px;">If you are having issues clicking the button; use the link below
        </span><a href="https://wings-award.netlify.app/confirmation/${email}/${signature}/${voteId}" class="Mailer__btn--help" style="margin-bottom: 30px;margin-top: 10px;margin-left: 30px;display: block;max-width: 500px;font-size: 18px;">https://wings-award.netlify.app/confirmation/${email}/${signature}/${voteId}</a>
  
        <div class="Mailer__need-help" style="font-weight: bold;margin-left: 26px;font-size: 14px;margin-top: 16px;">
          Questions? Email us at
          <a href="mailto:cpc@covenantuniversity.edu.ng">cpc@covenantuniversity.edu.ng</a>
        </div>
      </div>
      
    </body>
  </html>
  `;
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore eslint-disable-next-line
    const { err } = await transporter.sendMail(
      helperOptions(email, 'Confirm Your Wings Award Votes', mailBody)
    );
    if (!err) {
      console.log(`Successfully sent email to ${email}`);
    } else {
      console.log(`Error occurred whilst sending email to: ${email}. Error: ${err}`);
    }
    // closeTransport();
  } catch (err) {
    Logger.error(err);
    // closeTransport();
  }
};
