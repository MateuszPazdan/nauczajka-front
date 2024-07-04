import { ClipLoader } from 'react-spinners';

const spinnerSize = {
	small: 25,
	medium: 50,
	large: 75,
};

interface SpinnerProps {
	size: 'small' | 'medium' | 'large';
	color?: string;
}

function Spinner({ size, color }: SpinnerProps) {
	return (
		<ClipLoader
			color={color || '#7c67ff'}
			loading={true}
			size={spinnerSize[size]}
			aria-label='Loading Spinner'
			data-testid='loader'
		/>
	);
}

export default Spinner;
