'use client';

import { ReactNode } from 'react';
import { makeStore } from './store';
import { Provider } from 'react-redux';

interface Props {
	children: ReactNode;
}

export default function CustomProvider({ children }: Props) {
	return <Provider store={makeStore()}>{children}</Provider>;
}
