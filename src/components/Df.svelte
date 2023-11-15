<script>
	import {onMount} from "svelte"
	import axios from "axios"
	import Swal from "sweetalert"
	
	//Details form
	let name
	let phone
	let email
	let plot
	let sending = false
	let user
	const prev = localStorage.getItem('prev')
	let message

	//Save the data locally for use later
	const saveDetails = async () => {
		localStorage.removeItem('user')
		
		user = {
			name: name,
			phone: phone,
			email: email
		}

		const user_string = await JSON.stringify(user)

		localStorage.setItem('user',user_string)

		window.location.href  = "/purchase/ipf";

		/**
		 * There is no need to send this data over the network for now
		 * This is the reason why I am removing this function
		 * For now, save all the user data locally and only send it to the 
		 * Server if the user has completed the whole form. This will help to 
		 * differentiate those who are serious and those who are just sniffing around
		 */
		//sendEmail()
	}

	// If the user had filled the data previously
	const populateForm = () => {
		if(localStorage.getItem('user')){
			user = JSON.parse(localStorage.getItem('user'))
			name = user.name
			phone = user.phone
			email = user.email
		}

		if(localStorage.getItem('land')){
			const type = JSON.parse(localStorage.getItem('land'))
			if (type.status == 'On hold') {
				onHold = true
			}

			plot = type.plot
		}
	}

	/*const sendEmail = () => {
		sending = true
		axios.post('/detailsmail',{
			name,
			phone,
			email,
			plot
		}).then(() => {
			window.location.href = '/purchase/ipf'
		}).catch((error) => {
			console.log(error)
			sending = false
			Swal({
			  title: "Error",
			  text: `Unable to save details to the server at the moment. Your data is saved locally. Please try again`,
			  icon: "error"
			})
		})
	}*/

	//Populate form when component is mounted
	onMount(() => {
		populateForm()
	})
</script>

<form class="flex flex-col py-6 space-y-6 md:py-0 p-4 md:px-6 bg-white bg-opacity-60 shadow-lg rounded-lg mt-12" on:submit|preventDefault={() => saveDetails()}>
  <p class="bg-blue-800 p-4 -mt-4 sm:-mt-3 text-white text-xl font-bold rounded-md uppercase font-extrabold text-center">
    Customer Details
  </p>
  <label class="block">
    <span class="mb-1">Full name</span>
    <input type="text" placeholder="Leroy Jenkins" class="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:value={name} required name="name" autocomplete="name">
  </label>
  <label class="block">
    <span class="mb-1">Phone Number</span>
    <input type="text" placeholder="0712345678" class="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:value={phone} required name="phone" autocomplete="phone">
  </label>
  <label class="block">
    <span class="mb-1">Email address</span>
    <input type="email" placeholder="leroy@jenkins.com" class="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:value={email} required name="email" autocomplete="email">
  </label>
  {#if sending}
	  <div class="my-4">
	    <button type="submit" class="px-8 py-3 w-42 my-6 text-lg rounded focus:ring hover:ring focus:ring-opacity-75 focus:ring-indigo-400 hover:ring-indigo-400 bg-blue-800 text-white">Please wait ...</button>
	  </div>
	{:else}
	 	<div class="my-4">
	    <button type="submit" class="px-8 py-3 w-32 my-6 text-lg rounded focus:ring hover:ring focus:ring-opacity-75 focus:ring-indigo-400 hover:ring-indigo-400 bg-blue-800 text-white">Submit</button>
	    <a href="/purchase/map?property=marafiki-homes" class="px-8 py-3 w-32 my-6 text-lg rounded focus:ring hover:ring focus:ring-opacity-75 focus:ring-indigo-400 hover:ring-indigo-400 bg-orange-600 text-white">
	    	Back
	    </a>
	  </div>
	  <div class="my-4">
	  </div>
	{/if}
</form>
