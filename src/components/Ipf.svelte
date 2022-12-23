<script>
	//Initial payment form
	let dp = 'KSH 50,000'
	let pp = 'Cash: KSH 550,000'
	let post


	const paymentDetails = () => {
		localStorage.removeItem('ipf')

		const ipf = {
			downpayment: dp,
			paymentplan: pp
		}

		const ipf_data = JSON.stringify(ipf)

		localStorage.setItem('ipf',ipf_data)

		window.location.href = '/purchase/saf'
	}

	const loadPaymentDetails = async () => {
		const res = await fetch(`${import.meta.env.PUBLIC_CMS}wp-json/wp/v2/posts?slug=payment-account-numbers`)
		post = await res.json()
	}

	loadPaymentDetails()
</script>

<form class="flex flex-col py-6 space-y-6 md:py-0 p-4 md:px-6 bg-white bg-opacity-60 shadow-lg rounded-lg mt-12" on:submit|preventDefault={() => paymentDetails()}>
  <span class="bg-blue-800 p-4 -mt-4 sm:-mt-3 text-white text-xl font-bold rounded-md uppercase font-extrabold">
    Payments
  </span>
  <label class="block">
    <span class="mb-1 text-xl font-bold">How much would you like to pay as downpayment</span>
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
    <span class="mb-1 text-xl font-bold">What is your preferred payment plan</span>
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
  {#if post}
	  <div class="mt-4 prose">
	  	{@html post[0].content.rendered}
	  </div>
	{/if}
	<div class="my-4">
    <button type="submit" class="px-8 py-3 w-32 my-6 text-lg rounded focus:ring hover:ring focus:ring-opacity-75 focus:ring-indigo-400 hover:ring-indigo-400 bg-blue-800 text-white">Submit</button>
  </div>
</form>
