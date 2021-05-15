var Inventory = function() {

    var gold = 0;
    var keys = 0;
    var bag = [];
    var keyPrice = Math.round(Math.random() * 100000);
    var crystalPrice = Math.round(Math.random() * 200000);
    var equippedWeapon;
    var equippedArmor;
    var equippedAccessory;
    var sellMode = false;

    var self = this;
    //Save Method
    self.save = function() {
        var inventorySave = {
            savedGold: gold,
            savedBag: bag,
            savedKeys: keys,
            savedEquippedWeapon: equippedWeapon,
            savedEquippedArmor: equippedArmor,
            savedEquippedAccessory: equippedAccessory,
        };
        localStorage.setItem("inventorySave",JSON.stringify(inventorySave));
    };

    //Load Method
    self.load = function() {
        var inventorySave = JSON.parse(localStorage.getItem("inventorySave"));
        if (inventorySave) {
            if (inventorySave.savedGold !== undefined) {
                gold = inventorySave.savedGold;
            }
            if (inventorySave.savedBag !== undefined) {
                loadBag(inventorySave.savedBag);
            }
            if (inventorySave.savedKeys !== undefined) {
                keys = inventorySave.savedKeys;
            }
            if (inventorySave.savedEquippedWeapon !== undefined) {
                equippedWeapon = inventorySave.savedEquippedWeapon;
            }
            if (inventorySave.savedEquippedArmor !== undefined) {
                equippedArmor = inventorySave.savedEquippedArmor;
            }
            if (inventorySave.savedEquippedAccessory !== undefined) {
                equippedAccessory = inventorySave.savedEquippedAccessory;
            }
        }
    };

    var loadBag = function(savedBag) {
        for (var i = 0; i < savedBag.length; i++) {
            bag.push(savedBag[i]);
        }
    };

    //Getters
    self.getGold = function() {
        return gold;
    };

    self.getKeys = function() {
        return keys;
    };

    self.getBag = function() {
        return bag;
    };

    //Setters
    self.setGold = function(newGold) {
        gold = newGold;
        self.updateInventoryHTML();
    };

    self.setKeys = function(newKeys) {
        keys = newKeys;
        self.updateInventoryHTML();
    };

    //Other Methods
    self.updateInventoryHTML = function() {
        document.getElementById("gold").innerHTML = gold;
        document.getElementById("keys").innerHTML = keys;
    };

    self.updateInventory = function(boolean) {
        self.updateShop(boolean);
        document.getElementById("inventory").innerHTML = "";
        for (var i = 0; i < 50; i++) {
            if (i >= bag.length) {
                break;
            }
            if (bag[i].type == "chest") {
                printChest(bag[i], i, sellMode);
            }
            else if (bag[i].type == "weapon") {
                printWeapon(bag[i], i, sellMode);
            }
            else if (bag[i].type == "armor") {
                printArmor(bag[i], i, sellMode);
            }
            else if (bag[i].type == "crystal") {
                printCrystal(bag[i], i, sellMode);
            }
        }

        $(document).ready(function(){
            $('[data-toggle="tooltip"]').tooltip({html: true}); 
        });
    };

    self.updateShop = function(boolean) {
        sellMode = boolean;
        if (sellMode) {
            document.getElementById("sellbutton").innerHTML = '<button class="btn btn-block btn-success" onClick="inventory.updateInventory(false)">退出售卖模式</button>'
        }
        else {
            document.getElementById("sellbutton").innerHTML = '<button class="btn btn-block btn-success" onClick="inventory.updateInventory(true)">进入售卖模式</button>'
        }
        document.getElementById("keyprice").innerHTML = keyPrice;
        document.getElementById("crystalprice").innerHTML = crystalPrice;
    };

    var printChest = function(chest, number, sellMode) {
        var tooltip = "宝箱稀有度: " + chest.rarity + "<br>稀有度越高, 道具的属性就越高."
        if (!sellMode) {
            document.getElementById("inventory").innerHTML += '<button type="button" class="list-group-item" data-toggle="tooltip" title="' + tooltip + '" onClick="inventory.openChest(' + number + ')"><span class="badge">稀有度' + chest.rarity + '</span> ' + chest.name + '</button>';
        }
        else {
            var price = chest.rarity;
            document.getElementById("inventory").innerHTML += '<button type="button" class="list-group-item list-group-item-success" data-toggle="tooltip" title="' + tooltip + '" onClick="inventory.sell(' + number + ',' + price + ')"><span class="badge">' + price + '</span> ' + chest.name + '</button>';
        }
    };

    var printWeapon = function(weapon, number, sellMode) {
        var tooltip = "加成力量: " + Math.round(100*weapon.damage * weapon.rarity)/100 + "<br>加成敏捷: " + Math.round(100*weapon.speed * weapon.rarity)/100 + "<br>加成体质: " + Math.round(100*weapon.defense * weapon.rarity)/100 + "<br>加成魔法: " + Math.round(100*weapon.magic * weapon.rarity)/100;
        var tip = "力量+" + Math.round(100 * weapon.damage * weapon.rarity) / 100 + "敏捷+" + Math.round(100 * weapon.speed * weapon.rarity) / 100 + "体质+" + Math.round(100 * weapon.defense * weapon.rarity) / 100 + "魔法+" + Math.round(100 * weapon.magic * weapon.rarity) / 100;
        if (!sellMode) {
            document.getElementById("inventory").innerHTML += '<button type="button" class="list-group-item" data-toggle="tooltip" title="' + tooltip + '" onClick="inventory.equipWeapon(' + number + ')"><span class="badge">武器</span>' + weapon.name + '<br><span class="badge">属性</span>' + tip + '</button>';
        }
        else {
            var price = Math.round((weapon.damage + weapon.speed + weapon.defense + weapon.magic) * 50 * weapon.rarity);
            document.getElementById("inventory").innerHTML += '<button type="button" class="list-group-item list-group-item-success" data-toggle="tooltip" title="' + tooltip + '" onClick="inventory.sell(' + number + ',' + price + ')"><span class="badge">价格' + price + '</span>' + weapon.name + '<br><span class="badge">属性</span>' + tip + '</button>';
        }
    };

    var printArmor = function(armor, number, sellMode) {
        var tooltip = "加成体质: " + Math.round(100*armor.defense * armor.rarity)/100 + "<br>加成速度: " + Math.round(100*armor.movement * armor.rarity)/100 + "<br>加成魔法: " + Math.round(100*armor.magic * armor.rarity)/100;
        var tip = "体质+" + Math.round(100 * armor.defense * armor.rarity) / 100 + "速度+" + Math.round(100 * armor.movement * armor.rarity) / 100 + "魔法+" + Math.round(100 * armor.magic * armor.rarity) / 100;
        if (!sellMode) {
            document.getElementById("inventory").innerHTML += '<button type="button" class="list-group-item" data-toggle="tooltip" title="' + tooltip + '" onClick="inventory.equipArmor(' + number + ')"><span class="badge">护甲</span>' + armor.name + '<br><span class="badge">属性</span>' + tip + '</button>';
        }
        else {
            var price = Math.round((armor.defense + armor.movement + armor.magic) * 100 * armor.rarity);
            document.getElementById("inventory").innerHTML += '<button type="button" class="list-group-item list-group-item-success" data-toggle="tooltip" title="' + tooltip + '" onClick="inventory.sell(' + number + ',' + price + ')"><span class="badge">价格' + price + '</span>' + armor.name + '<br><span class="badge">属性</span>' + tip + '</button>';
        }
    };

    var printCrystal = function(crystal, number, sellMode) {
        var tooltip = "";
        if (!sellMode) {
            document.getElementById("inventory").innerHTML += '<button type="button" class="list-group-item" data-toggle="tooltip" title="' + tooltip + '" onClick="inventory.useCrystal(' + number + ')"><span class="badge">' + crystal.stat + '</span>经验水晶(' + crystal.stat + '+' + crystal.experience + '经验)</button>';
        }
        else {
            var price = Math.round(crystal.experience/2);
            document.getElementById("inventory").innerHTML += '<button type="button" class="list-group-item list-group-item-success" data-toggle="tooltip" title="' + tooltip + '" onClick="inventory.sell(' + number + ',' + price + ')"><span class="badge">' + price + '</span>' + crystal.stat + '经验水晶</button>';
        }
    }

    self.updateEquipment = function() {
        document.getElementById("equipment").innerHTML = '';
        if (equippedWeapon !== undefined) {
            printEquippedWeapon();
        }
        if (equippedArmor !== undefined) {
            printEquippedArmor();
        }
        $(document).ready(function(){
            $('[data-toggle="tooltip"]').tooltip({html: true}); 
        });
    }

    var printEquippedWeapon = function() {
        var tooltip = "加成力量: " + Math.round(100*equippedWeapon.damage * equippedWeapon.rarity)/100 + "<br>加成敏捷: " + Math.round(100*equippedWeapon.speed * equippedWeapon.rarity)/100 + "<br>加成体质: " + Math.round(100*equippedWeapon.defense * equippedWeapon.rarity)/100 + "<br>加成魔法: " + Math.round(100*equippedWeapon.magic * equippedWeapon.rarity)/100;
        var tip = "力量+" + Math.round(100 * equippedWeapon.damage * equippedWeapon.rarity) / 100 + "敏捷+" + Math.round(100 * equippedWeapon.speed * equippedWeapon.rarity) / 100 + "体质+" + Math.round(100 * equippedWeapon.defense * equippedWeapon.rarity) / 100 + "魔法+" + Math.round(100 * equippedWeapon.magic * equippedWeapon.rarity) / 100;

        document.getElementById("equipment").innerHTML += '<button type="button" class="list-group-item" data-toggle="tooltip" title="' + tooltip + '" onClick="inventory.unequipWeapon()"><span class="badge">已装备</span>' + equippedWeapon.name + '<br><span class="badge">属性</span>' + tip+'</button>';
    };

    var printEquippedArmor = function() {
        var tooltip = "加成体质: " + Math.round(100*equippedArmor.defense * equippedArmor.rarity)/100 + "<br>加成速度: " + Math.round(100*equippedArmor.movement * equippedArmor.rarity)/100 + "<br>加成魔法: " + Math.round(100*equippedArmor.magic * equippedArmor.rarity)/100;
        var tip = "体质+" + Math.round(100 * equippedArmor.defense * equippedArmor.rarity) / 100 + "速度+" + Math.round(100 * equippedArmor.movement * equippedArmor.rarity) / 100 + "魔法+" + Math.round(100 * equippedArmor.magic * equippedArmor.rarity) / 100;
        document.getElementById("equipment").innerHTML += '<button type="button" class="list-group-item" data-toggle="tooltip" title="' + tooltip + '" onClick="inventory.unequipArmor()"><span class="badge">已装备</span>' + equippedArmor.name + '<br><span class="badge">属性</span>' + tip +'</button>';
    };

    self.openChest = function(chest) {
        if (keys > 0) {
            var type = Math.floor(Math.random()*2);
            if (type === 0) {
                bag.push(createWeapon(bag[chest].rarity));
            }
            else if (type === 1) {
                bag.push(createArmor(bag[chest].rarity));
            }
            else if (type == 2) {
                createAcessory(bag[chest].rarity);
            }
            else if (type == 3) {
                createEnhancingStone(bag[chest].rarity)
            }
            bag.splice(chest, 1);
            self.updateInventory(sellMode);
            self.setKeys(keys - 1);
        }
    };

    var createWeapon = function(points) {
        var weapon = {type: "weapon", name: "", damage: 0, speed: 0, defense: 0, magic: 0, rarity: 0};
        var roll;
        while (points > 0) {
            roll = Math.floor(Math.random()*4);
            if (roll === 0) {
                weapon.damage += 0.1 * Math.round(points/2);
            }
            else if (roll == 1) {
                weapon.speed += 0.1 * Math.round(points/2);
            }
            else if (roll == 2) {
                weapon.defense += 0.1 * Math.round(points/2);
            }
            else if (roll == 3) {
                weapon.magic += 0.1 * Math.round(points/2);
            }
            points -= Math.round(points/2);
        }
        weapon.rarity = equipmentRarity();
        weapon.name = nameWeapon(weapon);
        return weapon;
    };

    var createArmor = function(points) {
        var armor = {type: "armor", name: "", defense: 0, movement: 0, magic: 0, rarity: 0};
        var roll;
        while (points > 0) {
            roll = Math.floor(Math.random()*3);
            if (roll === 0) {
                armor.defense += 0.1 * Math.round(points/2);
            }
            else if (roll == 1) {
                armor.movement += 0.1 * Math.round(points/2);
            }
            else if (roll == 2) {
                armor.movement += 0.1 * Math.round(points/2);
            }
            points -= Math.round(points/2);
        }
        armor.rarity = equipmentRarity();
        armor.name = nameArmor(armor);
        return armor;
    };

    var equipmentRarity = function() {
        var rarity = Math.floor(Math.random()*101);
        return rarity;
    };

    var nameWeapon = function(weapon) {
        var name = "";
        var highest = Math.max(weapon.damage, weapon.speed, weapon.defense, weapon.magic);
        name += nameRarity(weapon);
        name += nameDamageAttribute(highest);
        if (highest == weapon.damage) {
            name += "剑";
        }
        else if (highest == weapon.speed) {
            name += "匕首";
        }
        else if (highest == weapon.defense) {
            name += "护盾";
        }
        else if (highest == weapon.magic) {
            name += "法杖";
        }
        return name;
    };

    var nameArmor = function(armor) {
        var name = "";
        var highest = Math.max(armor.defense, armor.movement, armor.magic);
        name += nameRarity(armor);
        if (highest == armor.defense) {
            name += nameDefenseAttribute(armor.defense);
            name += "板甲";
        }
        else if (highest == armor.movement) {
            name += nameSpeedAttribute(armor.movement);
            name += "皮革背心";
        }
        else if (highest == armor.magic) {
            name += nameMagicalAttribute(armor.magic);
            name += "棉布长袍";
        }
        return name;
    };

    var nameRarity = function(equipment) {
        if (equipment.rarity < 50) {
            equipment.rarity = 1;
            return "(普通)";
        }
        else if (equipment.rarity < 75) {
            equipment.rarity = 1.25;
            return "(罕见)";
        }
        else if (equipment.rarity < 90) {
            equipment.rarity = 1.5;
            return "(稀有)";
        }
        else if (equipment.rarity < 100) {
            equipment.rarity = 2.0;
            return "(史诗)";
        }
        else if (equipment.rarity == 100) {
            equipment.rarity = 2.5;
            return "(传奇)";
        }
    };

    var nameDamageAttribute = function(damage) {
        var name = "";
        damage = damage*10;
        console.log(damage);
        name += nameAdjective(damage%10);
        if (damage < 10) {
            name += "(木制)";
        }
        else if (damage < 20) {
            name += "(铜制)";
        }
        else if (damage < 30) {
            name += "(铁制)";
        }
        else if (damage < 40) {
            name += "(钢制)";
        }
        return name;
    };

    var nameDefenseAttribute = function(defense) {
        var name = "";
        defense = defense*10;
        console.log(defense);
        name += nameAdjective(defense%10);
        if (defense < 10) {
            name += "(凑合)";
        }
        else if (defense < 20) {
            name += "(镀铜)";
        }
        else if (defense < 30) {
            name += "(锈铁)";
        }
        else if (defense < 40) {
            name += "(残钢)";
        }
        return name;
    };

    var nameSpeedAttribute = function(speed) {
        var name = "";
        speed = speed*10;
        console.log(speed);
        name += nameAdjective(speed%10);
        if (speed < 10) {
            name += "(难受)";
        }
        else if (speed < 20) {
            name += "(轻型)";
        }
        else if (speed < 30) {
            name += "(重型)";
        }
        else if (speed < 40) {
            name += "(耐久)";
        }
        return name;
    };

    var nameMagicalAttribute = function(speed) {
        var name = "";
        speed = speed*10;
        console.log(speed);
        name += nameAdjective(speed%10);
        if (speed < 10) {
            name += "(无用)";
        }
        else if (speed < 20) {
            name += "(棉制)";
        }
        else if (speed < 30) {
            name += "(难看)";
        }
        else if (speed < 40) {
            name += "(神奇)";
        }
        return name;
    };

    var nameAdjective = function(stats) {
        if (stats < 3) {
            return "(弱化)";
        }
        else if (stats < 6) {
            return "(普通)";
        }
        else if (stats < 9) {
            return "(强力)";
        }
        else {
            return "(原始)";
        }
    };

    self.findChest = function(rarity) {
        var chest = {type: "chest", name: "", rarity: rarity};
        chest.name = nameChest(chest) + "宝箱";
        bag.push(chest);
        self.updateInventory(sellMode);
    };

    self.clearBag = function() {
        bag = [];
        self.updateInventory(sellMode);
    };

    var nameChest = function(chest) {
        var name = "";
        name += extraRarity(chest);
        if (chest.rarity < 5) {
            name += "(白色)";
        }
        else if (chest.rarity < 10) {
            name += "(蓝色)";
        }
        else if (chest.rarity < 25) {
            name += "(紫色)";
        }
        else if (chest.rarity < 50) {
            name += "(粉色)";
        }
        else if (chest.rarity < 100) {
            name += "(肉色)";
        }
        else if (chest.rarity < 250) {
            name += "(橙色)";
        }
        return name;
    };

    var extraRarity = function(chest) {
        var rarity = Math.floor(Math.random() * 101);
        if (rarity < 50) {
            return "(普通)";
        }
        else if (rarity < 75) {
            chest.rarity += 2;
            return "(高级)";
        }
        else if (rarity < 90) {
            chest.rarity += 5;
            return "(稀有)";
        }
        else if (rarity < 100) {
            chest.rarity += 10;
            return "(罕见)";
        }
        else if (rarity == 100) {
            chest.rarity += 20;
            return "(传说)";
        }
    };

    self.equipWeapon = function(number) {
        var weapon = bag[number];
        if (equippedWeapon !== undefined) {
            self.unequipWeapon();
        }
        equippedWeapon = weapon;
        player.setStrengthBonus(player.getStrengthBonus() + weapon.damage * weapon.rarity);
        player.setDexterityBonus(player.getDexterityBonus() + weapon.speed * weapon.rarity);
        player.setConstitutionBonus(player.getConstitutionBonus() + weapon.defense * weapon.rarity);
        player.setMagicBonus(player.getMagicBonus() + weapon.magic * weapon.rarity);
        bag.splice(number, 1);
        self.updateInventory(sellMode);
        self.updateEquipment();
    };

    self.equipArmor = function(number) {
        var armor = bag[number];
        if (equippedArmor !== undefined) {
            self.unequipArmor();
        }
        equippedArmor = armor;
        player.setConstitutionBonus(player.getConstitutionBonus() + armor.defense * armor.rarity);
        player.setSpeedBonus(player.getSpeedBonus() + armor.movement * armor.rarity);
        player.setMagicBonus(player.getMagicBonus() + armor.magic * armor.rarity);
        bag.splice(number, 1);
        self.updateInventory(sellMode);
        self.updateEquipment();
    };

    self.unequipWeapon = function() {
        bag.push(equippedWeapon);
        player.setStrengthBonus(player.getStrengthBonus() - equippedWeapon.damage * equippedWeapon.rarity);
        player.setDexterityBonus(player.getDexterityBonus() - equippedWeapon.speed * equippedWeapon.rarity);
        player.setConstitutionBonus(player.getConstitutionBonus() - equippedWeapon.defense * equippedWeapon.rarity);
        player.setMagicBonus(player.getMagicBonus() - equippedWeapon.magic * equippedWeapon.rarity);
        player.setHealthCurrentValue(player.getHealthCurrentValue());
        player.setManaCurrentValue(player.getManaCurrentValue());
        equippedWeapon = undefined;
        self.updateEquipment();
        self.updateInventory(sellMode);
    };

    self.unequipArmor = function() {
        bag.push(equippedArmor);
        player.setConstitutionBonus(player.getConstitutionBonus() - equippedArmor.defense * equippedArmor.rarity);
        player.setSpeedBonus(player.getSpeedBonus() - equippedArmor.movement * equippedArmor.rarity);
        player.setMagicBonus(player.getMagicBonus() - equippedArmor.magic * equippedArmor.rarity);
        player.setHealthCurrentValue(player.getHealthCurrentValue());
        player.setManaCurrentValue(player.getManaCurrentValue());
        equippedArmor = undefined;
        self.updateEquipment();
        self.updateInventory(sellMode);
    };

    self.createCrystal = function(crystalStat, crystalExperience) {
        bag.push({type: "crystal", stat: crystalStat, experience: crystalExperience});
    };

    self.useCrystal = function(slot, all) {
        var crystal = bag[slot];
        if (crystal.stat == "力量") {
            player.setStrengthExperience(player.getStrengthExperience() + crystal.experience);
        }
        else if (crystal.stat == "敏捷") {
            player.setDexterityExperience(player.getDexterityExperience() + crystal.experience);
        }
        else if (crystal.stat == "体质") {
            player.setConstitutionExperience(player.getConstitutionExperience() + crystal.experience);
        }
        else if (crystal.stat == "速度") {
            player.setSpeedExperience(player.getSpeedExperience() + crystal.experience);
        }
        else if (crystal.stat == "魔法") {
            player.setMagicExperience(player.getMagicExperience() + crystal.experience);
        }
        bag.splice(slot, 1);
        if (all === undefined) {
            self.updateInventory(sellMode);
        }
    };

    self.buyKey = function() {
        if (gold >= keyPrice) {
            self.setGold(self.getGold() - keyPrice);
            self.setKeys(self.getKeys() + 1);
            self.updateInventory(sellMode);
        }
    };

    self.buyCrystal = function(stat) {
        var price = crystalPrice;
        if (stat === "") {
            price = price/2;
            var type = Math.floor(Math.random()*5);
            if (type === 0) {
                stat = "力量";
            }
            else if (type == 1) {
                stat = "敏捷";
            }
            else if (type == 2) {
                stat = "体质";
            }
            else if (type == 3) {
                stat = "速度";
            }
            else if (type == 4) {
                stat = "魔法";
            }
        }
        if (gold >= price) {
            self.setGold(self.getGold() - price);
            self.createCrystal(stat, 1000);
            self.updateInventory(sellMode);
        }
    };

    self.sell = function(number, price) {
        self.setGold(self.getGold() + price);
        bag.splice(number, 1);
        self.updateInventory(sellMode);
    };

    self.useAllCrystals = function() {
        for (var i = bag.length-1; i >= 0; i--) {
            if (bag[i].type == "crystal") {
                self.useCrystal(i, true);
            }
        }
        self.updateInventory(sellMode);
    };
};

var inventory = new Inventory();