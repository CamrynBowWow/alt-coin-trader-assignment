'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getProductById } from '@/services/productService';
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

	useEffect(() => {
		async function loadData() {
			setLoading(true);
			const data = await getProductById(id);
			setProduct(data);
			setLoading(false);
		}
		loadData();
	}, [id]);

	if (loading) return <Loading message='Loading product details...' />;

	if (!product) {
		return (
			<>
				<NoProduct
					header='Product Not Found'
					message='We could not find an item with the ID:'
					id={id}
				/>
			</>
		);
	}

	return (
		<div className='min-h-screen bg-gray-50 p-8'>
			<div className='max-w-3xl mx-auto'>
				<BackButton buttonText='Back to Dashboard' route={() => router.back()} />

				<main className='bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden'>
					<div className='p-8 border-b border-gray-100 flex justify-between items-start'>
						<div>
							<h1 className='text-3xl font-bold text-gray-900 mb-2'>{product.name}</h1>
							<p className='text-lg text-gray-500'>{product.category}</p>
						</div>
						<span className={`item-status-badge-style ${getStatusStyles(product.status)}`}>
							{product.status}
						</span>
					</div>

					<div className='p-8 grid grid-cols-1 md:grid-cols-2 gap-8'>
						<InfoBlock label='Owner' value={product.owner || 'Unassigned'} />
						<InfoBlock label='Product ID' value={product.id} />
						<InfoBlock label='Date Created' value={formatDate(product.createdAt)} />
						<InfoBlock label='Last Modified' value={formatDate(product.updatedAt)} />
					</div>

					<div className='bg-gray-50 p-8 border-t border-gray-100 flex gap-4'>
						<button className='edit-button'>Edit Product</button>
						<button className='delete-button'>Delete</button>
					</div>
				</main>
			</div>
		</div>
	);
}
