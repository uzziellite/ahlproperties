//import {sendmail} from '@directives/mailer.js'

export const post = async ({ request }) => {
  const customer = await request.json()
  return {
    body: JSON.stringify({
      message:"Reminder successfully set",
      customer:customer
    })
  }
}
