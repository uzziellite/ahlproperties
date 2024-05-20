/*import {sendmail} from '@directives/mailer.js'

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
}*/

/*export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    
    let reply;
    let error;
    const body = await request.json();
    const name = body.name;
    const email = body.email;
    const phone = body.phone;

    //Message Data to be sent as form data
    //for compatibility with contact form 7
    const formData = new FormData();
    formData.append('your-name',name);
    formData.append('your-email',email);
    formData.append('your-phone',phone);
    formData.append('your-subject','Book Site Visit');

    //Prepare basic Authentication
    const basicAuthHeader = 'Basic ' + btoa(`${import.meta.env.SECRET_APPLICATION_USERNAME}:${import.meta.env.SECRET_APPLICATION_PASSWORD}`);

    await fetch(`${import.meta.env.PUBLIC_CMS}wp-json/contact-form-7/v1/contact-forms/${import.meta.env.SECRET_SITE_VISIT_FORM_ID}/feedback`, {
      method: 'POST',
      headers: {
        'Authorization': basicAuthHeader
      },
      body: formData
    })
      .then(response => response.json()) // Parse the response as JSON
      .then(data => {
        reply =  data;
      })
      .catch(err => {
        error =  err;
      });

    return new Response(JSON.stringify({
      response: reply,
      message: "Attempted to send message",
      error: error
    }), {
      status: 200
    })
  }

  return new Response(null, { status: 400 });
}*/
