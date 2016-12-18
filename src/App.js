import React, { Component, PropTypes } from 'react';
import updateFrameNumber from './modules/update-frame-number';
import {handleKeyboard} from './modules/handlers';
import getBoardDimentions from './modules/get-dimentions';
import hitTest from './modules/hit-test';
import Blocks from './components/blocks';

import {createBlock} from './modules/create-block';
import {moveShape} from './modules/transform-shape';

import {BLOCK_SIZE} from './constants';

const draw = (store, frame) => {
	const state = store.getState();

	// Increment frame
	frame.frame = updateFrameNumber(state.frame);

	// If the game isn't paused.
	if(!frame.pause) {
		if (frame.frame % 12 === 0) {
			if(frame.looseBlock === undefined){
				frame.looseBlock = createBlock(0,0);
			} else {
				let nextPos = moveShape(frame.looseBlock, 'DOWN');
				if(!hitTest(nextPos, [{x: '*', y: frame.board.height}])){
					frame.looseBlock = nextPos;
				}
			}
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
			window.addEventListener('keydown', (e) => handleKeyboard(e, frame), false);

			// Bind window resize events
			window.addEventListener('resize', (e) => frame.board = getBoardDimentions(BLOCK_SIZE), false);
		},

		componentWillUnmount () {
			window.removeEventListener('keyup');
			window.removeEventListener('resize');
		},

		render () {
			return (
				<div>
					<Blocks />
				</div>
			);
		}
	}
};

App.contextTypes = {
	store: PropTypes.object
};

export default App;
