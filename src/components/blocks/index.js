import React from 'react';
import {connect} from 'react-redux';
import Block from '../block';

const Blocks = ({looseBlock, blocks}) => {
	let styles;
	console.log('rendered');
	return (
		<div>
			{
				looseBlock !== undefined ? <Block {...looseBlock} /> : null
			}
			{
				blocks.map(block => {
					return <Block {...block} />
				})
			}
		</div>
	);
}

const mapper = (state) => {
	return {
		looseBlock: state.looseBlock,
		blocks: state.blocks
	};
};

export default connect(mapper)(Blocks);
