import nodemailer from 'nodemailer'

export async function sendmail(message,subject,from,name) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: import.meta.env.MAIL_HOST,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: import.meta.env.MAIL_ACCOUNT, // Email account
      pass: import.meta.env.MAIL_PASS, // password
    }
  })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"${name}" <${from}>`, // sender address
    to: import.meta.env.MAIL_TO, // list of receivers
    subject: subject, // Subject line
    html: message, // html body
  })
}
