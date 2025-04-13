<!-- src/routes/cart/+page.svelte -->
<script>
	import { cart, removeFromCart, updateQuantity } from '$lib/stores/productStore';

	// Calculate cart totals
	$: subtotal = $cart.reduce((total, item) => total + item.price * item.quantity, 0);
	$: tax = subtotal * 0.08; // 8% tax
	$: total = subtotal + tax;
</script>

<svelte:head>
	<title>Cart - DigiStore</title>
</svelte:head>

<section class="py-12">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h1 class="mb-8 text-3xl font-bold">Your Cart</h1>

		{#if $cart.length === 0}
			<div class="rounded-lg bg-white py-12 text-center shadow">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="mx-auto mb-4 h-16 w-16 text-gray-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
					/>
				</svg>
				<h2 class="mb-4 text-xl font-semibold">Your cart is empty</h2>
				<p class="mb-6 text-gray-600">
					Looks like you haven't added any products to your cart yet.
				</p>
				<a
					href="/shop"
					class="rounded-md bg-[#3b82f6] px-6 py-3 font-medium text-white transition duration-300 hover:bg-blue-700"
				>
					Continue Shopping
				</a>
			</div>
		{:else}
			<div class="overflow-hidden rounded-lg bg-white shadow">
				<table class="min-w-full divide-y divide-gray-200">
					<thead class="bg-gray-50">
						<tr>
							<th
								scope="col"
								class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
								>Product</th
							>
							<th
								scope="col"
								class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
								>Price</th
							>
							<th
								scope="col"
								class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
								>Quantity</th
							>
							<th
								scope="col"
								class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
								>Total</th
							>
							<th
								scope="col"
								class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
								>Actions</th
							>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200 bg-white">
						{#each $cart as item}
							<tr>
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="flex items-center">
										<div class="mr-4 h-10 w-10 flex-shrink-0 rounded-md bg-gray-200">
											<img
												src={`https://via.placeholder.com/40x40?text=${encodeURIComponent(item.name.charAt(0))}`}
												alt={item.name}
												class="h-10 w-10 rounded-md object-cover"
											/>
										</div>
										<div>
											<div class="text-sm font-medium text-gray-900">{item.name}</div>
											<div class="text-sm text-gray-500">{item.category}</div>
										</div>
									</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="text-sm text-gray-900">${item.price.toFixed(2)}</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="flex items-center">
										<button
											on:click={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
											class="p-1 text-gray-500 hover:text-gray-700"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="h-5 w-5"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													fill-rule="evenodd"
													d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
													clip-rule="evenodd"
												/>
											</svg>
										</button>
										<span class="mx-2 text-gray-700">{item.quantity}</span>
										<button
											on:click={() => updateQuantity(item.id, item.quantity + 1)}
											class="p-1 text-gray-500 hover:text-gray-700"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="h-5 w-5"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													fill-rule="evenodd"
													d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
													clip-rule="evenodd"
												/>
											</svg>
										</button>
									</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="text-sm text-gray-900">
										${(item.price * item.quantity).toFixed(2)}
									</div>
								</td>
								<td class="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
									<button
										on:click={() => removeFromCart(item.id)}
										class="text-red-600 hover:text-red-900"
									>
										Remove
									</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<div class="mt-8 rounded-lg bg-white p-6 shadow">
				<div class="mb-4 flex justify-between">
					<span class="text-gray-600">Subtotal</span>
					<span class="font-medium">${subtotal.toFixed(2)}</span>
				</div>
				<div class="mb-4 flex justify-between">
					<span class="text-gray-600">Tax (8%)</span>
					<span class="font-medium">${tax.toFixed(2)}</span>
				</div>
				<div class="mt-4 border-t pt-4">
					<div class="flex justify-between">
						<span class="text-lg font-bold">Total</span>
						<span class="text-lg font-bold">${total.toFixed(2)}</span>
					</div>
				</div>
				<div class="mt-8 flex justify-end">
					<a
						href="/shop"
						class="mr-4 rounded-md border px-6 py-3 text-gray-600 transition duration-300 hover:bg-gray-50"
					>
						Continue Shopping
					</a>
					<button
						class="rounded-md bg-[#3b82f6] px-6 py-3 font-medium text-white transition duration-300 hover:bg-blue-700"
					>
						Checkout
					</button>
				</div>
			</div>
		{/if}
	</div>
</section>
