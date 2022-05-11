import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'
const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "8a76e421854d20",
      pass: "da0b7356e612f1"
    }
  });

export class NodemailerMailAdapter implements MailAdapter{
   async sendMail({subject, body}: SendMailData){
            await transport.sendMail({
            from: 'Equipe Barth <barth@gmail.com>',
            to: 'Lucas Barth <contato@barthdesignn.com>',
            subject,
            html: body,

        });
    }
}