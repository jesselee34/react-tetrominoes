export default (BLOCK_SIZE) => {
	return {
		width: Math.floor(window.innerWidth / BLOCK_SIZE),
		height: Math.floor(window.innerHeight / BLOCK_SIZE)
	};
};
