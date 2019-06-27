var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Monster = /** @class */ (function (_super) {
    __extends(Monster, _super);
    function Monster(lvl) {
        var _this = _super.call(this, lvl) || this;
        _this.expBase = 1.35;
        _this.exp = 0;
        return _this;
    }
    Monster.prototype.calcStats = function () {
        this.calcAtk();
        this.calcDef();
        this.calcHp();
        this.rarityStats();
        this.calcAggro();
        this.calcExp();
    };
    Monster.prototype.calcHp = function () {
        this.maxHp = 1;
        return this.maxHp;
    };
    Monster.prototype.calcDef = function () {
        this.def = 1;
        return this.def;
    };
    Monster.prototype.calcAtk = function () {
        this.atk = 1;
        return this.atk;
    };
    Monster.prototype.calcExp = function () {
        this.nextLevel = Math.round(this.expCoeff * Math.pow(this.expBase, this.lvl - 1));
        return this.nextLevel;
    };
    Monster.prototype.levelUp = function () {
        this.lvl++;
        this.calcStats();
    };
    Monster.prototype.gainExp = function (newExp) {
        this.exp += newExp;
        var remainder = this.exp - this.nextLevel;
        while (remainder >= 0) {
            this.levelUp();
            this.exp = remainder;
            remainder = this.exp - this.nextLevel;
        }
    };
    return Monster;
}(Unit));
var Slime = /** @class */ (function (_super) {
    __extends(Slime, _super);
    function Slime(lvl) {
        var _this = _super.call(this, lvl) || this;
        _this.expCoeff = 30;
        _this.cost = 20;
        _this.name = _this.generateName();
        _this.class = 'Slime';
        _this.calcStats();
        return _this;
    }
    Slime.prototype.generateName = function () {
        var names = ['Blorp', 'Burp', 'Boop'];
        return names[getRandom(0, names.length)];
    };
    Slime.prototype.calcStats = function () {
        this.calcHp();
        this.calcDef();
        this.calcAtk();
        this.rarityStats();
        this.calcAggro();
        this.calcExp();
    };
    Slime.prototype.calcHp = function () {
        this.maxHp = 10 + 2 * (this.lvl - 1);
        this.currentHp = this.maxHp;
        return this.maxHp;
    };
    Slime.prototype.calcDef = function () {
        this.def = this.lvl;
        return this.def;
    };
    Slime.prototype.calcAtk = function () {
        this.atk = 2 + this.lvl;
        return this.atk;
    };
    Slime.prototype.calcGold = function () {
        var baseGold = 10;
        var gold = baseGold + (this.lvl * 10);
        return gold;
    };
    return Slime;
}(Monster));
var Rock = /** @class */ (function (_super) {
    __extends(Rock, _super);
    function Rock(lvl) {
        var _this = _super.call(this, lvl) || this;
        _this.expCoeff = 37;
        _this.cost = 50;
        _this.name = _this.generateName();
        _this.class = 'Rock';
        _this.calcStats();
        return _this;
    }
    Rock.prototype.generateName = function () {
        var names = ['Stoney', 'Rockey', 'Graveley'];
        return names[getRandom(0, names.length)];
    };
    Rock.prototype.calcStats = function () {
        this.calcAtk();
        this.calcDef();
        this.calcHp();
        this.rarityStats();
        this.calcAggro();
        this.calcExp();
    };
    Rock.prototype.calcAtk = function () {
        this.atk = Math.ceil(this.lvl / 2);
        return this.atk;
    };
    Rock.prototype.calcDef = function () {
        this.def = 2 * this.lvl;
        return this.def;
    };
    Rock.prototype.calcHp = function () {
        this.maxHp = 20 + (4 * (this.lvl - 1));
        this.currentHp = this.maxHp;
        return this.maxHp;
    };
    return Rock;
}(Monster));
var SkeletonArcher = /** @class */ (function (_super) {
    __extends(SkeletonArcher, _super);
    function SkeletonArcher(lvl) {
        var _this = _super.call(this, lvl) || this;
        _this.expCoeff = 50;
        _this.cost = 150;
        _this.name = _this.generateName();
        _this.class = 'Skeleton Archer';
        _this.calcStats();
        return _this;
    }
    SkeletonArcher.prototype.generateName = function () {
        var names = ['Boney', 'Click', 'Volk'];
        return names[getRandom(0, names.length)];
    };
    SkeletonArcher.prototype.calcStats = function () {
        this.calcAtk();
        this.calcDef();
        this.calcHp();
        this.rarityStats();
        this.calcAggro();
        this.calcExp();
    };
    SkeletonArcher.prototype.calcAtk = function () {
        this.atk = Math.round(this.lvl + 10 - 8 * (1 / this.lvl));
        return this.atk;
    };
    SkeletonArcher.prototype.calcDef = function () {
        this.def = this.lvl;
        return this.def;
    };
    SkeletonArcher.prototype.calcHp = function () {
        this.maxHp = 15 + (2 * (this.lvl - 1));
        this.currentHp = this.maxHp;
        return this.maxHp;
    };
    return SkeletonArcher;
}(Monster));
//# sourceMappingURL=Monster.js.map