<script>
	import {onMount} from "svelte";

	onMount(() => {
		let observer = new IntersectionObserver(() => {
			let valueDisplays = document.querySelectorAll(".num");
			let interval = 3000;

			valueDisplays.forEach((valueDisplay) => {
			  let startValue = 0;
			  let endValue = parseInt(valueDisplay.getAttribute("data-val"));
			  let duration = Math.floor(interval / endValue);
			  let counter = setInterval(function () {
			    startValue += 1;
			    valueDisplay.textContent = startValue;
			    if (startValue == endValue) {
			      clearInterval(counter);
			    }
			  }, duration);
			});
		});

		observer.observe(document.querySelector("#milestone"));
	});

</script>

<section id="milestone" class="bg-white shadow-md container mx-auto mt-4 p-6">
	<div class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
    <div class="mx-auto max-w-3xl text-center">
      <h2 class="text-center text-4xl font-serif uppercase text-blue-800 mb-4">
        Milestones Covered
      </h2>

      <p class="mt-4 text-gray-500 sm:text-xl">
        Check out our progress over the years
      </p>
    </div>

    <div class="mt-8 sm:mt-12">
      <dl class="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div class="flex rounded-lg border border-gray-200 hover:border-yellow-600 transition hover:scale-90 px-4 text-center space-x-12">
        	<div class="text-gray-500 py-8">
	        	<svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
        	</div>
        	<div class="flex flex-col py-8">
	          <dt class="order-last text-lg font-medium text-gray-500">
	            Projects
	          </dt>

	          <dd class="text-4xl font-extrabold text-blue-800 md:text-5xl num" data-val="10">
	            0
	          </dd>
        	</div>
        </div>

        <div class="flex rounded-lg border border-gray-200 hover:border-yellow-600 transition hover:scale-90 px-4 text-center space-x-12">
        	<div class="text-gray-500 py-8">
	        	<svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
        	</div>
        	<div class="flex flex-col py-8">
	          <dt class="order-last text-lg font-medium text-gray-500">
	            Title Deeds
	          </dt>

	          <dd class="text-4xl font-extrabold text-blue-800 md:text-5xl num" data-val="100">
	            0
	          </dd>
        	</div>
        </div>
        <div class="flex rounded-lg border border-gray-200 hover:border-yellow-600 transition hover:scale-90 px-4 text-center space-x-12">
        	<div class="text-gray-500 py-8">
	        	<svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        	</div>
        	<div class="flex flex-col py-8">
	          <dt class="order-last text-lg font-medium text-gray-500">
	            Years Experience
	          </dt>

	          <dd class="text-4xl font-extrabold text-blue-800 md:text-5xl num" data-val="3">
	          	0
	          </dd>
        	</div>
        </div>
      </dl>
    </div>
  </div>
</section>