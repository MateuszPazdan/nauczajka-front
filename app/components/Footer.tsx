function Footer() {
	const curYear = new Date().getFullYear();
	return (
		<div className='w-full flex justify-center items-center py-2'>
			<p className='text-gray'>Nauczajka &copy; {curYear}</p>
		</div>
	);
}

export default Footer;
