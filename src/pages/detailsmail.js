import {sendmail} from '@directives/mailer.js'

export const post = async ({ request }) => {
  const body = await request.json()
  const name = body.name
  const email = body.email
  const phone = body.phone
  const plot = body.plot
  //const date = body.date
  const subject = 'Plot Selection'

  const report = `<p>Hello, my name is ${name} and I have selected plot number ${plot}. My phone number is ${phone} please contact me with further instructions on how to proceed.</p><br><br><p>Thank you.</p>`

  sendmail(report,subject,email,name).catch((error) => {
    console.error(`Unable to send email: ${error}`)
  })
  
  return {
    body: JSON.stringify({
      message:"Email successfully sent"
    })
  }
}
