
export const handleKeyDown = (event, frame) => {
    switch (event.key) {
        case "ArrowDown":
			frame.direction = 'DOWN';
			break;
        case "ArrowUp":
            frame.direction = 'UP';
            break;
		case "ArrowLeft":
            frame.direction = 'LEFT';
            break;
        case "ArrowRight":
            frame.direction = 'RIGHT';
            break;
        case "Enter":
            frame.pause = !frame.pause;
            break;
        case "Escape":
            // Do something for "esc" key press.
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }
};

export const handleKeyUp = (event, frame) => {
	if(event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "ArrowLeft" || event.key === "ArrowRight"){
		frame.direction = undefined;
		console.log(frame.direction);
	}
};
