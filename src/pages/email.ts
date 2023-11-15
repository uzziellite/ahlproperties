export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    
    let reply;
    let error;
    const body = await request.json();
    const name = body.name;
    const email = body.email;
    const subject = body.subject;
    const message = body.message;

    //Message Data to be sent as form data
    //for compatibility with contact form 7
    const formData = new FormData();
    formData.append('your-name',name);
    formData.append('your-email',email);
    formData.append('your-subject',subject);
    formData.append('your-message',message);

    //Prepare basic Authentication
    const basicAuthHeader = 'Basic ' + btoa(`${import.meta.env.SECRET_APPLICATION_USERNAME}:${import.meta.env.SECRET_APPLICATION_PASSWORD}`);

    await fetch(`${import.meta.env.PUBLIC_CMS}wp-json/contact-form-7/v1/contact-forms/${import.meta.env.SECRET_CONTACT_FORM_ID}/feedback`, {
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
}
