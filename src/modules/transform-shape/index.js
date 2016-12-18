/**
 * moveShape: Move a shape
 * @param  {Array} pieces    [description]
 * @param  {int} direction 'LEFT', 'RIGHT' or 'DOWN'
 * @return {Array} returns an array of pieces moved 1 grid space
 */
export const moveShape = (block, direction) => {
	return {
		...block,

		x: direction === 'LEFT' ? block.x + 1 : direction === 'RIGHT' ? block.x - 1 : block.x,
		y: direction === 'DOWN' ? block.y + 1 : block.y,

		pieces: block.pieces.map(piece => {
			let newPiece = {
				...piece
			};

			switch (direction) {
				case 'LEFT':
					newPiece.x -= 1;
					break;
				case 'RIGHT':
					newPiece.x += 1;
					break;
				case 'DOWN':
				default:
					newPiece.y += 1;
					break;
			};

			return newPiece;
		})
	};
};

/**
* rotateShape: Rotate a shape.
* @param  {Array} pieces and array of shape peices
* @param  {int} direction 'LEFT' or 'RIGHT'
* @return returns an array of pieces rotated in a paticular direction.
*/
export const rotateShape = (pieces) => {
	return pieces.map(p => {
		return {
			x: p.y,
			y: p.x === 0 ? 2 : p.x === 2 ? 0 : 1
		};
	});
};
