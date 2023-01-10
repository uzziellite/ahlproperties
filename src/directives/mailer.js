import nodemailer from 'nodemailer'

export async function sendmail(message,subject,from,name) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "mail.ahlproperties.co.ke",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: import.meta.env.PUBLIC_MAIL_ACCOUNT, // Email account
      pass: import.meta.env.PUBLIC_MAIL_PASS, // password
    }
  })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"${name}" <${from}>`, // sender address
    to: "info@ahlproperties.co.ke", // list of receivers
    subject: subject, // Subject line
    html: message, // html body
  })
}
