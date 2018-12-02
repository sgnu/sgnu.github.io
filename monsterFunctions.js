function slimeHP(lvl) {
    if (lvl == 0)
        return 0;
        
    return 10 + (5 * (lvl - 1));
}

function slimeATK(lvl) {
    if (lvl == 0)
        return 0;
        
    return 2 + (lvl - 1);
}

function slimeDEF(lvl) {
    if (lvl == 0)
        return 0;
        
    return Math.floor(0.5 * (lvl - 1));
}
