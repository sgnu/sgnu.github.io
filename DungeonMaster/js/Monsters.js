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
var Monster = /** @class */ (function () {
    function Monster(lvl) {
        this.lvl = lvl;
    }
    Monster.prototype.calcStats = function () {
        this.calcAggro();
        this.calcAtk();
        this.calcDef();
        this.calcHP();
    };
    Monster.prototype.calcAggro = function () {
        this.aggro = Math.floor(this.maxHp + (this.atk) / 4 + Math.pow(this.def, 1.5));
        return this.aggro;
    };
    Monster.prototype.calcHP = function () {
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
    Monster.prototype.levelUp = function () {
        this.lvl++;
        this.calcStats();
    };
    return Monster;
}());
var Slime = /** @class */ (function (_super) {
    __extends(Slime, _super);
    function Slime(lvl) {
        var _this = _super.call(this, lvl) || this;
        _this.calcStats();
        return _this;
    }
    Slime.prototype.calcStats = function () {
        this.calcHP();
        this.calcDef();
        this.calcAtk();
        this.calcAggro();
    };
    Slime.prototype.calcHP = function () {
        this.maxHp = 10 + 2 * (this.lvl - 1);
        return this.maxHp;
    };
    Slime.prototype.calcDef = function () {
        this.def = this.lvl;
        return this.def;
    };
    Slime.prototype.calcAtk = function () {
        this.atk = this.lvl;
        return this.atk;
    };
    return Slime;
}(Monster));
var Rock = /** @class */ (function (_super) {
    __extends(Rock, _super);
    function Rock(lvl) {
        var _this = _super.call(this, lvl) || this;
        _this.calcStats();
        return _this;
    }
    Rock.prototype.calcStats = function () {
        this.calcAtk();
        this.calcDef();
        this.calcHP();
        this.calcAggro();
    };
    Rock.prototype.calcAtk = function () {
        this.atk = Math.ceil(this.lvl / 2);
        return this.atk;
    };
    Rock.prototype.calcDef = function () {
        this.def = 2 * this.lvl;
        return this.def;
    };
    Rock.prototype.calcHP = function () {
        this.maxHp = 20 + (4 * this.lvl);
        return this.maxHp;
    };
    return Rock;
}(Monster));
