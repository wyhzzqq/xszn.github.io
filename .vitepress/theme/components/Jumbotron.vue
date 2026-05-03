<template>
    <div class="vp-raw px-6 md:px-12 lg:px-16">
        <fwb-jumbotron
            class="bg-center bg-no-repeat bg-[url('/images/ogp-zh.webp')] dark:bg-gray-700 bg-gray-700 bg-blend-multiply rounded-xl"
            header-classes="text-white" sub-text-classes="text-gray-300 dark:text-gray-300"
            header-text="A List of Free and Open-Source Software" sub-text="Choose your first software here">
            <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                <a href="/software/system"
                    class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                    Get started
                    <svg class="w-3.5 h-3.5 ml-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
                <a href="/changelog/"
                    class="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ml-4 text-base font-medium text-center text-white rounded-full border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
                    Changelog
                </a>
            </div>
        </fwb-jumbotron>
    </div>
</template>

<script setup>
import { FwbJumbotron } from './index'
</script>