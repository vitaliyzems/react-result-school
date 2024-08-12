import { WIN_PATTERNS } from '../constants';

export const checkVictory = (field) => {
	for (let pattern of WIN_PATTERNS) {
		if (
			pattern.every((idx) => field[idx] === 'X') ||
			pattern.every((idx) => field[idx] === 'O')
		) {
			return true;
		}
	}
	return false;
};
