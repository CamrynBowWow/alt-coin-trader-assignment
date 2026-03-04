'use client';

type InfoBlockProps = {
	label: string;
	value: string;
};

export default function InfoBlock({ label, value }: InfoBlockProps) {
	return (
		<div className='flex flex-col gap-1'>
			<p className='text-xs font-bold text-gray-400 uppercase tracking-widest'>{label}</p>
			<p className='text-gray-900 font-medium text-lg'>{value}</p>
		</div>
	);
}
