'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct } from '@/services/productService';
import BackButton from '@/components/BackButton';

export default function CreateProductPage() {
	const router = useRouter();
	const [isSaving, setIsSaving] = useState(false);

	const [name, setName] = useState('');
	const [category, setCategory] = useState('');
	const [status, setStatus] = useState<ProductStatus>('pending');
	const [errors, setErrors] = useState<{ name?: string; category?: string }>({});

	const handleCreate = async (e: React.FormEvent) => {
		e.preventDefault();

		const newErrors: { name?: string; category?: string } = {};
		if (name.trim().length < 3) {
			newErrors.name = 'Name must be at least 3 characters.';
		}

		if (!category.trim()) {
			newErrors.category = 'Category is required.';
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		setIsSaving(true);
		await createProduct({ name, category, status });
		router.refresh();
		router.push('/dashboard');
	};

	return (
		<div className='container'>
			<div className='max-w-2xl mx-auto'>
				<BackButton buttonText='Back to Directory' route={() => router.push('/dashboard')} />

				<form onSubmit={handleCreate} className='form-style'>
					<h1 className='text-2xl font-bold text-gray-900 mb-6'>Add New Product</h1>

					<div className='flex flex-col gap-6'>
						<div>
							<label className='form-label'>Product Name</label>
							<input
								type='text'
								value={name}
								onChange={(e) => setName(e.target.value)}
								className={`dashboard-input w-full ${errors.name ? 'border-red-500' : ''}`}
								placeholder='e.g. Premium Subscription'
							/>
							{errors.name && <p className='input-error'>{errors.name}</p>}
						</div>

						<div>
							<label className='form-label'>Category</label>
							<input
								type='text'
								value={category}
								onChange={(e) => setCategory(e.target.value)}
								className={`dashboard-input w-full ${errors.category ? 'border-red-500' : ''}`}
								placeholder='e.g. Software'
							/>
							{errors.category && <p className='input-error'>{errors.category}</p>}
						</div>

						<div>
							<label className='form-label'>Initial Status</label>
							<select
								value={status}
								onChange={(e) => setStatus(e.target.value as ProductStatus)}
								className='select-style'
							>
								<option value='active'>Active</option>
								<option value='pending'>Pending</option>
								<option value='inactive'>Inactive</option>
							</select>
						</div>

						<button type='submit' disabled={isSaving} className='save-button w-full'>
							{isSaving ? 'Creating...' : 'Create Product'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
