import React, { Component, PropTypes } from 'react';
import updateFrameNumber from './modules/update-frame-number';
import {handleKeyDown, handleKeyUp} from './modules/handlers';
import getBoardDimentions from './modules/get-dimentions';
import Blocks from './components/blocks';
import {createBlock, addBlock} from './modules/block';
import {moveShape} from './modules/transform-shape';

import {checkBottom, checkSides, combineCoords} from './helpers/check-for-hits';

import {BLOCK_SIZE} from './constants';

const draw = (store, frame) => {
	const state = store.getState();

	// Increment frame
	frame.frame = updateFrameNumber(state.frame);

	// If the game isn't paused.
	if(frame.pause) {
		return;
	}

	// If there is no looseBlock.
	if(frame.looseBlock === undefined){
		frame.looseBlock = createBlock(0,0);
		store.dispatch({type: 'DRAW', frame});
		return;
	}

	let nextPos = {}, nextYPos = {};

	if (frame.frame % 12 === 0) {
		nextYPos = moveShape(frame.looseBlock, 'DOWN');

		if( checkBottom(nextYPos, frame) ){
			let block = frame.looseBlock;
			frame.looseBlock = undefined;
			frame.blocks = addBlock(block, frame.blocks);

			store.dispatch({type: 'DRAW', frame});
			return;
		}

		frame.looseBlock = nextYPos;
	}

	if (frame.frame % 3 === 0 && frame.direction !== undefined) {
		nextPos = moveShape(frame.looseBlock, frame.direction);

		// Combine last move and this one.
		nextPos = combineCoords(nextPos, nextYPos);

		if( checkBottom(nextPos, frame) || checkSides(nextPos, frame) ){
			return; // Done.
		} else {
			frame.looseBlock = nextPos;
		}
	}

	store.dispatch({type: 'DRAW', frame});
};

const App = ({frame}) => {
	return {
		...Component.prototype,

		componentWillMount () {
			let {store} = this.context;
			let {frame} = this.props;

			frame.board = getBoardDimentions(BLOCK_SIZE);

			// Start the game loop.
			let loop = setInterval(draw, 1000/60, store, frame); // 60 fps

			// Kick it off
			draw(store, frame);

			// Bind keyboard events
			window.addEventListener('keydown', (e) => handleKeyDown(e, frame), false);

			// Bind keyboard events
			window.addEventListener('keyup', (e) => handleKeyUp(e, frame), false);

			// Bind window resize events
			window.addEventListener('resize', (e) => frame.board = getBoardDimentions(BLOCK_SIZE), false);
		},

		componentWillUnmount () {
			window.removeEventListener('keyup');
			window.removeEventListener('keydown');
			window.removeEventListener('resize');
		},

		render () {
			return <Blocks />
		}
	}
};

App.contextTypes = {
	store: PropTypes.object
};

export default App;
