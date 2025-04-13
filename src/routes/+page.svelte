<!-- src/routes/+page.svelte -->
<script lang="ts">
	import Logo from '$lib/assets/Digi_logo.png';
	import { createModalPopup } from '$lib/scripts/viewink.mjs';
	import { productStore } from '$lib/stores/productStore';

	// Get featured products (first 3)
	$: featuredProducts = $productStore.slice(0, 3);

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
	<title>DigiStore - Premium Eyewear Collection</title>
</svelte:head>

<section class="relative">
	<div class="h-72 bg-gradient-to-r from-blue-500 to-indigo-600 md:h-96">
		<div class="mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
			<div class="text-white">
				<h1 class="mb-4 text-4xl font-bold md:text-5xl">Premium Eyewear Collection</h1>
				<p class="mb-6 text-xl">Discover stylish glasses for every occasion</p>
				<a
					href="/shop"
					class="rounded-md bg-white px-6 py-3 font-medium text-blue-600 transition duration-300 hover:bg-gray-100"
				>
					Shop Now
				</a>
			</div>
		</div>
	</div>
</section>

<section class="bg-white py-12">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h2 class="mb-12 text-center text-3xl font-bold">Featured Products</h2>
		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			{#each featuredProducts as product}
				<div
					class="overflow-hidden rounded-lg bg-white shadow-md transition duration-300 hover:shadow-lg"
				>
					<div class="flex h-48 items-center justify-center bg-gray-200">
						<img src={product.image} alt={product.name} class="h-full w-full object-contain" />
					</div>
					<div class="p-4">
						<a href={`/shop/${product.id}`}>
							<h3 class="mb-2 font-semibold">{product.name}</h3>
						</a>
						<p class="mb-2 text-sm text-gray-600">{product.category}</p>
						<div class="flex items-center justify-between">
							<p class="text-lg font-bold">${product.price}</p>
							<button
								class="flex flex-col items-center space-x-1 rounded-md border-1 border-solid border-blue-900/80 bg-blue-100 px-3 py-2 text-blue-900 hover:border-none hover:bg-blue-200/90 hover:text-blue-500"
								on:click={() => openPopup(product.slug)}
							>
								<img src={Logo} alt="Logo" class="size-14 object-contain" />
								<span>Try Now</span>
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="mt-8 text-center">
			<a href="/shop" class="inline-block font-medium text-[#3b82f6] hover:underline">
				View All Products →
			</a>
		</div>
	</div>
</section>

<section class="bg-gray-50 py-12">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			<div class="p-6 text-center">
				<div class="mb-4 inline-block rounded-full bg-blue-100 p-3">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 text-[#3b82f6]"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 10V3L4 14h7v7l9-11h-7z"
						/>
					</svg>
				</div>
				<h3 class="mb-2 font-semibold">Fast Shipping</h3>
				<p class="text-gray-600">Delivery within 2-3 business days</p>
			</div>
			<div class="p-6 text-center">
				<div class="mb-4 inline-block rounded-full bg-green-100 p-3">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 text-[#10b981]"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<h3 class="mb-2 font-semibold">Quality Guarantee</h3>
				<p class="text-gray-600">Premium materials and craftsmanship</p>
			</div>
			<div class="p-6 text-center">
				<div class="mb-4 inline-block rounded-full bg-yellow-100 p-3">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 text-[#f59e0b]"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
						/>
					</svg>
				</div>
				<h3 class="mb-2 font-semibold">Secure Payment</h3>
				<p class="text-gray-600">Multiple secure payment options</p>
			</div>
		</div>
	</div>
</section>
