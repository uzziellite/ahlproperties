import nodemailer from 'nodemailer'

export async function sendmail(message,subject,from,name) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "mail.ahlproperties.co.ke",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "no-reply@ahlproperties.co.ke", // Email account
      pass: "f1];q;7HR.ga", // password
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
