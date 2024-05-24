<script>
  import axios from "axios"
  
  let name
  let phone
  let email
  let loading = false
  let report
  let error

  const book = () => {
    loading = true
    axios.post(`/book`,{
      name,
      phone,
      email
    }).then((resp) => {
      loading = false
      report = 'Booking was successful. We will contact you shortly'
    }).catch((error) =>{
      loading = false
      error = 'An error occurred. Please try booking again'
      console.error(error)
    })
  }
</script>

<section id="cta" class="overflow-hidden bg-[url(/images/airplane.jpg)] bg-center bg-cover">
  <div class="grid sm:grid-cols-2 gap-2 mb-4 place-content-center">
    <div class="bg-black/25 p-8 md:p-12 lg:px-16 lg:py-16">
      <div class="max-w-lg text-center sm:text-left">
        <h2 class="text-2xl text-yellow-600 sm:text-3xl md:text-5xl font-serif uppercase transition hover:scale-90">
          Book a free site visit
        </h2>

        <p class="hidden max-w-md text-white md:mt-6 md:block md:text-2xl md:leading-relaxed bg-white bg-opacity-20 p-12 transition hover:scale-90">
          We offer a free site visit to potential buyers so that you can get to view your preferred property.
        </p>
      </div>
    </div>
    <div class="sm:pl-16 p-4 sm:p-0">
      <form class="flex flex-col px-4 sm:px-0 py-6 space-y-6 md:py-0 md:px-6 bg-black sm:bg-white bg-opacity-60 shadow-lg rounded-lg mt-12 sm:max-w-md transition hover:scale-90" on:submit|preventDefault={() => book()}>
        <span class="bg-blue-800 p-4 -mt-4 sm:-mt-3 text-white text-xl font-bold rounded-md uppercase font-extrabold">
          Book Site Visit
        </span>
        <label class="block">
          <span class="mb-1 text-white sm:text-black">Full name</span>
          <input type="text" placeholder="Amani James" class="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:value={name} required name="name" autocomplete="name">
        </label>
        <label class="block">
          <span class="mb-1 text-white sm:text-black">Phone Number</span>
          <input type="text" placeholder="0712345678" class="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:value={phone} required name="phone" autocomplete="phone">
        </label>
        <label class="block">
          <span class="mb-1 text-white sm:text-black">Email address</span>
          <input type="email" placeholder="amanijames@gmail.com" class="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-indigo-400" bind:value={email} required name="email" autocomplete="email">
        </label>
        {#if !report}
          {#if loading}
            <div class="my-4">
              <button type="submit" class="px-8 py-3 w-full my-6 text-lg rounded focus:ring hover:ring focus:ring-opacity-75 focus:ring-indigo-400 hover:ring-indigo-400 bg-blue-800 text-white">Sending message <span class="animate-ping">...</span></button>
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
    </div>
  </div>
</section>
