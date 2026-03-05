'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { deleteProduct, getProductById } from '@/services/productService';
import { getStatusStyles, formatDate } from '@/lib/utils';
import Loading from '@/components/Loading';
import InfoBlock from '../_components/InfoBlock';
import BackButton from '@/components/BackButton';
import NoProduct from '../_components/NoProduct';

export default function ItemDetailPage() {
	const router = useRouter();
	const params = useParams();
	const id = params.id as string;

	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		async function loadData() {
			setLoading(true);
			const data = await getProductById(id);
			setProduct(data);
			setLoading(false);
		}
		loadData();
	}, [id]);

	const handleDelete = async () => {
		const confirmed = window.confirm(
			`Are you sure you want to delete "${product?.name}"? This action cannot be undone.`,
		);

		if (!confirmed) return;

		setIsDeleting(true);
		try {
			await deleteProduct(id as string);

			router.refresh();

			router.push('/dashboard');
		} catch (error) {
			alert('Failed to delete the product. Please try again.');
			setIsDeleting(false);
		}
	};

	if (loading) {
		return <Loading message='Loading product details...' />;
	}

	if (!product) {
		return (
			<NoProduct
				header='Product Not Found'
				message='We could not find an item with the ID:'
				id={id}
			/>
		);
	}

	return (
		<div className='min-h-screen bg-gray-50 p-8'>
			<div className='max-w-3xl mx-auto'>
				<BackButton buttonText='Back to Dashboard' route={() => router.push('/dashboard')} />

				<main className='item-details-main'>
					<div className='item-details-product-header-container'>
						<div>
							<h1 className='item-product-name'>{product.name}</h1>
							<p className='item-product-category'>{product.category}</p>
						</div>
						<span className={`item-status-badge-style ${getStatusStyles(product.status)}`}>
							{product.status}
						</span>
					</div>

					<div className='item-details-info-container'>
						<InfoBlock label='Owner' value={product.owner || 'Unassigned'} />
						<InfoBlock label='Product ID' value={product.id} />
						<InfoBlock label='Date Created' value={formatDate(product.createdAt)} />
						<InfoBlock label='Last Modified' value={formatDate(product.updatedAt)} />
					</div>

					<div className='bg-gray-50 p-8 border-t border-gray-100 flex gap-4'>
						<button onClick={() => router.push(`/items/${id}/edit`)} className='edit-button'>
							Edit Product
						</button>
						<button
							onClick={handleDelete}
							className={`delete-button ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
							disabled={isDeleting}
						>
							{isDeleting ? 'Deleting...' : 'Delete'}
						</button>
					</div>
				</main>
			</div>
		</div>
	);
}
