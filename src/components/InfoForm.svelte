<script>
  import {onMount} from "svelte";
  import axios from "axios";
  import Swal from "sweetalert"

  /**
   * Verify that user information is still intact in localStorage
   * Otherwise, let the user restart the entire process on their own
   * since something has happened and for some reason localStorage has
   * been cleared. There could also be a scenario where the user just navigated
   * directly to this final page
   */

	let name;
  let email;
  let phone;
  let plot;
  let downpayment;
  let error = false;
  let submitting = false;

  /**
   * To avoid running into problems, make sure that this code is running 
   * on the browser and not the server
   */

  const loadData = async() => {
    if(localStorage.getItem("user") && localStorage.getItem("land") && localStorage.getItem("ipf")){
      const user = await JSON.parse(localStorage.getItem("user"));
      const land = await JSON.parse(localStorage.getItem("land"));
      const ipf = await JSON.parse(localStorage.getItem("ipf"));
      
      name = user.name;
      email = user.email;
      phone = user.phone;
      plot = land.plot;
      downpayment = ipf.downpayment;
    }else{
      error = true;
    }
  }

  /**
   * Send this data to the server to be stored on the customers form
   * It is the responsibility of the sales team to keep checking this
   * database to serve customers
   */
  const saveData = () => {
    submitting = true;
    axios({
      method:"post",
      url:"/createlead",
      data:{
        name:name,
        email:email,
        phone:phone,
        plot:plot,
        downpayment:downpayment
      }
    }).then(() => {
      submitting = false;
      Swal({
        title:"Completed",
        text:"You have successfully submitted your information. Our sales agent will be in touch with you within 24 - 48 hours. Download a copy of your sales agreement",
        icon:"success"
      }).then(() => {
        //window.location.href = '/'
        downloadAgreement();
      })
    }).catch(err => {
      console.error( `An error occured: ${err}`)
      Swal({
        title:"Network Error",
        text:"Unable to save data to the server at the moment. Please refresh this page and try again",
        icon:"error"
      })

      submitting = false;
    })
  }

  /**
   * Show sales agreement data already captured as a pdf file then download it.
   */
  const downloadAgreement = async () => {
    Swal("Generating sales agreement copy. Please wait...");

    //Begin Generating the PDF file of the sales agreement for download.
    const opt = {
      margin:       1,
      filename:     'Sales Agreement.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Print the pdf file
    await html2pdf().set(opt).from(document.querySelector("#agreement")).save();

    // Redirect the user back to the main homepage
    Swal({
      title:"Download Completed",
      text:"Thank you for doing business with us. Our sales agent will contact you shortly with further details",
      icon:"success"
    }).then(() => {
      window.location.href = '/'
    })
  }

  onMount(() => {
    loadData();
  });
</script>

<div class="bg-white p-8 rounded-md shadow-md">
  {#if error}
    <p class="text-red-600 my-4 text-lg">
      An error occured. Browser storage was cleared. Please re-enter your information.
    </p>

    <a href="/purchase/map?property=marafiki-homes" class="text-green-600 text-lg my-2">
      Select Property
    </a>
  {:else}
    <h2 class="text-2xl font-semibold mb-1">Purchase Confirmation</h2>
    <p class="text-gray-800 text-base mb-6">
      Please verify that the information captured on this form is correct
    </p>

    <!-- Individual Information -->
    <div class="mb-4">
        <label class="block text-gray-600 text-sm font-semibold mb-2">Name:</label>
        <p class="text-gray-800">
          {name}
        </p>
    </div>

    <div class="mb-4">
        <label class="block text-gray-600 text-sm font-semibold mb-2">Email:</label>
        <p class="text-gray-800">
          {email}
        </p>
    </div>

    <div class="mb-4">
        <label class="block text-gray-600 text-sm font-semibold mb-2">Phone:</label>
        <p class="text-gray-800">
          {phone}
        </p>
    </div>

    <div class="mb-4">
        <label class="block text-gray-600 text-sm font-semibold mb-2">Plot Number:</label>
        <p class="text-gray-800">
          {plot}
        </p>
    </div>

    <!-- Payment Information -->
    <div class="mb-4">
        <label class="block text-gray-600 text-sm font-semibold mb-2">Payment Plan:</label>
        <p class="text-gray-800">
          {downpayment}
        </p>
    </div>

    <div class="mt-4 flex space-x-6">
      {#if submitting}
        <button class="p-2 bg-blue-800 text-white rounded-md shadow-md">
          Submitting data ...
        </button>
      {:else}
        <button on:click|preventDefault={saveData} class="p-2 bg-blue-800 text-white rounded-md shadow-md">
          Submit
        </button>
      {/if}
      <a href="/purchase/ipf" class="p-2 bg-orange-600 text-white rounded-md shadow-md">
        Back
      </a>
    </div>

  {/if}

</div>

<!-- The content to be generated for the PDF file goes here -->
<div id="agreement" hidden>
  <h2>Sales Agreement Data</h2>
  <p>
    Please find your sales agreement information here
  </p>
</div>