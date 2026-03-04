'use client';

type BackButtonProps = {
	buttonText: string;
	route: () => void;
};

export default function BackButton({ buttonText, route }: BackButtonProps) {
	return (
		<button onClick={route} className='back-button-style'>
			{buttonText}
		</button>
	);
}
