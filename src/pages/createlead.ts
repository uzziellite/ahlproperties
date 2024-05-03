// import { APIRoute } from "astro/dist/@types/astro";

// export const POST: APIRoute = async ({ request }) => {
//   if (request.headers.get("Content-Type") === "application/json") {
    
//     let reply;
//     let error;
//     const body = await request.json();
//     const id = body.id;
//     const name = body.name;
//     const email = body.email;
//     const phone = body.phone;
//     const plot = body.plot;
//     const downpayment = body.downpayment;
//     const address = body.address;
//     const id_number = body.id_number;
//     const subject = `Interested in Purchasing plot number ${plot}`;
//     const message = `I need this property. Please get back to me with more information`;

//     //Message Data to be sent as form data
//     //for compatibility with contact form 7
//     const formData = new FormData();
//     formData.append('your-name',name);
//     formData.append('your-email',email);
//     formData.append('phone',phone);
//     formData.append('plot',plot);
//     formData.append('downpayment',downpayment);
//     formData.append('your-subject',subject);
//     formData.append('your-message',message);
//     formData.append('id_number',id_number);
//     formData.append('address',address);

//     //Prepare basic Authentication
//     const basicAuthHeader = 'Basic ' + btoa(`${import.meta.env.SECRET_APPLICATION_USERNAME}:${import.meta.env.SECRET_APPLICATION_PASSWORD}`);


//     /**
//      * This saves the data to incoming messages on wordpress dashboard
//      */
//     await fetch(`${import.meta.env.PUBLIC_CMS}wp-json/contact-form-7/v1/contact-forms/${import.meta.env.SECRET_LAND_PURCHASE_FORM}/feedback`, {
//       method: 'POST',
//       headers: {
//         'Authorization': basicAuthHeader
//       },
//       body: formData
//     })
//       .then(response => response.json()) // Parse the response as JSON
//       .then(data => {
//         reply =  data;
//       })
//       .catch(err => {
//         error =  err;
//       });

//       /**
//        * Update the map status to On hold
//        */

//       const payload = {
//         "acf":{
//           "status":"On hold"
//         }
//       }

//       await fetch(`${import.meta.env.PUBLIC_CMS}wp-json/wp/v2/posts/${id}`, {
//       method: 'POST',
//       headers: {
//         'Authorization': basicAuthHeader,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(payload)
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Updated map!');
//       })
//       .catch(err => {
//         console.log('Unable to update map!');
//       });

//     return new Response(JSON.stringify({
//       response: reply,
//       message: "Attempted to save data.",
//       error: error
//     }), {
//       status: 200
//     })
//   }

//   return new Response(null, { status: 400 });
// }
