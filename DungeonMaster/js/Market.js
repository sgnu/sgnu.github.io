var Market = /** @class */ (function () {
    function Market() {
        this.classes = [Slime];
        this.maxStock = 3;
        this.restockDate = new Date();
        this.restock();
    }
    Market.prototype.restock = function () {
        this.stock = [];
        for (var i = 0; i < this.maxStock; i++) {
            this.stock.push(new this.classes[getRandom(0, this.classes.length)](1));
        }
        if (new Date() >= this.restockDate) {
            this.restockDate = new Date();
            this.restockDate.setMinutes(this.restockDate.getMinutes() + 29);
        }
    };
    /**
     * Enables purchasing of a new monster class.
     */
    Market.prototype.unlock = function (monsterClass) {
        if (this.classes.indexOf(monsterClass) == -1) {
            this.classes.push(monsterClass);
        }
    };
    /**
     * Opens the modal to buy monsters.
     */
    Market.prototype.marketModal = function (dungeon) {
        var _this = this;
        showModal('market');
        $('#market .content').html('');
        $('#market .content').append(makeHtml('div', ''));
        var refreshContainer = makeHtml('div', '');
        refreshContainer.id = 'refresh-container';
        var refreshTimer = makeHtml('div', '');
        refreshTimer.id = 'refresh-timer';
        var timerFunc = function () {
            var currentDate = new Date();
            var difference = _this.restockDate.getTime() - currentDate.getTime(); //  Difference in milliseconds
            if (difference <= 0) {
                $('#refresh-timer').html('Free refresh available now');
                $('#refresh-button').removeClass('disabled').addClass('enabled');
                clearInterval(timer);
            }
            else {
                var hours = Math.round(difference / (1000 * 60 * 60));
                difference = difference % (1000 * 60 * 60);
                var minutes = Math.round(difference / (1000 * 60));
                difference = difference % (1000 * 60);
                var seconds = Math.round(difference / 1000);
                $('#refresh-timer').html('Free refresh in ' + hours + ':' + minutes + ':' + seconds);
                $('#refresh-button').addClass('disabled');
            }
        };
        var timer = setInterval(timerFunc, 1000);
        $('#market .close').click(function () {
            hideModal('market');
            clearInterval(timer);
        });
        var refreshButton = makeHtml('div', 'Refresh');
        refreshButton.className = 'disabled';
        refreshButton.id = 'refresh-button';
        refreshButton.onclick = function () {
            if (new Date() >= _this.restockDate) {
                _this.restock();
                _this.marketModal(dungeon);
            }
        };
        refreshContainer.append(refreshTimer);
        refreshContainer.append(refreshButton);
        $('#market .content').append(refreshContainer);
        this.stock.forEach(function (monster) {
            var html = makeHtml('div', '');
            html.className = 'monster';
            html.onclick = function () {
                if (dungeon.gold >= monster.cost) {
                    dungeon.spendGold(monster.cost);
                    dungeon.addToReserves(monster);
                    _this.stock = _this.stock.filter(function (element) {
                        return element != monster;
                    });
                    _this.marketModal(dungeon);
                }
            };
            var name = makeHtml('div', monster.name);
            name.className = 'name';
            if (monster.rarity == 1.25) {
                name.style.color = 'green';
            }
            else if (monster.rarity == 1.65) {
                name.style.color = 'blue';
            }
            else if (monster.rarity == 2) {
                name.style.color = 'purple';
            }
            else if (monster.rarity == 2.35) {
                name.style.color = 'orange';
            }
            html.append(name);
            html.append(makeHtml('div', 'LVL ' + monster.lvl + ' ' + monster.class));
            html.append(makeHtml('div', monster.maxHp + ' HP / ' + monster.def + ' DEF'));
            html.append(makeHtml('div', monster.atk + ' ATK'));
            html.append(makeHtml('div', monster.cost + 'g'));
            $('#market .content').append(html);
        });
    };
    return Market;
}());
//# sourceMappingURL=Market.js.map