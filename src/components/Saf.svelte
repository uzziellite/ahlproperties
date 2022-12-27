<script>
	//Sales agreement form
	import {onMount} from "svelte"
	import axios from "axios"

	let name
	let phone
	let address
	let email
	let id
	let country
	let county
	let town
	let property
	let dp
	let pp
	let depositdate
	let monthlyPayment
	let duedate
	let salesManager
	let nextkin
	let nokrltshp
	let nokphone
	let nokid
	let salesfunnel
	let agree
	let terms
	let loading

	const loadTermsAndConditions = async () => {
		const res = await fetch(`${import.meta.env.PUBLIC_CMS}wp-json/wp/v2/posts?slug=property-purchase-terms-and-conditions`)
		terms = await res.json()
	}

	//Send data to the server for further processing
	const submitSaf = () => {
		loading = true
		axios.post(`/saf`,{
			name,
			phone,
			address,
			email,
			id,
			country,
			county,
			town,
			property,
			dp,
			pp,
			depositdate,
			monthlyPayment,
			duedate,
			salesManager,
			nextkin,
			nokrltshp,
			nokphone,
			nokid,
			salesfunnel,
			agree
		}).then(() => {
			window.location.href = '/purchase/finalize'
		}).catch((error) => {
			console.error(error)
			loading = false
		})
	}

	const loadUserData = () => {
		if (localStorage.getItem('user')) {
			const user = JSON.parse(localStorage.getItem('user'))
			name = user.name
			email = user.email
			phone = user.phone
			address = user.address
			id = user.id
		}

		if (localStorage.getItem('ipf')) {
			const ipf = JSON.parse(localStorage.getItem('ipf'))
			dp = ipf.downpayment
			pp = ipf.paymentplan
		}

		if(localStorage.getItem('land')){
			property = JSON.parse(localStorage.getItem('land')).plot
		}
	}

	onMount(() => {
		loadUserData()
		loadTermsAndConditions()
	})
</script>

<form class="flex flex-col py-6 space-y-6 md:py-0 p-4 md:px-6 bg-white bg-opacity-60 shadow-lg rounded-lg mt-12" on:submit|preventDefault={() => submitSaf()}>
  <p class="bg-blue-800 p-4 -mt-4 sm:-mt-3 text-white text-xl font-bold rounded-md uppercase font-extrabold text-center">
    Sales Agreement Form
  </p>
  <div class="grid gap-4 p-2">
	  <label class="block">
	    <span class="mb-1">Full name as per your ID Card</span>
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
	  <label class="block">
	    <span class="mb-1">Identification Number</span>
	    <input type="text" placeholder="12345678" class="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:value={id} required>
	  </label>
	  <label class="block">
	    <span class="mb-1">Postal Address</span>
	    <input type="text" placeholder="123 ABC Place, Chriromo Lane, Riverside Nairobi" class="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:value={address} required>
	  </label>
	  <label class="block">
	    <span class="mb-1">Country of residence</span>
	    <input type="text" placeholder="Kenya" class="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:value={country} required>
	  </label>
	  <label class="block">
	    <span class="mb-1">State / County</span>
	    <input type="text" placeholder="Nairobi" class="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:value={county} required>
	  </label>
	  <label class="block">
	    <span class="mb-1">Your Town</span>
	    <input type="text" placeholder="Nairobi - Westlands" class="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:value={town} required>
	  </label>
	  <label class="block">
	    <span class="mb-1">Plot Selected</span>
	    <input type="text" placeholder="Marafiki Residence" class="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:value={property} required>
	  </label>
	  <label class="block">
	    <span class="mb-1">Chosen down payment</span>
	    <div class="block">
		    <input type="radio" class="shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:group={dp} required value="KSH 50,000"> Ksh 50, 000
	    </div>
	    <div class="block">
		    <input type="radio" class="shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:group={dp} required value="KSH 100,000"> Ksh 100, 000
	    </div>
	    <div class="block">
		    <input type="radio" class="shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:group={dp} required value="Other"> Other amount (Not less than 50,000)
	    </div>
	  </label>
	  <label class="block">
	    <span class="mb-1">Preferred payment plan</span>
	    <div class="block">
		    <input type="radio" class="shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:group={pp} required value="Cash: KSH 550,000"> Cash: Ksh 550,000
	    </div>
	    <div class="block">
		    <input type="radio" class="shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:group={pp} required value="3 months installment: KSH 585,000"> 3 Months Installment: Ksh 585,000
	    </div>
	    <div class="block mt-2">
		    <input type="radio" class="shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:group={pp} required value="6 Months Installment: KSH 595,000"> 6 Months Installment: Ksh 595,000
	    </div>
	    <div class="block mt-2">
		    <input type="radio" class="shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:group={pp} required value="9 Months Installment: KSH 615,000"> 9 Months Installment: Ksh 615,000
	    </div>
	    <div class="block mt-2">
		    <input type="radio" class="shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:group={pp} required value="12 Months Installment: KSH 635,000"> 12 Months Installment: Ksh 635,000
	    </div>
	  </label>
	  <label class="block">
	    <span class="mb-1">When did you make your initial deposit</span>
	    <input type="date" class="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:value={depositdate} required>
	  </label>
	  <label class="block">
	    <span class="mb-1">For installment plan, indicate the amount you are willing to pay every month</span>
	    <input type="number" placeholder="150,000" class="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:value={monthlyPayment} required={pp === 'Cash: KSH 550,000' ? false : true}>
	  </label>
	  <label class="block">
	    <span class="mb-1">Due Date</span>
	    <input type="date" class="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:value={duedate} required>
	  </label>
	  <label class="block">
	    <span class="mb-1">Name of sales manager</span>
	    <select class="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:value={salesManager} required>
	    	<option disabled selected>-- Select Option --</option>
	    	<option>Dennis Mwangi</option>
	    	<option>Gloria Chepkemoi</option>
	    </select>
	  </label>
	  <label class="block">
	    <span class="mb-1">Next of Kin Name as per their ID</span>
	    <input type="text" placeholder="Wanjohi Kimani Samuel" class="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:value={nextkin} required>
	  </label>
	  <label class="block">
	    <span class="mb-1">Next of Kin Relationship</span>
	    <select class="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:value={nokrltshp} required>
	    	<option selected disabled>-- Select Option --</option>
	    	<option>Father</option>
	    	<option>Mother</option>
	    	<option>Brother</option>
	    	<option>Sister</option>
	    	<option>Spouse</option>
	    	<option>Child</option>
	    	<option>Relative</option>
	    </select>
	  </label>
	  <label class="block">
	    <span class="mb-1">Next of Kin ID Number</span>
	    <input type="text" placeholder="12345678" class="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:value={nokid} required>
	  </label>
	  <label class="block">
	    <span class="mb-1">Next of Kin Phone Number</span>
	    <input type="text" placeholder="+254712345678" class="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:value={nokphone} required>
	  </label>
	  <label class="block">
	    <span class="mb-1">How did you know about us</span>
	    <select class="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:value={salesfunnel} required>
	    	<option selected disabled>-- Select Option --</option>
	    	<option>Referral</option>
	    	<option>Website</option>
	    	<option>LinkedIn</option>
	    	<option>Twitter</option>
	    	<option>Facebook</option>
	    	<option>Instagram</option>
	    	<option>Tiktok</option>
	    	<option>Youtube</option>
	    	<option>Print Media</option>
	    	<option>Television</option>
	    	<option>Radio</option>
	    </select>
	  </label>
	  {#if typeof terms != 'undefined'}
		  <div class="prose">
		  	{@html terms[0].content.rendered}
		  </div>
	  {/if}
	  <label class="block">
	    <span class="mb-1">Agree to the terms and conditions</span>
	    <div class="block">
		    <input type="radio" class="shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:group={agree} required value={true}> I Agree
	    </div>
	  </label>
  </div>
  <div class="my-4">
    <button type="submit" class="px-8 py-3 w-32 my-6 text-lg rounded focus:ring hover:ring focus:ring-opacity-75 focus:ring-indigo-400 hover:ring-indigo-400 bg-blue-800 text-white">Submit</button>
  </div>
</form>
