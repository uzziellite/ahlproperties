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
        text:"You have successfully submitted your information. Our sales agent will be in touch with you shortly. A copy of your sales agreement will be shown to you shortly",
        icon:"success"
      }).then(() => {
        
        downloadAgreement();
      })
    }).catch(err => {
      console.error( `An error occured: ${err}`)

      // An error has occured but still proceed. Vercel might just have timed out the request
      Swal({
        title:"Completed",
        text:"You have successfully submitted your information. Our sales agent will be in touch with you shortly. A copy of your sales agreement will be shown to you shortly",
        icon:"success"
      }).then(() => {
        downloadAgreement();
      })

      submitting = false;
    })
  }

  /**
   * Show sales agreement data already captured as a pdf file then download it.
   */
  const downloadAgreement = async () => {
    // Redirect the user back to the main homepage
    Swal({
      title:"Sales Agreement Copy Generated",
      text:"Thank you for doing business with us. Take a look at the sales agreement copy",
      icon:"success"
    }).then(() => {
      window.open('/purchase/agreement','_blank');
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