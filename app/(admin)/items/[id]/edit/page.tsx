'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getProductById, updateProduct } from '@/services/productService';
import Loading from '@/components/Loading';
import NoProduct from '../../_components/NoProduct';
import BackButton from '@/components/BackButton';

export default function EditProductPage() {
	const router = useRouter();
	const { id } = useParams();

	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);

	const [name, setName] = useState('');
	const [status, setStatus] = useState<ProductStatus>('pending');
	const [errors, setErrors] = useState<{ name?: string }>({});

	useEffect(() => {
		async function load() {
			const data = await getProductById(id as string);

			if (data) {
				setProduct(data);
				setName(data.name);
				setStatus(data.status);
			}

			setLoading(false);
		}
		load();
	}, [id]);

	const handleSave = async (e: React.FormEvent) => {
		e.preventDefault();

		if (name.trim().length < 3) {
			setErrors({ name: 'Product name must be at least 3 characters.' });
			return;
		}

		setIsSaving(true);
		await updateProduct(id as string, { name, status });
		setIsSaving(false);

		router.refresh();
		router.push(`/items/${id}`);
	};

	if (loading) {
		return <Loading message='Loading edit form...' />;
	}

	if (!product) {
		return <NoProduct header='Not Found' message='Cannot edit missing item:' id={id as string} />;
	}

	return (
		<div className='container'>
			<div className='max-w-2xl mx-auto'>
				<BackButton
					buttonText='Cancel and Go Back'
					route={() => router.push(`/items/${product.id}`)}
				/>

				<form onSubmit={handleSave} className='form-style'>
					<div className='flex gap-0.5 flex-col mb-8'>
						<h1 className='item-edit-h1'>Edit Product Details</h1>
						<h2 className='item-edit-h2'>Product ID: {id}</h2>
					</div>

					<div className='flex flex-col gap-6'>
						<div>
							<label className='form-label'>Product Name</label>
							<input
								type='text'
								value={name}
								onChange={(e) => {
									setName(e.target.value);
									if (errors.name) setErrors({});
								}}
								className={`item-input-product-name ${errors.name ? 'border-red-500' : ''}`}
							/>
							{errors.name && <p className='input-error'>{errors.name}</p>}
						</div>

						<div>
							<label className='form-label'>Status</label>
							<div className='relative'>
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
						</div>

						<div className='pt-4 flex gap-4'>
							<button type='submit' disabled={isSaving} className='save-button flex-1'>
								{isSaving ? 'Saving...' : 'Save Changes'}
							</button>
							<button type='button' onClick={() => router.back()} className='cancel-button'>
								Cancel
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
