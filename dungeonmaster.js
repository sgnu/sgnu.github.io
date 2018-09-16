// TODO: Implement page system for right side
// TODO: Implement level system for monsters and heroes
// TODO: Implement upgrade system

var dungeon = {
    gold : 10,
    exp : 0,
    material : 0
}

var floor1 = {
    monsters : {
        0 : {
            name : "Slime",
            HP : 5,
            ATK : 2,
            DEF : 0
        },
        1 : {
            name: "Slime",
            HP : 5,
            ATK : 2,
            DEF : 0
        },
        2 : {
            name: "Slime",
            HP : 5,
            ATK : 2,
            DEF : 0
        }
    },
    totalMonstersHP : 0,
    currentMonstersHP : 0,
    totalMonstersATK : 0,
    totalMonstersDEF : 0,

    heroes : {
        0 : {
            name: "Newb",
            HP : 10,
            ATK : 1,
            DEF: 1
        },
        1 : {
            name: "Newb",
            HP : 10,
            ATK : 1,
            DEF: 1
        },
        2 : {
            name: "Newb",
            HP : 10,
            ATK : 1,
            DEF: 1
        }
    },
    totalHeroesHP : 0,
    currentHeroesHP: 0,
    totalHeroesATK: 0,
    totalHeroesDEF: 0,
}

$(document).ready(initialize());

console.log(floor1.monsters[0]);

            //  --  Primary functions   --

function main() {
    fight();
    updateHTML();
    setTimeout(function() {main()}, 3000);
}

function initialize() {
    updateStats();

    main();
}

    //  Combat functions

function fight() {
    if (floor1.currentHeroesHP <= 0) {
        floor1.currentMonstersHP = floor1.totalMonstersHP;
        floor1.currentHeroesHP = floor1.totalHeroesHP;
        heroesDeath();
    } else if (floor1.currentMonstersHP <= 0) {
        $("#floor1-hdamage").text("+" + formatNumber(Math.ceil(0.25 * (floor1.totalHeroesHP - floor1.currentHeroesHP))));

        floor1.currentMonstersHP = floor1.totalMonstersHP;
        floor1.currentHeroesHP += Math.ceil(0.25 * (floor1.totalHeroesHP - floor1.currentHeroesHP));

        $("#floor1-hdamage").css("left", $("#floor1-text").position().left + $("#floor1-text").width() + 100 + $("#floor1-hdamage").width() + "px");
        $("#floor1-hdamage").css("color", "#00ff00");
        displayPopup("#floor1-hdamage");
    } else {
        floor1.currentMonstersHP -= damageCalculation(floor1.totalHeroesATK, floor1.totalMonstersDEF);
        floor1.currentHeroesHP -= damageCalculation(floor1.totalMonstersATK, floor1.totalHeroesDEF);

        $("#floor1-mdamage").text("-" + formatNumber(damageCalculation(floor1.totalHeroesATK, floor1.totalMonstersDEF)));
        $("#floor1-hdamage").text("-" + formatNumber(damageCalculation(floor1.totalMonstersATK, floor1.totalHeroesDEF)));
        $("#floor1-mdamage").css("left", $("#floor1-text").position().left - (100 + $("#floor1-mdamage").width()) + "px");
        $("#floor1-hdamage").css("left", $("#floor1-text").position().left + $("#floor1-text").width() + 100 + $("#floor1-hdamage").width() + "px");
        $("#floor1-hdamage").css("color", "#ffffff");
        displayPopup("#floor1-mdamage");
        displayPopup("#floor1-hdamage");
    }
}

function heroesDeath() {
    var gold = calculateGold();
    var exp = calculateEXP();
    var mat = calculateMat();

    dungeon.gold += randomize(0.9 * gold, 1.1 * gold);
    dungeon.exp += randomize(0.9 * exp, 1.1 * exp);
    dungeon.material += randomize(0.9 * mat, 1.1 * mat);
}

    //  Update() functions


function updateHTML() {
    updateResources();
    updateFloors();
}

function updateResources() {
    $("#gold").text(formatNumber(dungeon.gold) + " Gold");
    $("#exp").text(formatNumber(dungeon.exp) + " EXP");
    $("#material").text(formatNumber(dungeon.material) + " Mat");
}

function updateStats() {
    for (i = 0; i < 3; i++) {
        floor1.totalMonstersHP += floor1.monsters[i].HP;
        floor1.totalHeroesHP += floor1.heroes[i].HP;
        floor1.totalMonstersATK += floor1.monsters[i].ATK;
        floor1.totalHeroesATK += floor1.heroes[i].ATK;
        floor1.totalMonstersDEF += floor1.monsters[i].DEF;
        floor1.totalHeroesDEF += floor1.heroes[i].DEF;
    }

    if (floor1.currentMonstersHP == 0) {
        floor1.currentMonstersHP = floor1.totalMonstersHP;
    }

    if (floor1.currentHeroesHP == 0) {
        floor1.currentHeroesHP = floor1.totalHeroesHP;
    }

    if (floor1.currentMonstersATK == 0) {
        floor1.currentMonstersATK = floor1.totalMonstersATK;
    }

    if (floor1.currentHeroesATK == 0) {
        floor1.currentHeroesATK = floor1.totalHeroesATK;
    }

    if (floor1.currentMonstersDEF == 0) {
        floor1.currentMonstersDEF = floor1.totalMonstersDEF;
    }

    if (floor1.currentHeroesDEF == 0) {
        floor1.currentHeroesDEF = floor1.totalHeroesDEF;
    }
}

function updateFloors() {
        //  Update monsters and heroes names
    for (i = 0; i < 3; i++) {
        $("#monster1-" + (i + 1)).text(floor1.monsters[i].name);
        $("#hero1-" + (i + 1)).text(floor1.heroes[i].name);
    }
        //  Update center
    var monsterside = formatNumber(floor1.currentMonstersHP);
    var heroside = formatNumber(floor1.currentHeroesHP);
    if (floor1.currentHeroesHP <= 0) {
        heroside = "Dead";
    }

    if (floor1.currentMonstersHP <= 0) {
        monsterside = "Dead";
    }

    $("#floor1-text").text(monsterside + " - " + heroside);
}


            //  --  Secondary functions --

function calculateGold() {
    return Math.floor(floor1.totalHeroesHP + (2 * floor1.totalHeroesATK) + (floor1.totalHeroesDEF * floor1.totalHeroesDEF));
}

function calculateEXP() {
    return Math.floor(Math.sqrt(floor1.totalHeroesHP + (2 * floor1.totalHeroesATK) + (floor1.totalHeroesDEF * floor1.totalHeroesDEF)));
}

function calculateMat() {
    return Math.floor(Math.sqrt(floor1.totalHeroesHP + (2 * floor1.totalHeroesATK) + (floor1.totalHeroesDEF * floor1.totalHeroesDEF)));
}

function displayPopup(id) {
    $(id).fadeIn(10, "linear");
    $(id).fadeOut(980);
}

function damageCalculation(attack, targetDefense) {
    if (targetDefense >= 2 * attack) {
        return 0;
    }

    return Math.ceil(attack - (targetDefense / 2));
}

function formatNumber(input) {
    var suffix = ["", "K", "M", "B", "T"];
    var index = 0;
    var inputAsString = "" + input;
    var retval = input;

    if (input > 99999) {
        index++;
        retval /= 1000;

        while ((retval / 1000) >= 1) {
            index++;
            retval /= 1000;
        }
        retval = "" + retval;

        return retval.substring(0, 5) + suffix[index];

    } else if (input > 1000) {
        retval = "" + retval;
        retval = retval.replace(/\d{3}$/, "");
        retval = retval + "," + inputAsString.match(/\d{3}$/);
        return retval;
    }

    return input;
}

function randomize(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
