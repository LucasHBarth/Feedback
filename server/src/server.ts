import express from 'express'
import nodemailer from 'nodemailer';
import { prisma } from './prisma';

const app = express();

app.use(express.json())

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "8a76e421854d20",
      pass: "da0b7356e612f1"
    }
  });

app.post('/feedbacks', async (req, res) => {
  
    const {type, comment, screenshot } = req.body;
   
   const feedback = await prisma.feedback.create({
       data: {
           type: type,
           comment: comment,
           screenshot:  screenshot,
       }
   })

   await transport.sendMail({
        from: 'Equipe Barth <barth@gmail.com>',
        to: 'Lucas Barth <contato@barthdesignn.com>',
        subject: 'Novo Feedback',
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
            `<p>Tipo do Feedback: ${type}</p>`,
            `<p>Comentario: ${comment}</p>`,
            `<div>`,
        ].join('\n')

   });

    return res.status(201).json({data: feedback});
});

app.listen(3333, () => {
    console.log('HTTP server running!')
});