'use client';

/* eslint-disable  @typescript-eslint/no-explicit-any */

type SelectProps = {
	options: SelectOption[];
	filter: (value: string) => void;
};

export default function Select({ filter, options }: SelectProps) {
	return (
		<div className='max-w-37.5 w-full'>
			<div className='relative'>
				<select className='select-style' onChange={(e) => filter(e.target.value as any)}>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth='1.2'
					stroke='currentColor'
					className='select-svg'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9'
					/>
				</svg>
			</div>
		</div>
	);
}
