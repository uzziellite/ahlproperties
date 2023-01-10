import {sendmail} from '@directives/mailer.js'

export const post = async ({ request }) => {
  const body = await request.json()
  const name = body.name
  const email = body.email
  const phone = body.phone
  //const date = body.date
  const subject = 'Property Site Visit'

  const report = `<p>Hello, my name is ${name} and I want to book a site visit. My phone number is ${phone} and you can contact me with further instructions on how to proceed.</p><br><br><p>Thank you.</p>`

  await sendmail(report,subject,email,name).catch((error) => {
    console.error(`Unable to send email: ${error}`)
  })
  
  return {
    body: JSON.stringify({
      message:"Email successfully sent"
    })
  }
}
