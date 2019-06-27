var Floor = /** @class */ (function () {
    function Floor() {
        this.monsters = [];
        this.heroes = [];
        this.rating = 0;
    }
    Floor.prototype.calcRating = function () {
        var _this = this;
        this.rating = 0;
        this.monsters.forEach(function (monster) {
            _this.rating += Math.floor(Math.pow(monster.maxHp, 0.5) + (2 * monster.atk) + (monster.def / 4));
        });
        return this.rating;
    };
    Floor.prototype.addMonster = function (newMonster) {
        if (this.monsters.length < 3) {
            this.monsters.push(newMonster);
            this.calcRating();
            return newMonster;
        }
        else {
            return null;
        }
    };
    /**
     * Puts the monster at the index of the old monster and returns the old monster.
     */
    Floor.prototype.replaceMonster = function (newMonster, oldMonster) {
        console.log('removed monster');
        this.removeMonster(oldMonster);
        this.monsters.push(newMonster);
        console.log('added new monster');
        this.calcRating();
    };
    Floor.prototype.removeMonster = function (monster) {
        this.monsters = this.monsters.filter(function (element) {
            return element != monster;
        });
    };
    Floor.prototype.addHero = function (newHero) {
        if (this.heroes.length < 3) {
            this.heroes.push(newHero);
            return newHero;
        }
        else {
            return null;
        }
    };
    /**
     * @returns Positive if all heroes are dead, negative if monsters are, 0 otherwise.
     */
    Floor.prototype.checkSpawnVal = function () {
        var monsterHp = 0;
        var heroHp = 0;
        this.monsters.forEach(function (monster) {
            monsterHp += monster.currentHp;
        });
        this.heroes.forEach(function (hero) {
            heroHp += hero.currentHp;
        });
        if (heroHp == 0) {
            return 1;
        }
        if (monsterHp == 0) {
            return -1;
        }
        return 0;
    };
    /**
     * @returns amount of exp to award monsters.
     * @param spawnVal from checkSpawnVal().
     */
    Floor.prototype.respawn = function (spawnVal) {
        var _this = this;
        this.monsters.forEach(function (monster) {
            monster.currentHp = monster.maxHp;
        });
        this.heroes.forEach(function (hero) {
            if (spawnVal < 0) {
                if (hero.currentHp > 0) { //  Prevents dead enemies from respawning
                    hero.currentHp = Math.floor((hero.currentHp + hero.maxHp) / 2);
                }
            }
            else {
                _this.distributeExp();
                _this.heroes = [];
                for (var i = 0; i < _this.monsters.length; i++) {
                    _this.addHero(_this.chooseHero());
                }
            }
        });
        if (spawnVal > 0) {
            var totalHp_1 = 0;
            this.heroes.forEach(function (hero) {
                totalHp_1 += hero.maxHp;
            });
            return Math.floor(1.2 * (Math.pow(totalHp_1, 0.5)));
        }
        return 0;
    };
    /**
     * Refreshes all monsters and heroes. Used after changing monsters. Does not distribute exp.
     */
    Floor.prototype.forceRespawn = function () {
        this.monsters.forEach(function (monster) {
            monster.currentHp = monster.maxHp;
        });
        this.calcRating();
        this.heroes = [];
        for (var i = 0; i < this.monsters.length; i++) {
            this.addHero(this.chooseHero());
        }
    };
    /**
     * Chooses the heroes to spawn after all have been defeated.
     */
    Floor.prototype.chooseHero = function () {
        var spawnTable = [];
        var probTable = [];
        var minTable = [];
        var maxTable = [];
        if (this.rating < 40) {
            spawnTable = [Newb];
            probTable = [100];
            minTable = [1];
            maxTable = [2];
        }
        else if (this.rating < 70) {
            spawnTable = [Newb];
            probTable = [100];
            minTable = [2];
            maxTable = [6];
        }
        else if (this.rating < 100) {
            spawnTable = [Newb, Rookie];
            probTable = [80, 20];
            minTable = [4, 1];
            maxTable = [10, 5];
        }
        else {
            spawnTable = [Newb, Rookie];
            probTable = [50, 50];
            minTable = [10, 5];
            maxTable = [25, 12];
        }
        var target = getRandom(0, 100);
        var currentProb = 0;
        var i = 0;
        do {
            currentProb += probTable[i];
            i++;
        } while (currentProb < target);
        i--;
        var hero = new spawnTable[i](getRandom(minTable[i], maxTable[i] + 1));
        return hero;
    };
    Floor.prototype.distributeExp = function () {
        var heroHp = this.getAllHeroesHp();
        var exp = Math.floor(Math.pow(heroHp / 4, 1.2) / this.monsters.length);
        this.monsters.forEach(function (monster) {
            monster.gainExp(exp);
        });
        this.calcRating();
    };
    Floor.prototype.getAllHeroesHp = function () {
        var heroHp = 0;
        this.heroes.forEach(function (hero) {
            heroHp += hero.maxHp;
        });
        return heroHp;
    };
    return Floor;
}());
//# sourceMappingURL=Floor.js.map