import React from 'react';
import {connect} from 'react-redux';
import {BLOCK_SIZE} from '../../constants';
import Styles from './styles';

const makeStyles = (color, x, y) => {
	return {
		...Styles,
		background: color,
		top: `${y * BLOCK_SIZE}px`,
		left: `${x * BLOCK_SIZE}px`
	};
};

const Block = ({color, pieces}) => {
	let styles;

	return (
		<div>
			{
				pieces.map((piece, i) => {
					styles = makeStyles(color, piece.x, piece.y);
					return <div style={styles} key={i} ></div>
				})
			}
		</div>
	);
}

export default Block;
