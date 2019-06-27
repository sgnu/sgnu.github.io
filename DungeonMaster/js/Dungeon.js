var Dungeon = /** @class */ (function () {
    function Dungeon() {
        this.floors = [];
        this.reserves = [];
        this.market = new Market();
        this.gold = 0;
    }
    Dungeon.prototype.calcRating = function () {
        var _this = this;
        this.totalRating = 0;
        this.floors.forEach(function (floor) {
            _this.totalRating += floor.calcRating();
        });
    };
    Dungeon.prototype.fight = function () {
        var _this = this;
        this.floors.forEach(function (floor) {
            var spawnVal = floor.checkSpawnVal();
            if (spawnVal == 0) {
                floor.monsters.forEach(function (monster) {
                    if (monster.currentHp > 0) {
                        monster.inflictDamage(_this.findFightTarget(floor.heroes));
                    }
                });
                floor.heroes.forEach(function (hero) {
                    if (hero.currentHp > 0) {
                        hero.inflictDamage(_this.findFightTarget(floor.monsters));
                    }
                });
            }
            else {
                _this.gainGold(floor.respawn(spawnVal));
                _this.calcRating();
                initDungeon(_this);
            }
        });
    };
    Dungeon.prototype.addToReserves = function (monster) {
        this.reserves.push(monster);
        updateMenuMonsters(this);
    };
    Dungeon.prototype.removeFromReserves = function (monster) {
        this.reserves = this.reserves.filter(function (element) {
            return element != monster;
        });
    };
    Dungeon.prototype.sellReservesMonster = function (monster) {
        this.gainGold(Math.round(monster.cost / 2));
        this.removeFromReserves(monster);
    };
    /**
     * Finds a target unit to fight.
     */
    Dungeon.prototype.findFightTarget = function (units) {
        var totalAggro = 0;
        var currentAggro = 0;
        units.forEach(function (unit) {
            if (unit.currentHp > 0) {
                totalAggro += unit.aggro;
            }
        });
        var targetVal = getRandom(0, totalAggro);
        var targetUnit = null;
        var i = 0;
        do {
            if (units[i].currentHp > 0) {
                currentAggro += units[i].aggro;
                targetUnit = units[i];
            }
            i++;
        } while (currentAggro < targetVal);
        return targetUnit;
    };
    /**
     * Sets recent damage for all monsters and heroes to 0.
     */
    Dungeon.prototype.resetDamage = function () {
        this.floors.forEach(function (floor) {
            floor.monsters.forEach(function (monster) {
                monster.recentDamage = 0;
            });
            floor.heroes.forEach(function (hero) {
                hero.recentDamage = 0;
            });
        });
    };
    /**
     * Adds amount of gold to the dungeon; cannot be negative.
     */
    Dungeon.prototype.gainGold = function (amount) {
        if (amount < 0) {
            console.error('Entered negative amount in gainGold');
        }
        else {
            this.gold += amount;
        }
    };
    /**
     * Reduces amount of gold from the dungeon; cannot be negative.
     */
    Dungeon.prototype.spendGold = function (amount) {
        if (amount < 0) {
            console.error('Entered negative amount in spendGold');
        }
        else if (this.gold > amount) {
            this.gold -= amount;
        }
        else {
            console.error('Tried calling spendGold but amount is greater than current gold');
        }
    };
    /**
     * Opens a modal to replace one of the monsters in the dungeon with one from the reserves.
     */
    Dungeon.prototype.replaceMonsterModal = function (newMonster) {
        var _this = this;
        showModal('dungeon-monsters');
        // Clear the modal's content
        $('#dungeon-monsters .content').html('');
        this.floors.forEach(function (floor) {
            var htmlFloor = makeHtml('div', '');
            htmlFloor.className = 'floor';
            $('#dungeon-monsters .content').append(htmlFloor);
            var _loop_1 = function (i) {
                var monster = floor.monsters[i];
                var htmlMonster = makeHtml('div', '');
                htmlMonster.className = 'monster';
                htmlMonster.onclick = (function () {
                    if (monster == null) {
                        _this.removeFromReserves(newMonster);
                        floor.addMonster(newMonster);
                    }
                    else {
                        floor.replaceMonster(newMonster, monster);
                        var index = _this.reserves.indexOf(newMonster);
                        _this.reserves[index] = monster;
                    }
                    $('#dungeon-monsters .content').html('');
                    hideModal('dungeon-monsters');
                    floor.forceRespawn();
                    _this.calcRating();
                    updateMenuMonsters(_this);
                    initDungeon(_this);
                });
                if (monster == null) {
                    var empty = makeHtml('div', 'Empty');
                    empty.className = 'empty';
                    htmlMonster.append(empty);
                }
                else {
                    var name_1 = makeHtml('div', monster.name);
                    name_1.className = 'name';
                    if (monster.rarity == 1.25) {
                        name_1.style.color = 'green';
                    }
                    else if (monster.rarity == 1.65) {
                        name_1.style.color = 'blue';
                    }
                    else if (monster.rarity == 2) {
                        name_1.style.color = 'purple';
                    }
                    else if (monster.rarity == 2.35) {
                        name_1.style.color = 'orange';
                    }
                    htmlMonster.append(name_1);
                    htmlMonster.append(makeHtml('div', 'LVL ' + monster.lvl + ' ' + monster.class));
                    htmlMonster.append(makeHtml('div', monster.maxHp + ' HP / ' + monster.def + ' DEF'));
                    htmlMonster.append(makeHtml('div', monster.atk + ' ATK'));
                }
                htmlFloor.append(htmlMonster);
            };
            for (var i = 0; i < 3; i++) {
                _loop_1(i);
            }
        });
    };
    return Dungeon;
}());
//# sourceMappingURL=Dungeon.js.map