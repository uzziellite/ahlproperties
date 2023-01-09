<script>
  import {clickOutside} from "@directives/click_outside.js"

  let mobileMenuActive = false
  let lgrid = 1
  let workActive = false
  const name = import.meta.env.PUBLIC_NAME
</script>

<div class="fixed w-full top-0 z-50 bg-white shadow-lg border-b-2 border-yellow-600">
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <div class="flex items-center justify-between border-b-2 border-gray-100 py-1 md:justify-start md:space-x-10">
      <div class="flex justify-start lg:w-0 lg:flex-1">
        <a href="/" class="flex transition hover:scale-110">
          <span class="sr-only">{name}</span>
          <img class="h-12 w-auto sm:h-[75px] mt-2" src="/images/logo.png" alt={name}>
        </a>
      </div>
      <div class="-my-2 -mr-2 md:hidden">
        <button type="button" class="inline-flex items-center justify-center rounded-md bg-white p-2 hover:bg-gray-100 focus:outline-none" aria-expanded={`${mobileMenuActive ? 'true' : 'false'}`} on:click={() => mobileMenuActive = ! mobileMenuActive }>
          <span class="sr-only">Open menu</span>
          <!-- Heroicon name: outline/bars-3 -->
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      <nav class="hidden space-x-10 md:flex">
        <a href="/" class="text-sm font-bold uppercase hover:border-b-2 hover:border-yellow-600 mt-2 transition hover:scale-110">Home</a>
        <a href="/about" class="text-sm font-bold uppercase hover:border-b-2 hover:border-yellow-600 mt-2 transition hover:scale-110">About</a>
        <a href="/properties" class="text-sm font-bold uppercase hover:border-b-2 hover:border-yellow-600 mt-2 transition hover:scale-110">Properties</a>
        <a href="/blog" class="mt-2 text-sm font-bold uppercase hover:border-b-2 hover:border-yellow-600 transition hover:scale-110">Blog</a>
        <li class="hidden lg:flex flex items-center">
          <div class="flex items-center">
            <div class="relative" on:mouseover={() => workActive = true} on:mouseleave={() => workActive = false}>
              <button type="button" class="flex items-center" aria-expanded={workActive ? 'true' : 'false'}>
                <span class="text-sm font-bold uppercase hover:border-b-2 hover:border-yellow-600 transition hover:scale-110">Media</span>
                <svg class="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
              <div class={`w-[15rem] absolute z-10 -ml-6 mt-0 transform px-2 sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2 ${workActive ? '' : 'hidden'} shadow-lg`} on:mouseover={() => workActive = true} on:mouseleave={() =>workActive = false}>
                <div class="shadow-lg overflow-hidden">
                  <div class={`relative grid ${lgrid} bg-white p-1 lg:p-2 divide-x divide-green-600 divide-dashed`}>
                    <div class="flex flex-col p-4">
                      <a href="/videos" class="my-2 text-sm font-bold uppercase hover:border-b-2 hover:border-yellow-600 transition hover:scale-110">Videos</a>
                      <a href="/gallery" class="my-2 text-sm font-bold uppercase hover:border-b-2 hover:border-yellow-600 transition hover:scale-110">Gallery</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <a href="/contact" class="text-sm font-bold uppercase hover:border-b-2 hover:border-yellow-600 mt-2 transition hover:scale-110">Contact</a>
        <a class="inline-block rounded bg-blue-800 text-sm font-mono text-white transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:bg-indigo-500 p-2 uppercase" href="#cta">
          Book Site Visit
        </a>
      </nav>
    </div>
  </div>

  <!--
    Mobile menu, show/hide based on mobile menu state.

    Entering: "duration-200 ease-out"
      From: "opacity-0 scale-95"
      To: "opacity-100 scale-100"
    Leaving: "duration-100 ease-in"
      From: "opacity-100 scale-100"
      To: "opacity-0 scale-95"
  -->
  <div class={`absolute inset-x-0 top-0 origin-top-right transform p-2 transition ${mobileMenuActive ? '' : 'hidden'}`} use:clickOutside on:outclick={() => mobileMenuActive = false}>
    <div class="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
      <div class="px-5 pt-5 pb-6">
        <div class="flex items-center justify-between">
          <div>
            <img class="w-24 h-auto" src="/images/logo.png" alt={name}>
          </div>
          <div class="-mr-2">
            <button type="button" class="inline-flex items-center justify-center rounded-md bg-white p-2 hover:bg-gray-100 focus:outline-none" on:click={() => mobileMenuActive = false}>
              <span class="sr-only">Close menu</span>
              <!-- Heroicon name: outline/x-mark -->
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div class="mt-6">
          <nav class="grid gap-y-8">
            <a href="/" class="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
              <!-- Heroicon name: outline/home -->
              <svg class="w-6 h-6 flex-shrink-0 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
              <span class="ml-3 text-base font-medium text-gray-900">
                Home
              </span>
            </a>

            <a href="/about" class="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
              <!-- Heroicon name: outline/info -->
              <svg class="w-6 h-6 flex-shrink-0 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span class="ml-3 text-base font-medium text-gray-900">
                About
              </span>
            </a>

            <a href="/properties" class="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
              <svg class="w-6 h-6 flex-shrink-0 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              <span class="ml-3 text-base font-medium text-gray-900">Properties</span>
            </a>

            <a href="/blog" class="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
              <svg class="w-6 h-6 flex-shrink-0 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
              <span class="ml-3 text-base font-medium text-gray-900">
                Blog
              </span>
            </a>
            <a href="/videos" class="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
              <svg class="w-6 h-6 flex-shrink-0 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              <span class="ml-3 text-base font-medium text-gray-900">
                Videos
              </span>
            </a>
            <a href="/gallery" class="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
              <svg class="w-6 h-6 flex-shrink-0 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <span class="ml-3 text-base font-medium text-gray-900">
                Gallery
              </span>
            </a>
            <a href="/contact" class="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
              <!-- Heroicon name: outline/chat -->
              <svg class="w-6 h-6 flex-shrink-0 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
              <span class="ml-3 text-base font-medium text-gray-900">
                Contact
              </span>
            </a>
          </nav>
        </div>
      </div>
    </div>
  </div>
</div>
