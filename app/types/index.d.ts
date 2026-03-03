declare type Product = {
	id: string;
	name: string;
	status: 'active' | 'inactive' | 'pending';
	category: string;
	owner?: string;
	createdAt: string;
	updatedAt: string;
};
