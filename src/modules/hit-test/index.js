export default (block, obsticles) => {
	let result = false;

	block.pieces.forEach(p => {
		obsticles.forEach(o => {
			result = p.x === o.x || o.x === '*' && p.y === o.y || o.y === '*';
		});
	});

	return result;
}
