import { ReactNode } from 'react';

export default function layout({ children }: { children: ReactNode }) {
	return <section>{children}</section>;
}
