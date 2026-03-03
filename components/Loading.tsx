'use client';

type LoadingProps = {
	message: string;
};

export default function Loading({ message }: LoadingProps) {
	return <div className='loading'>{message}</div>;
}
