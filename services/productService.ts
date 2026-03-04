import productsData from '@/data/products.json';

export const fetchProducts = async (shouldFail = false): Promise<Product[]> => {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	if (shouldFail) {
		throw new Error('Failed to load directory items.');
	}

	return productsData as Product[];
};

export const getProductById = async (id: string): Promise<Product | null> => {
	await new Promise((resolve) => setTimeout(resolve, 500));

	const product = productsData.find((p) => p.id === id);
	return (product as Product) || null;
};
