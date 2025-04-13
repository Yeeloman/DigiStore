<!-- src/routes/shop/+page.svelte -->
<script>
	import { productStore } from '$lib/stores/productStore';
</script>

<svelte:head>
	<title>Shop - DigiStore</title>
</svelte:head>

<section class="py-12">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h1 class="mb-8 text-3xl font-bold">Shop All Eyewear</h1>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each $productStore as product}
				<div
					class="overflow-hidden rounded-lg bg-white shadow transition duration-300 hover:shadow-lg"
				>
					<a href={`/shop/${product.id}`}>
						<div class="flex h-56 items-center justify-center bg-gray-200">
							<img src={product.image} alt={product.name} class="h-full w-full object-contain" />
						</div>
						<div class="p-4">
							<h2 class="mb-1 font-semibold">{product.name}</h2>
							<p class="mb-2 text-sm text-gray-600">{product.category}</p>
							<div class="flex items-center justify-between">
								<p class="text-lg font-bold">${product.price}</p>
								<button
									class="rounded-md bg-[#3b82f6] px-3 py-1 text-sm text-white transition duration-300 hover:bg-blue-700"
								>
									View Details
								</button>
							</div>
						</div>
					</a>
				</div>
			{/each}
		</div>
	</div>
</section>
