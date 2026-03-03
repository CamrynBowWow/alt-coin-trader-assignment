declare type ProductStatus = 'active' | 'inactive' | 'pending';

declare type Product = {
	id: string;
	name: string;
	status: ProductStatus;
	category: string;
	owner?: string;
	createdAt: string;
	updatedAt: string;
};

declare type SelectOption = {
	value: string;
	label: string;
};
