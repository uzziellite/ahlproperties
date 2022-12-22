<script>
	import axios from "axios"
	let name
	let email
	let subject
	let message
	let loading
	let error
	let report

	const sendMessage = () => {
		loading = true
		axios.post(`/email`,{
			name,
			email,
			subject,
			message
		}).then(() => {
			loading = false
			report = "Message sent successfully"
		}).catch(err => {
			loading = false
			error = "An error occured. Unable to send message at the moment. Please try again later"
			console.error(err)
		})
	}
</script>
<form class="flex flex-col py-6 p-4 space-y-6 md:py-0 md:px-6 bg-white shadow-lg rounded-lg mt-12" on:submit|preventDefault={() => sendMessage()}>
	<button class="bg-blue-800 p-4 -mt-4 sm:-mt-3 text-white text-xl font-bold rounded-md uppercase font-extrabold">
		Contact Us
	</button>
	<label class="block">
		<span class="mb-1">Full name</span>
		<input type="text" placeholder="Leroy Jenkins" class="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:value={name}>
	</label>
	<label class="block">
		<span class="mb-1">Email address</span>
		<input type="email" placeholder="leroy@jenkins.com" class="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:value={email}>
	</label>
	<label class="block">
		<span class="mb-1">Subject</span>
		<input type="text" placeholder="Subject" class="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:value={subject}>
	</label>
	<label class="block">
		<span class="mb-1">Message</span>
		<textarea rows="3" class="block w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:value={message}></textarea>
	</label>
	{#if !report}
		{#if loading}
			<div class="my-4">
				<button type="submit" class="px-8 py-3 w-32 my-6 text-lg rounded focus:ring hover:ring focus:ring-opacity-75 focus:ring-indigo-400 hover:ring-indigo-400 bg-blue-800 text-white">Sending message <span class="animate-ping">...</span></button>
			</div>
		{:else}
			<div class="my-4">
				<button type="submit" class="px-8 py-3 w-32 my-6 text-lg rounded focus:ring hover:ring focus:ring-opacity-75 focus:ring-indigo-400 hover:ring-indigo-400 bg-blue-800 text-white">Submit</button>
			</div>
		{/if}
	{/if}
	{#if error}
		<span class="text-red-600">
			{error}
		</span>
	{/if}
	{#if report}
		<span class="text-green-600">
			{report}
		</span>
	{/if}
</form>
