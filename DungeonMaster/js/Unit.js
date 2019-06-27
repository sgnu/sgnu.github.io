var Unit = /** @class */ (function () {
    function Unit(lvl) {
        this.recentDamage = 0;
        this.lvl = lvl;
        var rarity = getRandom(0, 100);
        if (rarity < 85) {
            this.rarity = 1;
        }
        else if (rarity < 92) {
            this.rarity = 1.25;
        }
        else if (rarity < 96) {
            this.rarity = 1.65;
        }
        else if (rarity < 98) {
            this.rarity = 2;
        }
        else {
            this.rarity = 2.35;
        }
    }
    /**
     * Applies rarityCalc() to HP, ATK, and DEF.
     */
    Unit.prototype.rarityStats = function () {
        this.maxHp = this.rarityCalc(this.maxHp);
        this.currentHp = this.maxHp;
        this.atk = this.rarityCalc(this.atk);
        this.def = this.rarityCalc(this.def);
    };
    /**
     * Multiplies the stat by the unit's rarity and rounds it off.
     */
    Unit.prototype.rarityCalc = function (stat) {
        return Math.round(stat * this.rarity);
    };
    /**
     * Deals damage to the target unit.
     * Damage calculation is handled inside (damage = this.atk - (target.def / 2)).
     */
    Unit.prototype.inflictDamage = function (unit) {
        if (unit != null) {
            var damage = Math.round(this.atk - (unit.def / 2));
            damage = (damage < 0 ? 0 : damage); // If damage < 0, set it to 0, otherwise nothing changes
            unit.currentHp = (damage > unit.currentHp ? 0 : unit.currentHp - damage); // If damage > current hp, set current hp to 0, otherwise reduce current hp by damage
            unit.recentDamage += damage;
            return damage;
        }
        return 0;
    };
    Unit.prototype.calcAggro = function () {
        this.aggro = Math.floor(this.maxHp + (this.atk) / 4 + Math.pow(this.def, 1.5));
        return this.aggro;
    };
    return Unit;
}());
//# sourceMappingURL=Unit.js.map