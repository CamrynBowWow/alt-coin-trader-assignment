import productsData from '@/data/products.json';

export const fetchProducts = async (shouldFail = false): Promise<Product[]> => {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	if (shouldFail) {
		throw new Error('Failed to load directory items.');
	}

	return productsData as Product[];
};
