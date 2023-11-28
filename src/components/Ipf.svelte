<script>
	import Swal from "sweetalert"
	
	let dp = '200000' // Downpayment

	const paymentDetails = () => {

		if (typeof dp != 'undefined') {
			localStorage.removeItem('ipf')

			let ipf;
			
			if(dp == '200000') {
				ipf = {
					downpayment: `Ksh 200,000 downpayment with 6 monthly installments of KSH 65,833`
				}
			}else if (dp == '250000') {
				ipf = {
					downpayment: `Ksh 250,000 downpayment with 12 monthly installments of KSH 33,333`
				}
			}else{
				ipf = {
					downpayment: `Ksh 550,000 paid full in Cash`
				}
			}

			const ipf_data = JSON.stringify(ipf)

			localStorage.setItem('ipf',ipf_data)

			Swal({
				title:"Congratulations",
				text:"You have successfully set your desired payment methods. Verify that the information is correct in the next step",
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

</script>

<form class="flex flex-col py-6 space-y-6 md:py-0 p-4 md:px-6 bg-white bg-opacity-60 shadow-lg rounded-lg mt-12" on:submit|preventDefault={() => paymentDetails()}>
  <span class="bg-blue-800 p-4 -mt-4 sm:-mt-3 text-white text-xl font-bold rounded-md uppercase font-extrabold">
    Payments
  </span>
  <label class="block">
    <span class="mb-1 text-xl font-bold">How much would you like to pay?</span>
    <div class="block">
	    <input type="radio" class="shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:group={dp} required value="200000"> Ksh 200, 000 downpayment with 6 monthly installments of KSH 65,833
    </div>
    <div class="block">
	    <input type="radio" class="shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:group={dp} required value="250000"> Ksh 250, 000 downpayment with 12 monthly installments of KSH 33,333
    </div>
    <div class="block">
	    <input type="radio" class="shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:group={dp} required value="550000"> Ksh 550, 000 Cash
    </div>
  </label>
	<div class="my-4">
    <button type="submit" class="px-8 py-2 w-32 my-6 text-lg rounded focus:ring hover:ring focus:ring-opacity-75 focus:ring-indigo-400 hover:ring-indigo-400 bg-blue-800 text-white">Submit</button>
    <a href="/purchase/details" class="px-8 py-3 w-32 my-6 text-lg rounded focus:ring hover:ring focus:ring-opacity-75 focus:ring-indigo-400 hover:ring-indigo-400 bg-orange-600 text-white">
      Back
    </a>
  </div>
</form>
