<!-- src/routes/+error.svelte -->
<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Error - DigiStore</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8 text-center">
		<div>
			<h1 class="mb-2 text-6xl font-extrabold text-[#3b82f6]">{$page.status}</h1>
			<h2 class="mb-6 text-3xl font-bold text-gray-900">
				{#if $page.status === 404}
					Page Not Found
				{:else}
					Something went wrong
				{/if}
			</h2>
			<p class="mb-8 text-gray-600">
				{#if $page.status === 404}
					The page you are looking for doesn't exist or has been moved.
				{:else}
					We're sorry, but something went wrong. Please try again later.
				{/if}
			</p>
			<div>
				<a
					href="/"
					class="inline-flex items-center rounded-md border border-transparent bg-[#3b82f6] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
				>
					Go back home
				</a>
			</div>
		</div>
	</div>
</div>
