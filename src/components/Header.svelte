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
          <img class="h-8 w-auto sm:h-12 mt-2" src="/images/ahl-logo-3.png" alt={name}>
          <span class="font-serif text-blue-800 my-3 lg:text-2xl hidden lg:block uppercase">
            Properties
          </span>
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
            <img class="w-auto" src="/images/logo.png" alt={name}>
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
              <!-- Heroicon name: outline/adjustments -->
              <svg class="w-6 h-6 flex-shrink-0 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
              <span class="ml-3 text-base font-medium text-gray-900">Properties</span>
            </a>

            <a href="/blog" class="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
              <!-- Heroicon name: outline/cog -->
              <svg class="w-6 h-6 flex-shrink-0 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <span class="ml-3 text-base font-medium text-gray-900">
                Blog
              </span>
            </a>
            <a href="/media" class="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
              <!-- Heroicon name: outline/globe-alt -->
              <svg class="w-6 h-6 flex-shrink-0 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              <span class="ml-3 text-base font-medium text-gray-900">
                Media
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
