import { ClipLoader } from 'react-spinners';

const spinnerSize = {
	small: 25,
	medium: 50,
	large: 75,
};

interface SpinnerProps {
	size: 'small' | 'medium' | 'large';
}

function Spinner({ size }: SpinnerProps) {
	return (
		<ClipLoader
			color={'#7c67ff'}
			loading={true}
			size={spinnerSize[size]}
			aria-label='Loading Spinner'
			data-testid='loader'
		/>
	);
}

export default Spinner;
