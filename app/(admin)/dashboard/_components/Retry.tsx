'use client';

type RetryProps = {
	errorMessage: string;
	load: (value?: boolean) => void;
};

export default function Retry({ errorMessage, load }: RetryProps) {
	return (
		<div className='p-8 text-center text-red-500'>
			<p>{errorMessage}</p>
			<button onClick={() => load(false)} className='retry-button'>
				Retry
			</button>
		</div>
	);
}
