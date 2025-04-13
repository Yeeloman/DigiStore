<!-- src/routes/shop/[id]/+page.svelte -->
<script lang="ts">
	import { createModalPopup } from '$lib/scripts/viewink.mjs';
	import { page } from '$app/stores';
	import { productStore, addToCart } from '$lib/stores/productStore';

	// Get the product based on the ID from the URL
	$: productId = parseInt($page.params.id);
	$: product = $productStore.find((p) => p.id === productId);

	let store_name = 'lnko';
	const URL = 'https://vto.digiwearit.com';
	const modal = createModalPopup({
		url: `${URL}/vto/:store_name/:product_slug/`,
		sandbox: 'allow-forms allow-scripts allow-same-origin allow-popups allow-downloads',
		onClose: () => {
			const modal = createModalPopup({
				url: `${URL}/vto/feedback/`,
				sandbox: 'allow-forms allow-scripts allow-same-origin'
			});
			modal.openPopup();
		}
	});

	function openPopup(productSlug: string) {
		modal.openPopup({
			store_name: store_name,
			product_slug: productSlug
		});
	}
</script>

<svelte:head>
	{#if product}
		<title>{product.name} - DigiStore</title>
	{:else}
		<title>Product Not Found - DigiStore</title>
	{/if}
</svelte:head>

<section class="py-12">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		{#if product}
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
				<div
					class="flex h-64 items-center justify-center overflow-hidden rounded-lg bg-gray-200 md:h-96"
				>
					<img src={product.image} alt={product.name} class="h-full w-full object-cover" />
				</div>

				<div>
					<h1 class="mb-2 text-3xl font-bold">{product.name}</h1>
					<p class="mb-4 text-gray-600">{product.category}</p>
					<p class="mb-4 text-2xl font-bold">${product.price}</p>
					<p class="mb-6 text-gray-700">{product.description}</p>

					<div class="mb-6">
						<h3 class="mb-2 font-semibold">Features:</h3>
						<ul class="list-inside list-disc text-gray-700">
							{#each product.features as feature}
								<li>{feature}</li>
							{/each}
						</ul>
					</div>

					<button
						on:click={() => addToCart(product)}
						class="w-full rounded-md bg-[#3b82f6] px-6 py-3 font-medium text-white transition duration-300 hover:bg-blue-700 md:w-auto"
					>
						Add to Cart
					</button>

					<button
						class="mb-4 rounded-md bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
						on:click={() => openPopup(product.slug)}
					>
						Try On Glasses
					</button>
				</div>
			</div>

			<div class="mt-12">
				<a href="/shop" class="text-[#3b82f6] hover:underline">← Back to Shop</a>
			</div>
		{:else}
			<div class="py-12 text-center">
				<h1 class="mb-4 text-3xl font-bold">Product Not Found</h1>
				<p class="mb-6">The product you're looking for doesn't exist or has been removed.</p>
				<a href="/shop" class="text-[#3b82f6] hover:underline">← Back to Shop</a>
			</div>
		{/if}
	</div>
</section>
