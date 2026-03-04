'use client';

/* eslint-disable  @typescript-eslint/no-explicit-any */

import { useState, useEffect, useMemo } from 'react';
import { fetchProducts } from '@/services/productService';
import { formatDate, getStatusStyles } from '@/lib/utils';
import Loading from '@/components/Loading';
import Retry from './_components/Retry';
import Select from '@/components/Select';
import { SORT_OPTIONS, STATUS_OPTIONS } from '@/data/constants';
import { useRouter } from 'next/navigation';

export default function Page() {
	const router = useRouter();
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [search, setSearch] = useState('');
	const [statusFilter, setStatusFilter] = useState<ProductStatus | 'all'>('all');
	const [sortBy, setSortBy] = useState<'name' | 'createdAt'>('name');

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async (simulateError = false) => {
		setLoading(true);
		setError(null);
		try {
			const data = await fetchProducts(simulateError);
			setProducts(data);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const filteredProducts = useMemo(() => {
		return products
			.filter((p) => {
				const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
				const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
				return matchesSearch && matchesStatus;
			})
			.sort((a, b) => {
				if (sortBy === 'name') return a.name.localeCompare(b.name);
				return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
			});
	}, [products, search, statusFilter, sortBy]);

	if (loading) {
		return <Loading message='Loading product directory...' />;
	}

	if (error) {
		return <Retry errorMessage={error} load={() => loadData()} />;
	}

	return (
		<div className='p-8 max-w-6xl mx-auto'>
			<h1 className='main-header'>Product Administration</h1>

			<div className='flex flex-wrap gap-4 mb-6 items-center'>
				<input
					type='text'
					placeholder='Search products...'
					className='dashboard-input'
					onChange={(e) => setSearch(e.target.value)}
				/>

				<Select options={STATUS_OPTIONS} filter={(val) => setStatusFilter(val as any)} />

				<Select options={SORT_OPTIONS} filter={(val) => setSortBy(val as any)} />

				<button onClick={() => loadData(true)} className='simulate-error-button'>
					Simulate Error
				</button>
			</div>

			<div className='bg-white shadow rounded-lg overflow-hidden border border-gray-200'>
				<table className='w-full text-left'>
					<thead className='bg-gray-50 text-gray-600 uppercase text-xs'>
						<tr>
							<th className='table-header'>Product Name</th>
							<th className='table-header'>Category</th>
							<th className='table-header'>Status</th>
							<th className='table-header'>Created</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-gray-200'>
						{filteredProducts.length > 0 ? (
							filteredProducts.map((product) => (
								<tr
									key={product.id}
									className='table-row'
									onClick={() => router.push(`/items/${product.id}`)}
								>
									<td className='table-data font-medium'>{product.name}</td>
									<td className='table-data'>{product.category}</td>
									<td className='table-data'>
										<span className={`table-status-badge-style ${getStatusStyles(product.status)}`}>
											{product.status}
										</span>
									</td>
									<td className='table-data text-sm text-gray-500'>
										{formatDate(product.createdAt)}
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={4} className='dashboard-no-products-message'>
									No products found matching your criteria.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
