<script>
	// This is the data for the initial payment form

	import Swal from "sweetalert"
	let dp = '50000'
	let ndp
	let pp
	let custom


	const paymentDetails = () => {

		if (typeof pp != 'undefined') {
			localStorage.removeItem('ipf')
			let ipf

			if(dp === 'Other'){
				ipf = {
					downpayment: ndp,
					paymentplan: pp
				}
			}else{
				ipf = {
					downpayment: dp,
					paymentplan: pp
				}
			}

			const ipf_data = JSON.stringify(ipf)

			localStorage.setItem('ipf',ipf_data)

			Swal({
				title:"Congratulations",
				text:"You have successfully set your desired payment methods",
				icon:"success"
			}).then(() => {
				window.location.href = '/purchase/holding'
			})
		}else{
			Swal({
				title:"Incomplete",
				text:"Please complete filling the payment details before submitting the form",
				icon:"warning"
			})
		}
	}

	//Watch for ndp variable
	$:{
		if (typeof custom != 'undefined') {
			pp = undefined
			ndp = custom
		}
	}

	// Reset the variables once there is a new data set to fix the bug where price 
	// is not updating appropriately
	$:{
		if (dp !== 'Other') {
			ndp = undefined
			custom = undefined
			pp = undefined
		}else{
			pp = undefined
		}
	}
</script>

<form class="flex flex-col py-6 space-y-6 md:py-0 p-4 md:px-6 bg-white bg-opacity-60 shadow-lg rounded-lg mt-12" on:submit|preventDefault={() => paymentDetails()}>
  <span class="bg-blue-800 p-4 -mt-4 sm:-mt-3 text-white text-xl font-bold rounded-md uppercase font-extrabold">
    Payments
  </span>
  <label class="block">
    <span class="mb-1 text-xl font-bold">How much would you like to pay as downpayment</span>
    <div class="block">
	    <input type="radio" class="shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:group={dp} required value="50000"> Ksh 50, 000
    </div>
    <div class="block">
	    <input type="radio" class="shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:group={dp} required value="100000"> Ksh 100, 000
    </div>
    <div class="block">
	    <input type="radio" class="shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:group={dp} required value="Other"> Other amount (Not less than 50,000)
    </div>
  </label>
  {#if dp == 'Other'}
    <div class="grid">
    	Enter custom amount
    	<input type="number" bind:value={custom} class="p-2 sm:max-w-md" min="50000" max="550000" required>
    </div>
   {/if}
  <label class="block">
    <span class="mb-1 text-xl font-bold">What is your preferred payment plan</span>
    <div class="block">
    	{#if ndp}
    		<input type="radio" class="shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:group={pp} required value={`${550000 - ndp} C`}> Cash: Ksh {(550000 - ndp).toLocaleString(undefined,{ minimumFractionDigits: 0 })}
    	{:else}
		    <input type="radio" class="shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:group={pp} required value={`${550000 - dp} C`}> Cash: Ksh {(550000 - dp).toLocaleString(undefined,{ minimumFractionDigits: 0 })}
    	{/if}
    </div>
    <div class="block">
    	{#if ndp}
    		<input type="radio" class="shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:group={pp} required value={`${565000 - ndp} 3M`}> 3 Months Installment of Ksh {Math.ceil((565000 - ndp) / 3).toLocaleString(undefined,{ minimumFractionDigits: 0 })}  Total Ksh: {(565000 - ndp).toLocaleString(undefined,{ minimumFractionDigits: 0 })}
    	{:else}
		    <input type="radio" class="shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:group={pp} required value={`${565000 - dp} 3M`}> 3 Months Installment of Ksh {Math.ceil((565000 - dp) / 3).toLocaleString(undefined,{ minimumFractionDigits: 0 })}  Total Ksh: {(565000 - dp).toLocaleString(undefined,{ minimumFractionDigits: 0 })}
    	{/if}
    </div>
    <div class="block mt-2">
			{#if ndp}
    		<input type="radio" class="shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:group={pp} required value={`${580000 - ndp} 6M`}> 6 Months Installment of Ksh {Math.ceil((580000 - ndp) / 6).toLocaleString(undefined,{ minimumFractionDigits: 0 })}  Total Ksh: {(580000 - ndp).toLocaleString(undefined,{ minimumFractionDigits: 0 })}
    	{:else}
		    <input type="radio" class="shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:group={pp} required value={`${580000 - dp} 6M`}> 6 Months Installment of Ksh {Math.ceil((580000 - dp) / 6).toLocaleString(undefined,{ minimumFractionDigits: 0 })}  Total Ksh: {(580000 - dp).toLocaleString(undefined,{ minimumFractionDigits: 0 })}
    	{/if}
    </div>
    <div class="block mt-2">
    	{#if ndp}
    		<input type="radio" class="shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:group={pp} required value={`${595000 - ndp} 9M`}> 9 Months Installment of Ksh {Math.ceil((595000 - ndp) / 9).toLocaleString(undefined,{ minimumFractionDigits: 0 })}  Total Ksh: {(595000 - ndp).toLocaleString(undefined,{ minimumFractionDigits: 0 })}
    	{:else}
		    <input type="radio" class="shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:group={pp} required value={`${595000 - dp} 9M`}> 9 Months Installment of Ksh {Math.ceil((595000 - dp) / 9).toLocaleString(undefined,{ minimumFractionDigits: 0 })}  Total Ksh: {(595000 - dp).toLocaleString(undefined,{ minimumFractionDigits: 0 })}
    	{/if}
    </div>
    <div class="block mt-2">
    	{#if ndp}
    		<input type="radio" class="shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:group={pp} required value={`${610000 - ndp} 12M`}> 12 Months Installment of Ksh {Math.ceil((610000 - ndp) / 12).toLocaleString(undefined,{ minimumFractionDigits: 0 })}  Total Ksh: {(610000 - ndp).toLocaleString(undefined,{ minimumFractionDigits: 0 })}
    	{:else}
		    <input type="radio" class="shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:group={pp} required value={`${610000 - dp} 12M`}> 12 Months Installment of Ksh {Math.ceil((610000 - dp) / 12).toLocaleString(undefined,{ minimumFractionDigits: 0 })}  Total KSh: {(610000 - dp).toLocaleString(undefined,{ minimumFractionDigits: 0 })}
    	{/if}
    </div>
  </label>
	<div class="my-4">
    <button type="submit" class="px-8 py-3 w-32 my-6 text-lg rounded focus:ring hover:ring focus:ring-opacity-75 focus:ring-indigo-400 hover:ring-indigo-400 bg-blue-800 text-white">Submit</button>
  </div>
</form>
