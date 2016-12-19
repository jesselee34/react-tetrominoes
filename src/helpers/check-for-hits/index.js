import hitTest from '../../modules/hit-test';

const _didHitBlock = (block, obsticles) => {
	return obsticles.length > 0 && obsticles.reduce((last, cur, i, obsticles) => {
		if(last) return last; // Optimize
		let did = hitTest( block, obsticles[i].pieces);
		console.log(did);
		return did;
	}, false);
};

export const checkBottom = (nextPos, frame) => {
	let didHitBottom = hitTest( nextPos, [{x: '*', y: frame.board.height}] );
	let didHitBlock = _didHitBlock(nextPos, frame.blocks);

	return didHitBlock || didHitBottom;
};

export const checkSides = (nextPos, frame) => {
	let didHitRight = hitTest( nextPos, [{x: frame.board.width, y: '*'}] );
	let didHitLeft = hitTest( nextPos, [{x: 0, y: '*'}] );
	let didHitBlock = _didHitBlock(nextPos, frame.blocks);

	return didHitBlock || didHitLeft || didHitRight;
};

export const combineCoords = (nextX, nextY) => {
	let result = {
		...nextX,
		...nextY,

		x: nextX.x,
		y: nextY.y
	};

	if(nextX.pieces){
		nextX.pieces.forEach((piece, i) => {
			result.pieces[i].x = piece.x;
		});
	}

	if(nextY.pieces){
		nextY.pieces.forEach((piece, i) => {
			result.pieces[i].y = piece.y;
		});
	}

	return result;
};
