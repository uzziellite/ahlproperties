<script>
	import {onMount} from "svelte"
	import axios from "axios"
	import Swal from "sweetalert"
	
	//Details form
	let name
	let phone
	let email
	let plot
	//let id
	//let address
	let user
	let onHold = false
	const prev = localStorage.getItem('prev')
	let message

	//Save the data locally for use later
	const saveDetails = async () => {
		localStorage.removeItem('user')
		
		user = {
			name: name,
			phone: phone,
			email: email,
			//id: id,
			//address: address
		}

		const user_string = await JSON.stringify(user)

		localStorage.setItem('user',user_string)

		sendEmail()
	}

	// If the user had filled the data previously
	const populateForm = () => {
		if(localStorage.getItem('user')){
			user = JSON.parse(localStorage.getItem('user'))
			name = user.name
			phone = user.phone
			email = user.email
			//id = user.id
			//address = user.address
		}

		if(localStorage.getItem('land')){
			const type = JSON.parse(localStorage.getItem('land'))
			if (type.status == 'On hold') {
				onHold = true
			}

			plot = type.plot
		}
	}

	const sendEmail = () => {
		axios.post('/detailsmail',{
			name,
			phone,
			email,
			plot
		}).then(() => {
			window.location.href = '/purchase/ipf'
		}).catch((error) => {
			console.log(error)
			Swal({
			  title: "Error",
			  text: `Unable to save details to the server at the moment. Your data is saved locally. Please try again`,
			  icon: "error"
			})
		})
	}

	//Populate form when component is mounted
	onMount(() => {
		populateForm()
	})
</script>

<form class="flex flex-col py-6 space-y-6 md:py-0 p-4 md:px-6 bg-white bg-opacity-60 shadow-lg rounded-lg mt-12" on:submit|preventDefault={() => saveDetails()}>
  <p class="bg-blue-800 p-4 -mt-4 sm:-mt-3 text-white text-xl font-bold rounded-md uppercase font-extrabold text-center">
    Customer Details
  </p>
  {#if onHold}
	  <p class="text-red-600">Property is on hold. We will notify you after 12 hours if the property is taken or still available. Please fill your details in the form below</p>
	 {/if}
  <label class="block">
    <span class="mb-1">Full name</span>
    <input type="text" placeholder="Leroy Jenkins" class="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:value={name} required>
  </label>
  <label class="block">
    <span class="mb-1">Phone Number</span>
    <input type="text" placeholder="0712345678" class="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:value={phone} required>
  </label>
  <label class="block">
    <span class="mb-1">Email address</span>
    <input type="email" placeholder="leroy@jenkins.com" class="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:value={email} required>
  </label>
  <!--<label class="block">
    <span class="mb-1">Identification Number</span>
    <input type="text" placeholder="12345678" class="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:value={id} required>
  </label>
  <label class="block">
    <span class="mb-1">Address</span>
    <input type="text" placeholder="123 ABC Place, Chriromo Lane, Riverside Nairobi" class="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:value={address} required>
  </label>-->
  {#if typeof message === 'undefined'}
	  <div class="my-4">
	    <button type="submit" class="px-8 py-3 w-32 my-6 text-lg rounded focus:ring hover:ring focus:ring-opacity-75 focus:ring-indigo-400 hover:ring-indigo-400 bg-blue-800 text-white">Submit</button>
	  </div>
	 {:else}
	 	<p class="text-green-600 text-lg">
	 		{message}
	 	</p>
	 {/if}
  {#if onHold && typeof message !== 'undefined'}
	  <a class="group flex items-center justify-between rounded-lg border border-current px-5 py-3 text-indigo-600 transition-colors hover:bg-indigo-600 focus:outline-none focus:ring active:bg-indigo-500" href={prev}>
		  <span class="font-medium transition-colors group-hover:text-white">
		    Back to plot selection
		  </span>

		  <span class="ml-4 flex-shrink-0 rounded-full border border-indigo-600 bg-white p-2 group-active:border-indigo-500">
		    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
		  </span>
		</a>
	{/if}
</form>
