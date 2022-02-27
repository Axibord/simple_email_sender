import nodemailer from 'nodemailer'

// reusable transporter with default SMTP transport
export const transporter = nodemailer.createTransport({
  port: 465,
  host: 'smtp.gmail.com',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'GOOGLE APP PASSWORD', // generated APP password (special for SMTP transport), you can get yours at https://myaccount.google.com/security, then go in "App passwords"
  },
  secure: true,
})
