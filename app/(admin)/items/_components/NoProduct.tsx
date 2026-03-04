'use client';

import Link from 'next/link';

type NoProductProps = {
	header: string;
	id: string;
	message: string;
};

export default function NoProduct({ header, id, message }: NoProductProps) {
	return (
		<div className='no-product-container'>
			<h2 className='no-product-header'>{header}</h2>
			<p className='text-gray-500 mb-8'>
				{message} <span className='font-mono text-red-500'>{id}</span>
			</p>
			<Link href='/dashboard' className='link-button'>
				Back to Dashboard
			</Link>
		</div>
	);
}
