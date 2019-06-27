/**
 * Clears the html dungeon and fills it as necessary. Use this when adding/changing units.
 */
function initDungeon(dungeon) {
    var hDungeon = $('dungeon');
    hDungeon.html('');
    for (var floorIndex = 0; floorIndex < dungeon.floors.length; floorIndex++) {
        var thisFloor = dungeon.floors[floorIndex];
        var newFloor_1 = document.createElement('div');
        newFloor_1.className = 'floor';
        newFloor_1.id = 'f' + floorIndex;
        hDungeon.append(newFloor_1);
        for (var monsterIndex = 0; monsterIndex < 3; monsterIndex++) {
            var thisMonster = thisFloor.monsters[monsterIndex];
            if (thisMonster != null) {
                var newMonster = document.createElement('div');
                newMonster.className = 'unit';
                newMonster.id = 'f' + floorIndex + 'm' + monsterIndex;
                var name_1 = makeHtml('name', thisMonster.name);
                newMonster.append(name_1);
                if (thisMonster.rarity == 1.25) {
                    name_1.style.color = 'green';
                }
                else if (thisMonster.rarity == 1.65) {
                    name_1.style.color = 'blue';
                }
                else if (thisMonster.rarity == 2) {
                    name_1.style.color = 'purple';
                }
                else if (thisMonster.rarity == 2.35) {
                    name_1.style.color = 'orange';
                }
                newMonster.append(makeHtml('class', thisMonster.class));
                newMonster.append(makeHtml('lvl', 'LVL ' + thisMonster.lvl));
                newMonster.append(makeHtml('hp', thisMonster.currentHp + ' / ' + thisMonster.maxHp));
                var hpBar = document.createElement('div');
                hpBar.className = 'bar';
                var hpVal = document.createElement('div');
                hpVal.className = 'progress';
                hpBar.append(hpVal);
                newMonster.append(hpBar);
                newMonster.append(makeHtml('damage', ''));
                newFloor_1.appendChild(newMonster);
            }
            else {
                var blank = document.createElement('div');
                blank.className = 'blank';
                newFloor_1.append(blank);
            }
        }
        var spacer = document.createElement('div');
        spacer.id = 'f' + floorIndex + 'space';
        spacer.className = 'spacer';
        spacer.innerHTML = '' + dungeon.floors[floorIndex].rating;
        newFloor_1.append(spacer);
        for (var heroIndex = 0; heroIndex < 3; heroIndex++) {
            var thisHero = thisFloor.heroes[heroIndex];
            if (thisHero != null) {
                var newHero = document.createElement('div');
                newHero.className = 'unit';
                newHero.id = 'f' + floorIndex + 'h' + heroIndex;
                var name_2 = makeHtml('name', thisHero.name);
                newHero.append(name_2);
                if (thisHero.rarity == 1.25) {
                    name_2.style.color = 'green';
                }
                else if (thisHero.rarity == 1.65) {
                    name_2.style.color = 'blue';
                }
                else if (thisHero.rarity == 2) {
                    name_2.style.color = 'purple';
                }
                else if (thisHero.rarity == 2.35) {
                    name_2.style.color = 'orange';
                }
                newHero.append(makeHtml('class', thisHero.class));
                newHero.append(makeHtml('lvl', 'LVL ' + thisHero.lvl));
                newHero.append(makeHtml('hp', thisHero.currentHp + ' / ' + thisHero.maxHp));
                var hpBar = document.createElement('div');
                hpBar.className = 'bar';
                var hpVal = document.createElement('div');
                hpVal.className = 'progress';
                hpBar.append(hpVal);
                newHero.append(hpBar);
                newHero.append(makeHtml('damage', ''));
                newFloor_1.append(newHero);
            }
            else {
                var blank = document.createElement('div');
                blank.className = 'blank';
                newFloor_1.append(blank);
            }
        }
    }
    updateResources(dungeon);
}
/**
 * Updates the current dungeon.
 */
function updateDungeon(dungeon) {
    for (var floorIndex = 0; floorIndex < dungeon.floors.length; floorIndex++) {
        var thisFloor = dungeon.floors[floorIndex];
        for (var monsterIndex = 0; monsterIndex < thisFloor.monsters.length; monsterIndex++) {
            var thisMonster = thisFloor.monsters[monsterIndex];
            var jQString = '#f' + floorIndex + 'm' + monsterIndex;
            $(jQString + ' hp').html(thisMonster.currentHp + ' / ' + thisMonster.maxHp);
            $(jQString + ' .progress').css('width', (thisMonster.currentHp * 100 / thisMonster.maxHp) + '%');
            $(jQString + ' damage').html('-' + thisMonster.recentDamage);
            if (thisMonster.recentDamage > 0) {
                $(jQString + ' damage').fadeIn(0);
                $(jQString + ' damage').css('color', 'red');
                $(jQString + ' damage').fadeOut(750);
            }
            else {
                $(jQString + ' damage').html('');
            }
        }
        for (var heroIndex = 0; heroIndex < thisFloor.heroes.length; heroIndex++) {
            var thisHero = thisFloor.heroes[heroIndex];
            var jQString = '#f' + floorIndex + 'h' + heroIndex;
            $(jQString + ' hp').html(thisHero.currentHp + ' / ' + thisHero.maxHp);
            $(jQString + ' .progress').css('width', (thisHero.currentHp * 100 / thisHero.maxHp) + '%');
            $(jQString + ' damage').html('-' + thisHero.recentDamage);
            if (thisHero.recentDamage > 0) {
                $(jQString + ' damage').fadeIn(0);
                $(jQString + ' damage').css('color', 'red');
                $(jQString + ' damage').fadeOut(750);
            }
            else {
                $(jQString + ' damage').html('');
            }
        }
    }
    updateResources(dungeon);
}
function updateMenuMonsters(dungeon) {
    $('monster-list').html('');
    dungeon.reserves.forEach(function (monster) {
        var newMonster = makeHtml('monster', '');
        newMonster.id = 'r' + dungeon.reserves.indexOf(monster);
        var name = makeHtml('div', monster.name);
        name.className = 'name';
        newMonster.append(name);
        var addButton = makeHtml('div', 'Add');
        addButton.className = 'button add-button';
        addButton.onclick = (function () {
            var floor;
            for (var i = 0; i < dungeon.floors.length; i++) {
                if (dungeon.floors[i].monsters.length < 3) {
                    floor = dungeon.floors[i];
                    break;
                }
            }
            if (floor == null) {
                dungeon.replaceMonsterModal(monster);
            }
            else {
                floor.addMonster(monster);
                floor.forceRespawn();
                dungeon.removeFromReserves(monster);
                dungeon.calcRating();
                updateMenuMonsters(dungeon);
                initDungeon(dungeon);
                dungeon.removeFromReserves(monster);
            }
        });
        newMonster.append(addButton);
        var sellButton = makeHtml('div', 'Sell ' + Math.round(monster.cost / 2) + 'g');
        sellButton.className = 'button sell-button';
        sellButton.onclick = (function () {
            dungeon.sellReservesMonster(monster);
            updateMenuMonsters(dungeon);
        });
        newMonster.append(makeHtml('div', 'LVL ' + monster.lvl + ' ' + monster.class));
        newMonster.append(makeHtml('div', monster.maxHp + ' HP / ' + monster.def + ' DEF'));
        newMonster.append(makeHtml('div', monster.atk + ' ATK'));
        newMonster.append(sellButton);
        $('monster-list').append(newMonster);
    });
}
function updateResources(dungeon) {
    $('gold').html(dungeon.gold + 'g');
}
//# sourceMappingURL=main.js.map