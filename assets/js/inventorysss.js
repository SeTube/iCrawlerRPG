var Inventory = function() {

    var gold = 20000;
    var keys = 0;
    var bag = [];
    var keyPrice = Math.round(Math.random() * 10000);
    var crystalPrice = Math.round(Math.random() * 15000);
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
            document.getElementById("sellbutton").innerHTML = '<button class="btn btn-block btn-success" onClick="inventory.updateInventory(false)">??????????????????</button>'
        }
        else {
            document.getElementById("sellbutton").innerHTML = '<button class="btn btn-block btn-success" onClick="inventory.updateInventory(true)">??????????????????</button>'
        }
        document.getElementById("keyprice").innerHTML = keyPrice;
        document.getElementById("crystalprice").innerHTML = crystalPrice;
    };

    var printChest = function(chest, number, sellMode) {
        var tooltip = "???????????????: " + chest.rarity + "<br>???????????????, ????????????????????????."
        if (!sellMode) {
            document.getElementById("inventory").innerHTML += '<button type="button" class="list-group-item" data-toggle="tooltip" title="' + tooltip + '" onClick="inventory.openChest(' + number + ')"><span class="badge">?????????' + chest.rarity + '</span> ' + chest.name + '</button>';
        }
        else {
            var price = chest.rarity;
            document.getElementById("inventory").innerHTML += '<button type="button" class="list-group-item list-group-item-success" data-toggle="tooltip" title="' + tooltip + '" onClick="inventory.sell(' + number + ',' + price + ')"><span class="badge">' + price + '</span> ' + chest.name + '</button>';
        }
    };

    var printWeapon = function(weapon, number, sellMode) {
        var tooltip = "????????????: " + Math.round(100*weapon.damage * weapon.rarity)/100 + "<br>????????????: " + Math.round(100*weapon.speed * weapon.rarity)/100 + "<br>????????????: " + Math.round(100*weapon.defense * weapon.rarity)/100 + "<br>????????????: " + Math.round(100*weapon.magic * weapon.rarity)/100;
        var tip = "??????+" + Math.round(100 * weapon.damage * weapon.rarity) / 100 + "??????+" + Math.round(100 * weapon.speed * weapon.rarity) / 100 + "??????+" + Math.round(100 * weapon.defense * weapon.rarity) / 100 + "??????+" + Math.round(100 * weapon.magic * weapon.rarity) / 100;
        if (!sellMode) {
            document.getElementById("inventory").innerHTML += '<button type="button" class="list-group-item" data-toggle="tooltip" title="' + tooltip + '" onClick="inventory.equipWeapon(' + number + ')"><span class="badge">??????</span>' + weapon.name + '<br><span class="badge">??????</span>' + tip + '</button>';
        }
        else {
            var price = Math.round((weapon.damage + weapon.speed + weapon.defense + weapon.magic) * 10 * weapon.rarity);
            document.getElementById("inventory").innerHTML += '<button type="button" class="list-group-item list-group-item-success" data-toggle="tooltip" title="' + tooltip + '" onClick="inventory.sell(' + number + ',' + price + ')"><span class="badge">??????' + price + '</span>' + weapon.name + '<br><span class="badge">??????</span>' + tip + '</button>';
        }
    };

    var printArmor = function(armor, number, sellMode) {
        var tooltip = "????????????: " + Math.round(100*armor.defense * armor.rarity)/100 + "<br>????????????: " + Math.round(100*armor.movement * armor.rarity)/100 + "<br>????????????: " + Math.round(100*armor.magic * armor.rarity)/100;
        var tip = "??????+" + Math.round(100 * armor.defense * armor.rarity) / 100 + "??????+" + Math.round(100 * armor.movement * armor.rarity) / 100 + "??????+" + Math.round(100 * armor.magic * armor.rarity) / 100;
        if (!sellMode) {
            document.getElementById("inventory").innerHTML += '<button type="button" class="list-group-item" data-toggle="tooltip" title="' + tooltip + '" onClick="inventory.equipArmor(' + number + ')"><span class="badge">??????</span>' + armor.name + '<br><span class="badge">??????</span>' + tip + '</button>';
        }
        else {
            var price = Math.round((armor.defense + armor.movement + armor.magic) * 10 * armor.rarity);
            document.getElementById("inventory").innerHTML += '<button type="button" class="list-group-item list-group-item-success" data-toggle="tooltip" title="' + tooltip + '" onClick="inventory.sell(' + number + ',' + price + ')"><span class="badge">??????' + price + '</span>' + armor.name + '<br><span class="badge">??????</span>' + tip + '</button>';
        }
    };

    var printCrystal = function(crystal, number, sellMode) {
        var tooltip = "";
        if (!sellMode) {
            document.getElementById("inventory").innerHTML += '<button type="button" class="list-group-item" data-toggle="tooltip" title="' + tooltip + '" onClick="inventory.useCrystal(' + number + ')"><span class="badge">' + crystal.stat + '</span>????????????(' + crystal.stat + '+' + crystal.experience + '??????)</button>';
        }
        else {
            var price = Math.round(crystal.experience/2);
            document.getElementById("inventory").innerHTML += '<button type="button" class="list-group-item list-group-item-success" data-toggle="tooltip" title="' + tooltip + '" onClick="inventory.sell(' + number + ',' + price + ')"><span class="badge">' + price + '</span>' + crystal.stat + '????????????</button>';
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
        var tooltip = "????????????: " + Math.round(100*equippedWeapon.damage * equippedWeapon.rarity)/100 + "<br>????????????: " + Math.round(100*equippedWeapon.speed * equippedWeapon.rarity)/100 + "<br>????????????: " + Math.round(100*equippedWeapon.defense * equippedWeapon.rarity)/100 + "<br>????????????: " + Math.round(100*equippedWeapon.magic * equippedWeapon.rarity)/100;
        var tip = "??????+" + Math.round(100 * equippedWeapon.damage * equippedWeapon.rarity) / 100 + "??????+" + Math.round(100 * equippedWeapon.speed * equippedWeapon.rarity) / 100 + "??????+" + Math.round(100 * equippedWeapon.defense * equippedWeapon.rarity) / 100 + "??????+" + Math.round(100 * equippedWeapon.magic * equippedWeapon.rarity) / 100;

        document.getElementById("equipment").innerHTML += '<button type="button" class="list-group-item" data-toggle="tooltip" title="' + tooltip + '" onClick="inventory.unequipWeapon()"><span class="badge">?????????</span>' + equippedWeapon.name + '<br><span class="badge">??????</span>' + tip+'</button>';
    };

    var printEquippedArmor = function() {
        var tooltip = "????????????: " + Math.round(100*equippedArmor.defense * equippedArmor.rarity)/100 + "<br>????????????: " + Math.round(100*equippedArmor.movement * equippedArmor.rarity)/100 + "<br>????????????: " + Math.round(100*equippedArmor.magic * equippedArmor.rarity)/100;
        var tip = "??????+" + Math.round(100 * equippedArmor.defense * equippedArmor.rarity) / 100 + "??????+" + Math.round(100 * equippedArmor.movement * equippedArmor.rarity) / 100 + "??????+" + Math.round(100 * equippedArmor.magic * equippedArmor.rarity) / 100;
        document.getElementById("equipment").innerHTML += '<button type="button" class="list-group-item" data-toggle="tooltip" title="' + tooltip + '" onClick="inventory.unequipArmor()"><span class="badge">?????????</span>' + equippedArmor.name + '<br><span class="badge">??????</span>' + tip +'</button>';
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
            name += "??????";
        }
        else if (highest == weapon.speed) {
            name += "??????";
        }
        else if (highest == weapon.defense) {
            name += "??????";
        }
        else if (highest == weapon.magic) {
            name += "??????";
        }
        return name;
    };

    var nameArmor = function(armor) {
        var name = "";
        var highest = Math.max(armor.defense, armor.movement, armor.magic);
        name += nameRarity(armor);
        if (highest == armor.defense) {
            name += nameDefenseAttribute(armor.defense);
            name += "??????";
        }
        else if (highest == armor.movement) {
            name += nameSpeedAttribute(armor.movement);
            name += "??????";
        }
        else if (highest == armor.magic) {
            name += nameMagicalAttribute(armor.magic);
            name += "??????";
        }
        return name;
    };

    var nameRarity = function(equipment) {
        if (equipment.rarity < 10) {
            equipment.rarity = 0.5;
            return "(??????)";
        }
        else if (equipment.rarity < 25) {
            equipment.rarity = 1;
            return "(??????)";
        }
        else if (equipment.rarity < 50) {
            equipment.rarity = 1.25;
            return "(??????)";
        }
        else if (equipment.rarity < 75) {
            equipment.rarity = 1.5;
            return "(??????)";
        }
        else if (equipment.rarity < 90) {
            equipment.rarity = 2.0;
            return "(??????)";
        }
        else if (equipment.rarity < 100) {
            equipment.rarity = 2.25;
            return "(??????)";
        }
        else if (equipment.rarity == 100) {
            equipment.rarity = 2.5;
            return "(??????)";
        }
    };

    var nameDamageAttribute = function(damage) {
        var name = "";
        damage = damage*10;
        console.log(damage);
        name += nameAdjective(damage%10);
        if (damage < 5) {
            name += "(???)";
        }
        else if (damage < 10) {
            name += "(???)";
        }
        else if (damage < 15) {
            name += "(???)";
        }
        else if (damage < 20) {
            name += "(???)";
        }
        else if (damage < 25) {
            name += "(???)";
        }
        else if (damage < 30) {
            name += "(???)";
        } 
        else if (damage < 35) {
            name += "(???)";
        } 
        else if (damage < 40) {
            name += "(???)";
        }
        return name;
    };

    var nameDefenseAttribute = function(defense) {
        var name = "";
        defense = defense*10;
        console.log(defense);
        name += nameAdjective(defense%10);
        if (defense < 10) {
            name += "(??????)";
        }
        else if (defense < 20) {
            name += "(??????)";
        }
        else if (defense < 30) {
            name += "(??????)";
        }
        else if (defense < 40) {
            name += "(??????)";
        }
        return name;
    };

    var nameSpeedAttribute = function(speed) {
        var name = "";
        speed = speed*10;
        console.log(speed);
        name += nameAdjective(speed%10);
        if (speed < 10) {
            name += "(??????)";
        }
        else if (speed < 20) {
            name += "(??????)";
        }
        else if (speed < 30) {
            name += "(??????)";
        }
        else if (speed < 40) {
            name += "(??????)";
        }
        return name;
    };

    var nameMagicalAttribute = function(speed) {
        var name = "";
        speed = speed * 10;
        console.log(speed);
        name += nameAdjective(speed%10);
        if (speed < 10) {
            name += "(??????)";
        }
        else if (speed < 20) {
            name += "(??????)";
        }
        else if (speed < 30) {
            name += "(??????)";
        }
        else if (speed < 40) {
            name += "(??????)";
        }
        else if (speed < 50) {
            name += "(??????)";
        }
        return name;
    };

    var nameAdjective = function(stats) {
        if (stats < 3) {
            return "(??????)";
        }
        else if (stats < 6) {
            return "(??????)";
        }
        else if (stats < 9) {
            return "(??????)";
        }
        else {
            return "(??????)";
        }
    };

    self.findChest = function(rarity) {
        var chest = {type: "chest", name: "", rarity: rarity};
        chest.name = nameChest(chest) + "??????";
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
            name += "(???)";
        }
        else if (chest.rarity < 10) {
            name += "(???)";
        }
        else if (chest.rarity < 25) {
            name += "(???)";
        }
        else if (chest.rarity < 50) {
            name += "(???)";
        }
        else if (chest.rarity < 80) {
            name += "(???)";
        }
        else if (chest.rarity < 100) {
            name += "(???)";
        } 
        else if (chest.rarity < 200) {
            name += "(???)";
        }
        else if (chest.rarity < 230) {
            name += "(???)";
        }
        else if (chest.rarity < 240) {
            name += "(???)";
        }
        else if (chest.rarity < 250) {
            name += "(???)";
        }
        return name;
    };

    var extraRarity = function(chest) {
        //rarity ?????????
        var rarity = Math.floor(Math.random() * 101);
        if (rarity < 30) {
            return "(??????)";
        }
        else if (rarity < 50) {
            return "(??????)";
        }
        else if (rarity < 75) {
            chest.rarity += 2;
            return "(??????)";
        }
        else if (rarity < 90) {
            chest.rarity += 5;
            return "(??????)";
        }
        else if (rarity < 100) {
            chest.rarity += 10;
            return "(??????)";
        }
        else if (rarity == 100) {
            chest.rarity += 20;
            return "(??????)";
        } 
        else if (rarity == 100) {
            chest.rarity += 99;
            return "(??????)";
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
        if (crystal.stat == "??????") {
            player.setStrengthExperience(player.getStrengthExperience() + crystal.experience);
        }
        else if (crystal.stat == "??????") {
            player.setDexterityExperience(player.getDexterityExperience() + crystal.experience);
        }
        else if (crystal.stat == "??????") {
            player.setConstitutionExperience(player.getConstitutionExperience() + crystal.experience);
        }
        else if (crystal.stat == "??????") {
            player.setSpeedExperience(player.getSpeedExperience() + crystal.experience);
        }
        else if (crystal.stat == "??????") {
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
                stat = "??????";
            }
            else if (type == 1) {
                stat = "??????";
            }
            else if (type == 2) {
                stat = "??????";
            }
            else if (type == 3) {
                stat = "??????";
            }
            else if (type == 4) {
                stat = "??????";
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
