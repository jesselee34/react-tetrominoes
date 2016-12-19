export default (block, obsticles) => {
	let result = false;

	block.pieces.forEach(p => {
		if(result) return true; // Optimize
		obsticles.forEach(o => {
			if(result) return true;
			result = (p.x === o.x && p.y === o.y) || (o.x === '*' && p.y >= o.y ) || (p.y === '*' && (p.x >= o.x || p.x <= 0 ));
		});
	});

	return result;
}
