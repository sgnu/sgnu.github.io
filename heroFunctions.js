function newbHP(lvl) {
	if (lvl == 0)
		return 0;

	return 10 + (3 * (lvl - 1));
}

function newbATK(lvl) {
	if (lvl == 0)
		return 0;

	return 1 + (lvl - 1);
}

function newbDEF(lvl) {
	if (lvl == 0)
		return 0;
		
	return Math.floor(0.25 * (lvl - 1));
}