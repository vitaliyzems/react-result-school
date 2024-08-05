export const debounse = (cb, delay) => {
	let timerId;

	return (...args) => {
		clearTimeout(timerId);
		timerId = setTimeout(cb, delay, args);
	};
};
