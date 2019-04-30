abstract class Monster implements Unit{
  lvl: number;
  maxHp: number;
  currentHP: number;
  def: number;
  atk: number;
  aggro: number;
  
  constructor(lvl: number) {
    this.lvl = lvl;
  }

  calcStats() {
    this.calcAggro();
    this.calcAtk();
    this.calcDef();
    this.calcHP();
  }

  calcAggro(): number {
    this.aggro = Math.floor(this.maxHp + (this.atk) / 4 + Math.pow(this.def, 1.5));
    return this.aggro;
  }

  calcHP(): number {
    this.maxHp = 1;
    return this.maxHp;
  }

  calcDef(): number {
    this.def = 1;
    return this.def;
  }

  calcAtk():number {
    this.atk = 1;
    return this.atk;
  }
  
  levelUp(): void {
    this.lvl++;
    this.calcStats();
  }
}

class Slime extends Monster {
  constructor(lvl: number) {
    super(lvl);
    this.calcStats();
  }

  calcStats(): void {
    this.calcHP();
    this.calcDef();
    this.calcAtk();
    this.calcAggro();
  }

  calcHP(): number {
    this.maxHp = 10 + 2 * (this.lvl - 1);
    return this.maxHp;
  }

  calcDef(): number {
    this.def = this.lvl;
    return this.def;
  }

  calcAtk():number {
    this.atk = this.lvl;
    return this.atk;
  }
}

class Rock extends Monster {
  constructor(lvl: number) {
    super(lvl);
    this.calcStats();
  }

  calcStats(): void {
    this.calcAtk();
    this.calcDef();
    this.calcHP();
    this.calcAggro();
  }

  calcAtk(): number {
    this.atk = Math.ceil(this.lvl / 2);
    return this.atk;
  }

  calcDef(): number {
    this.def = 2 * this.lvl;
    return this.def;
  }

  calcHP(): number {
    this.maxHp = 20 + (4 * (this.lvl - 1));
    return this.maxHp;
  }
}