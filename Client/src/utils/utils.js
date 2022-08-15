export function higherRating(array) {
	let arrayOrder = [...array];
	return arrayOrder.sort((a, b) => {
		if (a.rating.$numberDecimal < b.rating.$numberDecimal) {
			return 1;
		} else return -1;
	});
}

export function lowerRating(array) {
	let arrayOrder = [...array];
	return arrayOrder.sort((a, b) => {
		if (a.rating.$numberDecimal > b.rating.$numberDecimal) {
			return 1;
		} else return -1;
	});
}

export function selectPosition(array, position) {
	return array.filter(
		(player) => player.position.toLowerCase() === position.toLowerCase()
	);
}

export function selectElo(array, elo) {
	return array.filter(
		(player) => player.elo.toLowerCase() === elo.toLowerCase()
	);
}
