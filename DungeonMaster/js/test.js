var dungeon = new Dungeon();
var newFloor = new Floor();
dungeon.floors.push(newFloor);
newFloor.addMonster(new Slime(1));
newFloor.monsters[0].rarity = 1.25;
newFloor.monsters[0].calcStats();
// newFloor.addMonster(new Slime(1));
// newFloor.addMonster(new Slime(1));
newFloor.addHero(new Newb(1));
newFloor.heroes[0].rarity = 1;
newFloor.heroes[0].calcStats();
dungeon.floors.forEach(function (floor) {
    floor.calcRating();
});
dungeon.addToReserves(new SkeletonArcher(1));
initDungeon(dungeon);
var mainLoop = setInterval(function () {
    dungeon.fight();
    updateDungeon(dungeon);
    dungeon.resetDamage();
}, 1000);
$('#open-market').click(function () {
    dungeon.market.marketModal(dungeon);
});
$('#stop').click(function () {
    clearInterval(mainLoop);
});
$('#modalTest').click(function () {
    showModal('dungeon-monsters');
});
$('#addSlime').click(function () {
    dungeon.addToReserves(new Slime(1));
});
$('#save').click(function () {
    Dungeon.saveGame(dungeon);
});
$('#load').click(function () {
    var oldGame = JSON.parse(Dungeon.loadGame());
    if (oldGame != null) {
        dungeon.market = oldGame.market;
        dungeon.floors = oldGame.floors;
        dungeon.gold = oldGame.gold;
        dungeon.reserves = oldGame.reserves;
        dungeon.calcRating();
        initDungeon(dungeon);
    }
});
// setTimeout(() => {
//   fight(thisDungeon);
//   updateDungeon(thisDungeon);
// }, 3000);
//# sourceMappingURL=test.js.map