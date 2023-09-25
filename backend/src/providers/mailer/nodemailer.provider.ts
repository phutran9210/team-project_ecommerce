import { Inject, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      requireTLS: true,
      auth: {
        user: process.env.SMTP_MAIL, // your SMTP username
        pass: process.env.SMTP_PS_MAIL, // your SMTP password
      },
    });
  }

  async sendConfirmationEmail(to: string, token: string) {
    // compose the email
    const info = await this.transporter.sendMail({
      from: '"No Reply" <no-reply@example.com>', // sender address
      to: to, // list of receivers
      subject: 'Login Confirmation', // Subject line
      text: `Welcome back! Here is your login authentication code, valid for 5 minutes : ${token}`, // plain text body
    });

    console.log('Message sent: %s', info.messageId);
  }

  async sendEmail({
    to,
    subject,
    text,
  }: {
    to: string;
    subject: string;
    text: string;
  }) {
    const info = await this.transporter.sendMail({
      from: '"No Reply" <no-reply@example.com>',
      to: to,
      subject: subject,
      text: text,
    });

    console.log('Message sent: %s', info.messageId);
  }
}
