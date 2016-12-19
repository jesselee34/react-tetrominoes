import {SHAPES} from '../../constants';
import getRandomColor from '../get-random-color';

const shapes = [
	{
		key: 'L',
		pieces: [
			{x: 0, y: 0},{x: 0, y: 1},{x: 0, y: 2},{x: 1, y: 2}
		]
	},
	{
		key: 'J',
		pieces: [
			{x: 1, y: 0},{x: 1, y: 1},{x: 1, y: 2},{x: 0, y: 2}
		]
	},
	{
		key: 'T',
		pieces: [
			{x: 0, y: 0},{x: 1, y: 0},{x: 2, y: 0},{x: 1, y: 1}
		]
	},
	{
		key: 'Z',
		pieces: [
			{x: 0, y: 0},{x: 1, y: 0},{x: 1, y: 1},{x: 2, y: 1}
		]
	},
	{
		key: 'S',
		pieces: [
			{x: 1, y: 0},{x: 2, y: 0},{x: 0, y: 1},{x: 1, y: 1}
		]
	},
	{
		key: 'I',
		pieces: [
			{x: 0, y: 0},{x: 0, y: 1},{x: 0, y: 2},{x: 0, y: 3}
		]
	},
	{
		key: 'O',
		pieces: [
			{x: 0, y: 0},{x: 1, y: 0},{x: 0, y: 1},{x: 1, y: 1}
		]
	}
];

export const makeShape = (shapeID) => {
	let shape = shapes.find(s => s.key === shapeID);

	return shape.pieces.map(p => ({x: p.x, y: p.y}));
};

export const getRandomShape = () => {
	return SHAPES[Math.floor(Math.random() * SHAPES.length)];
};

export const createBlock = (x,y) => {
	let shape = getRandomShape();

	return {
		shape,
		x,y,
		color: getRandomColor(),
		pieces: makeShape(shape)
	};
};

export const addBlock = (block, blocks) => {
	return [
		block,
		...blocks
	];
}
