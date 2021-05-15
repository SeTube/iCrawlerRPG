var Monsters = function() {
    var inBossBattle = false;
    var monsterList = [
        //First Tier
        {name:"老鼠", killed:0},
        {name:"蝙蝠", killed:0},
        {name:"史莱姆", killed:0},
        {name:"地精", killed:0},
        {name:"狼", killed:0},
        {name:"蜥蜴", killed:0},
        {name:"哥布林", killed:0},
        {name:"强盗", killed:0},
        {name:"蜘蛛", killed:0},
        {name:"老鹰", killed:0},

        //Second Tier
        {name:"熊", killed:0},
        {name:"蛇", killed:0},
        {name:"巨魔", killed:0},
        {name:"地精战士", killed:0},
        {name:"巨狼", killed:0},
        {name:"食尸鬼", killed:0},
        {name:"短吻鳄", killed:0},
        {name:"巨蜥蜴", killed:0},
        {name:"巨鼠", killed: 0},
        {name:"幼年兽人", killed:0},

        //Third Tier
        {name: "石巨人", killed: 0},
        {name: "次元素", killed: 0},
        {name: "地精酋长", killed: 0},
        {name: "虚弱牛头怪", killed: 0},
        {name: "巨魔战士", killed: 0},
        {name: "小精灵", killed: 0},
        {name: "幼龙", killed: 0},
        {name: "哥布林萨满", killed: 0},
        {name: "巨蛇", killed: 0},
        {name: "木乃伊", killed: 0},

        //Fourth Tier
        {name: "元素", killed: 0},
        {name: "小顽童", killed: 0},
        {name: "蜥蜴人", killed: 0},
        {name: "兽人", killed: 0},
        {name: "巨魔酋长", killed: 0},
        {name: "牛头人", killed: 0},
        {name: "青年吸血鬼", killed: 0},
        {name: "鸟身女妖", killed: 0},
        {name: "授首小精灵", killed: 0},
        {name: "远古木乃伊", killed: 0},

        //Fifth Tier
        {name: "顽童", killed: 0},
        {name: "兽人士兵", killed: 0},
        {name: "青年牛头人", killed: 0},
        {name: "漂浮之眼", killed: 0},
        {name: "女鬼", killed: 0},
        {name: "青年巨龙", killed: 0},
        {name: "独眼巨人战士", killed: 0},
        {name: "蜥蜴人射手", killed: 0},
        {name: "铠甲亡灵", killed: 0},
        {name: "疯狂哥布林", killed: 0}
    ];

    var bossList = [
        {name: "第一位守护者, 六出花", currentHealth: 91204, maximumHealth: 91204, strength: 151, dexterity: 151, constitution: 151, status: 0},
        {name: "第二位守护者, 十字花", currentHealth: 372100, maximumHealth: 372100, strength: 305, dexterity: 305, constitution: 305, status: 0},
        {name: "第三位守护者, 山字草", currentHealth: 864900, maximumHealth: 864900, strength: 465, dexterity: 465, constitution: 465, status: 0},
        {name: "第四位守护者, 石竹", currentHealth: 1638400, maximumHealth: 1638400, strength: 640, dexterity: 640, constitution: 640, status: 0},
        {name: "第五位守护者, 飞蓬", currentHealth: 2930944, maximumHealth: 2930944, strength: 856, dexterity: 856, constitution: 856, status: 0}
    ];

    var instancedMonster = {
        name: "",
        currentHealth: 0,
        maximumHealth: 0,
        strength: 0,
        dexterity: 0,
        constitution: 0,
        status: 0
    };

    var self = this;
    //Save Method
    self.save = function() {
        var monstersSave = {
            savedMonsterList: monsterList,
            savedInstancedMonster: instancedMonster,
            savedInBossBattle: inBossBattle
        };
        localStorage.setItem("monstersSave",JSON.stringify(monstersSave));
    };

    //Load Method
    self.load = function() {
        var monstersSave = JSON.parse(localStorage.getItem("monstersSave"));
        if (monstersSave) {
            if (monstersSave.savedMonsterList !== undefined) {
                loadMonsterList(monstersSave.savedMonsterList);
            }
            if (monstersSave.savedInstancedMonster !== undefined) {
                loadInstancedMonster(monstersSave.savedInstancedMonster);
            }
            if (monstersSave.savedInBossBattle !== undefined) {
                inBossBattle = monstersSave.savedInBossBattle;
            }
        }
    };

    var loadMonsterList = function(savedMonsterList) {
        for (var i = 0; i < savedMonsterList.length; i++) {
            if (i == monsterList.length) {
                break;
            }
            if (savedMonsterList[i].killed !== undefined) {
                monsterList[i].killed = savedMonsterList[i].killed;
            }
        }
    };

    var loadInstancedMonster = function(savedInstancedMonster) {
        if (savedInstancedMonster.name !== undefined) {
            instancedMonster.name = savedInstancedMonster.name;
        }
        if (savedInstancedMonster.currentHealth !== undefined) {
            instancedMonster.currentHealth = savedInstancedMonster.currentHealth;
        }
        if (savedInstancedMonster.maximumHealth !== undefined) {
            instancedMonster.maximumHealth = savedInstancedMonster.maximumHealth;
        }
        if (savedInstancedMonster.strength !== undefined) {
            instancedMonster.strength = savedInstancedMonster.strength;
        }
        if (savedInstancedMonster.dexterity !== undefined) {
            instancedMonster.dexterity = savedInstancedMonster.dexterity;
        }
        if (savedInstancedMonster.constitution !== undefined) {
            instancedMonster.constitution = savedInstancedMonster.constitution;
        }
        if (savedInstancedMonster.status !== undefined) {
            instancedMonster.status = savedInstancedMonster.status;
        }
    };

    //Getters
    self.getMonsterList = function() {
        return monsterList;
    };

    self.getInstancedMonster = function() {
        return instancedMonster;
    };

    self.getBossMonster = function(number) {
        return bossList[number];
    };

    self.getInBossBattle = function() {
        return inBossBattle;
    };

    //Setters
    self.setInstancedMonster = function(updatedMonster) {
        instancedMonster = updatedMonster;
    };

    self.setInBossBattle = function(boolean) {
        inBossBattle = boolean;
    };

    //Other Methods
    self.attackMelee = function() {
        if(player.getInBattle()) {
            self.battle(instancedMonster, false);
        }
    };

    self.loadMonsterInfo = function(monster) {
        if (monster !== undefined) {
            document.getElementById("monstername").innerHTML = monster.name;
            document.getElementById("monsterhp").innerHTML = Math.round(monster.currentHealth);
            document.getElementById("monsterstr").innerHTML = monster.strength;
            document.getElementById("monsterdex").innerHTML = monster.dexterity;
            document.getElementById("monstercon").innerHTML = monster.constitution;
            document.getElementById("monsterbar").style.width = 100*(monster.currentHealth/monster.maximumHealth) + "%";
            if (!inBossBattle) {
                document.getElementById("combatlog").innerHTML = "你被 " + monster.name + " 攻击了!<br>";
            }
            else {
                document.getElementById("combatlog").innerHTML = "你挑战本层迷宫BOSS! 你开始与 " + monster.name + " 展开殊死搏斗!<br>";
            }
            player.setInBattle(true);
        }
        else {
            document.getElementById("monstername").innerHTML = "无";
            document.getElementById("monsterhp").innerHTML = "0";
            document.getElementById("monsterstr").innerHTML = "0";
            document.getElementById("monsterdex").innerHTML = "0";
            document.getElementById("monstercon").innerHTML = "0";
            document.getElementById("monsterbar").style.width = "0%";
        }
    };

    self.battle = function(monster, spellCast) {
        if(!player.getInBattle()) {
            player.setInBattle(true);
            player.loadRestButton();
            player.loadExploreButton();
            self.loadMonsterInfo(monster);
            if (buffs.getCastFireballInBattle()) {
                spells.castSpell("fireball");
            }
        }
        else {
            var isDead = false;
            if (!spellCast) {
                document.getElementById("combatlog").innerHTML = '';
                if (buffs.getCastCureInBattle() && player.getHealthCurrentValue() <= player.getHealthMaximumValue()/2) {
                    if (!spells.castSpell("cure")) {
                        isDead = playerAttacks(monster);
                    }
                    else {
                        buffs.updateTemporaryBuffs(true);
                        return true;
                    }
                }
                else {
                    isDead = playerAttacks(monster);
                }
            }
            if (!isDead) {
                isDead = monsterAttacks(monster);
            }
        }
        buffs.updateTemporaryBuffs(true);
    };

    var playerAttacks = function(monster) {
        var damage = damageFormula(player.getStrengthLevel() + player.getStrengthBonus(), player.getDexterityLevel() + player.getDexterityBonus(), monster.constitution, monster.currentHealth);
        if (buffs.getRageTimeLeft() !== 0) {
            damage *= 5;
        }
        if (damage >= monster.currentHealth) {
            damage = monster.currentHealth;
        }
        document.getElementById("combatlog").innerHTML += "你对 " + monster.name + " 造成 " + Math.round(damage) + " 伤害.<br>";
        player.gainExperience(monster, true);
        return self.monsterTakeDamage(monster, damage);
    };

    self.monsterTakeDamage = function(monster, damage) {
        monster.currentHealth -= damage;
        document.getElementById("monsterhp").innerHTML = Math.floor(monster.currentHealth);
        document.getElementById("monsterbar").style.width = 100*(monster.currentHealth/monster.maximumHealth) + "%";
        if (monster.currentHealth <= 0) {
            monsterDeath(monster);
            return true;
        }
        return false;
    };

    var monsterDeath = function(monster) {
        player.setInBattle(false);
        if (!inBossBattle) {
            document.getElementById("combatlog").innerHTML += "你打败了 " + monster.name + "!<br>";
            if (Math.floor(Math.random()*100) < 10) {
                monsterCrystalDrop(monster);
                inventory.updateInventory();
            }
            updateMonsterKilled(monster.name);
        }
        else {
            document.getElementById("combatlog").innerHTML += "你打败了本层迷宫BOSS! " + monster.name + "认可了你的力量并允许你继续冒险.";
            tower.setBossFound(false);
            tower.setLastBossDefeated(player.getCurrentFloor());
            tower.bossDefeated();
            inBossBattle = false;
        }
        upgrades.gainExcelia(monster);
        player.loadRestButton();
        player.loadExploreButton();
        self.loadMonsterInfo();
    };

    var monsterCrystalDrop = function(monster) {
        var type = Math.floor(Math.random()*5);
        var experience = monster.strength + monster.dexterity + monster.constitution;
        if (type === 0) {
            inventory.createCrystal("力量", experience);
        }
        else if (type == 1) {
            inventory.createCrystal("敏捷", experience);
        }
        else if (type == 2) {
            inventory.createCrystal("体质", experience);
        }
        else if (type == 3) {
            inventory.createCrystal("速度", experience);
        }
        else if (type == 4) {
            inventory.createCrystal("魔法", experience);
        }
        document.getElementById("combatlog").innerHTML += "" + monster.name + "掉落了一块经验水晶!<br>";
    }

    var updateMonsterKilled = function(name) {
        for (var i = 0; i < monsterList.length; i++) {
            if (monsterList[i].name == name) {
                monsterList[i].killed++;
            }
        }
    };

    var damageFormula = function(attackerStrength, attackerDexterity, defenderConstitution, defenderHealth) {
        var strengthWeigth = 2;
        var dexterityWeigth = 0.1;
        var constitutionWeigth = 0.5;
        var damage = ((attackerStrength * strengthWeigth) - (defenderConstitution * constitutionWeigth)) * (attackerDexterity * dexterityWeigth);

        if (damage < 0) {
            damage = 0;
        }
        else if (damage > defenderHealth) {
            damage = defenderHealth;
        }
        return damage;
    };

    var monsterAttacks = function(monster) {
        var damage = damageFormula(monster.strength, monster.dexterity, player.getConstitutionLevel() + player.getConstitutionBonus(), player.getHealthCurrentValue());
        if (buffs.getRageTimeLeft() !== 0) {
            damage = damage*2;
        }
        if (buffs.getAegisTimeLeft() === 0) {
            var barrier = buffs.getBarrierLeft();
            if (barrier > 0) {
                if (barrier >= damage) {
                    buffs.setBarrierLeft(barrier - damage);
                    document.getElementById("combatlog").innerHTML += "你的屏障吸收了来自" + monster.name + "的 " + Math.round(damage) + " 伤害.<br>";
                    buffs.updateTemporaryBuffs(false);
                    return false;
                }
                else {
                    document.getElementById("combatlog").innerHTML += "你的屏障吸收了来自" + monster.name + "的 " + Math.round(barrier) + "伤害.<br>";
                    document.getElementById("combatlog").innerHTML += "你的屏障崩塌了.<br>";
                    damage -= barrier;
                    buffs.setBarrierLeft(0);
                    buffs.updateTemporaryBuffs(false);
                }
            }
            player.setHealthCurrentValue(player.getHealthCurrentValue() - damage);
            document.getElementById("combatlog").innerHTML += "你受到来自" + monster.name + "的 " + Math.round(damage) + " 伤害.<br>";
            if (player.getHealthCurrentValue() === 0) {
                player.death(monster);
                return true;
            }
        }
        else {
            document.getElementById("combatlog").innerHTML += "宙斯盾吸收了来自" + monster.name + "的 " + Math.round(damage) + " 伤害.<br>";
        }
        player.gainExperience(monster, false);
        return false;
    };

    self.battleChance = function(boolean) {
        if (boolean) {
            rollMonster();
            return true;
        }
        else {
            var check = Math.random()*100;
            if (check <= tower.getFloorMonsterDensity(player.getCurrentFloor())) {
                rollMonster();
                return true;
            }
            return false;
        }
    };

    var rollMonster = function() {
        var tier = Math.floor((player.getCurrentFloor()-1)/10);
        var monster = Math.floor(Math.random()*10);
        while(monster == 10) {
            monster = Math.floor(Math.random()*10);
        }
        instancedMonster = createMonster((tier*10) + monster);
        self.battle(instancedMonster, false);
    };

    var createMonster = function(number) {
        var tempMonster = {name: "", currentHealth: 0, maximumHealth:0 , strength: 0, dexterity: 0, constitution: 0, status: 0};
        var statPool = Math.round((player.getCurrentFloor() * 15) + Math.pow(1.1, player.getCurrentFloor() - 1) - 1);
        tempMonster.name = monsterList[number].name;
        tempMonster.strength++;
        tempMonster.dexterity++;
        tempMonster.constitution++;
        statPool -= 3;
        distributeStats(tempMonster, statPool);
        tempMonster.maximumHealth = calculateHealth(tempMonster.constitution);
        tempMonster.currentHealth = tempMonster.maximumHealth;
        return tempMonster;
    };

    var distributeStats = function(monster, statPool) {
        var choice;
        while (statPool !== 0) {
            choice = Math.floor(Math.random()*3);
            while (choice == 3) {
                choice = Math.floor(Math.random()*3);
            }
            if (choice === 0) {
                monster.strength++;
            }
            else if (choice == 1) {
                monster.dexterity++;
            }
            else if (choice == 2) {
                monster.constitution++;
            }
            statPool--;
        }
    };

    var calculateHealth = function(constitution) {
        return (Math.pow(constitution, 2) * 4);
    };

    self.runAway = function() {
        if (player.getInBattle()) {
            document.getElementById("combatlog").innerHTML = "";
            var runRoll = Math.random() * (instancedMonster.strength + instancedMonster.dexterity + instancedMonster.constitution);
            if (runRoll < player.getSpeedLevel()) {
                document.getElementById("combatlog").innerHTML += "你逃脱了和" + instancedMonster.name + "的战斗.";
                self.loadMonsterInfo();
                player.setSpeedExperience(player.getSpeedExperience() + runRoll);
                player.setInBattle(false);
                player.loadExploreButton();
                player.loadRestButton();
            }
            else {
                document.getElementById("combatlog").innerHTML += "你逃跑失败.<br>";
                self.battle(instancedMonster, true);
            }
        }
        if (inBossBattle) {
            inBossBattle = false;
        }
    }
};

var monsters = new Monsters();