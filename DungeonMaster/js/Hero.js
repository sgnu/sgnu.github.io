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
var Hero = /** @class */ (function (_super) {
    __extends(Hero, _super);
    function Hero(lvl) {
        return _super.call(this, lvl) || this;
    }
    Hero.prototype.calcStats = function () {
        this.calcHp();
        this.calcDef();
        this.calcAtk();
        this.calcAggro();
    };
    Hero.prototype.calcHp = function () {
        this.maxHp = 1;
        this.currentHp = this.maxHp;
        return this.maxHp;
    };
    Hero.prototype.calcDef = function () {
        this.def = 1;
        return this.def;
    };
    Hero.prototype.calcAtk = function () {
        this.atk = 1;
        return this.atk;
    };
    return Hero;
}(Unit));
var Newb = /** @class */ (function (_super) {
    __extends(Newb, _super);
    function Newb(lvl) {
        var _this = _super.call(this, lvl) || this;
        _this.name = _this.generateNames();
        _this.class = 'Newb';
        _this.calcStats();
        return _this;
    }
    Newb.prototype.generateNames = function () {
        var names = ['Igor', 'Igetthe', 'Alof'];
        return names[getRandom(0, names.length)];
    };
    Newb.prototype.calcStats = function () {
        this.calcHp();
        this.calcDef();
        this.calcAtk();
        this.rarityStats();
        this.calcAggro();
    };
    Newb.prototype.calcHp = function () {
        this.maxHp = 10 + this.lvl - 1;
        this.currentHp = this.maxHp;
        return this.maxHp;
    };
    Newb.prototype.calcDef = function () {
        this.def = this.lvl / 4;
        return this.def;
    };
    Newb.prototype.calcAtk = function () {
        this.atk = 1 + this.lvl;
        return this.atk;
    };
    return Newb;
}(Hero));
var Rookie = /** @class */ (function (_super) {
    __extends(Rookie, _super);
    function Rookie(lvl) {
        var _this = _super.call(this, lvl) || this;
        _this.name = _this.generateName();
        _this.class = 'Rookie';
        _this.calcStats();
        return _this;
    }
    Rookie.prototype.generateName = function () {
        var names = ['Vlad', 'Demp', 'Greg'];
        return names[getRandom(0, names.length)];
    };
    Rookie.prototype.calcStats = function () {
        this.calcHp();
        this.calcDef();
        this.calcAtk();
        this.rarityStats();
        this.calcAggro();
    };
    Rookie.prototype.calcHp = function () {
        this.maxHp = 20 + 4 * (this.lvl - 1);
        this.currentHp = this.maxHp;
        return this.maxHp;
    };
    Rookie.prototype.calcDef = function () {
        this.def = 5 + Math.floor(this.lvl / 4);
        return this.def;
    };
    Rookie.prototype.calcAtk = function () {
        this.atk = 5 + this.lvl;
        return this.atk;
    };
    return Rookie;
}(Hero));
//# sourceMappingURL=Hero.js.map