// src/routes/shop/[id]/+page.js
export function load({ params }) {
	return {
		id: parseInt(params.id)
	};
}
