import productsData from '@/data/products.json';

const STORAGE_KEY = 'admin_directory_products';

export const fetchProducts = async (shouldFail = false): Promise<Product[]> => {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	if (shouldFail) {
		throw new Error('Failed to load directory items.');
	}

	return getStoredProducts();
};

export const getProductById = async (id: string): Promise<Product | null> => {
	await new Promise((resolve) => setTimeout(resolve, 500));

	const products = getStoredProducts();

	const product = products.find((p) => p.id === id);
	return (product as Product) || null;
};

const getStoredProducts = (): Product[] => {
	if (typeof window === 'undefined') {
		return productsData as Product[];
	}

	const stored = localStorage.getItem(STORAGE_KEY);

	if (!stored) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(productsData));
		return productsData as Product[];
	}

	return JSON.parse(stored);
};

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<void> => {
	await new Promise((resolve) => setTimeout(resolve, 500));

	const products = getStoredProducts();

	const updatedProducts = products.map((product) =>
		product.id === id ? { ...product, ...updates, updatedAt: new Date().toISOString() } : product,
	);
	localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
};
