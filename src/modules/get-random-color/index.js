const rand256 = () => {
	return Math.floor(Math.random() * 255);
};

const shuffle = (arr) => {
	for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
};

const randColor = () => {
	// Shuffle the rgb to decide which should hold the top of the randRange
	// which should hold the bottom and which should be variant.
	let color = shuffle([0,rand256(),255]);

	return `rgb(${color[0]},${color[1]},${color[2]})`;
};

export default () => randColor();
