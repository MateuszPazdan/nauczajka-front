import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function ToastProvider() {
	return (
		<>
			<ToastContainer position='top-center' autoClose={2000} limit={3} />
		</>
	);
}
