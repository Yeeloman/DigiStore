// src/lib/stores/productStore.js
import { writable } from 'svelte/store';

import odyssey from '$lib/assets/products/odyssey.webp';
import peyton from '$lib/assets/products/peyton.webp';
import jamaica from '$lib/assets/products/Jamaica.png';
import shiny from '$lib/assets/products/Shiny-5.png';
import blackGlasses from '$lib/assets/products/Black.webp';
// Sample products data
const products = [
	{
		id: 1,
		name: "Classic Aviator",
		description: "Timeless aviator style with polarized lenses for reduced glare and enhanced clarity.",
		price: 129.99,
		image: odyssey,
		category: "Sunglasses",
		slug: "odyssey",
		features: ["Polarized", "UV Protection", "Metal Frame"]
	},
	{
		id: 2,
		name: "Modern Round",
		description: "Contemporary round frames with blue light filtering technology, perfect for digital screens.",
		price: 99.99,
		image: peyton,
		category: "Eyeglasses",
		slug: "peyton",
		features: ["Blue Light Filter", "Anti-Reflective", "Lightweight"]
	},
	{
		id: 3,
		name: "Retro Wayfarer",
		description: "Iconic wayfarer design with premium acetate frames and gradient lenses.",
		price: 149.99,
		image: jamaica,
		category: "Sunglasses",
		slug: "jamaica",
		features: ["Gradient Lenses", "UV Protection", "Premium Acetate"]
	},
	{
		id: 4,
		name: "Sport Wrap",
		description: "Athletic-inspired wrap sunglasses with impact-resistant lenses for outdoor activities.",
		price: 119.99,
		image: blackGlasses,
		category: "Sunglasses",
		slug: "shiny-5",
		features: ["Impact-Resistant", "Wrap Design", "Rubber Nose Pads"]
	},
	{
		id: 5,
		name: "Designer Square",
		description: "Elegant square frames with subtle detailing for a sophisticated look.",
		price: 179.99,
		image: shiny,
		category: "Eyeglasses",
		slug: "black",
		features: ["Premium Materials", "Spring Hinges", "Anti-Scratch Coating"]
	}
];

// Create the store
export const productStore = writable(products);

// Cart store
export const cart = writable([]);

// Add to cart function
export function addToCart(product) {
	cart.update(items => {
		// Check if product already exists in cart
		const existingItem = items.find(item => item.id === product.id);

		if (existingItem) {
			// Increment quantity if product already exists
			return items.map(item =>
				item.id === product.id
					? { ...item, quantity: item.quantity + 1 }
					: item
			);
		} else {
			// Add new product with quantity 1
			return [...items, { ...product, quantity: 1 }];
		}
	});
}

// Remove from cart function
export function removeFromCart(productId) {
	cart.update(items => items.filter(item => item.id !== productId));
}

// Update quantity function
export function updateQuantity(productId, quantity) {
	cart.update(items =>
		items.map(item =>
			item.id === productId
				? { ...item, quantity: quantity }
				: item
		)
	);
}
