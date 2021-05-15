var Upgrades = function() {
	var excelia = 0;

	var upgradeList = [];
	upgradeList.push({name: "乙太调谐 1级",
		id: "aetheric1",
		exceliaCost: 10,
		required: "",
		shown: true,
		purchased: false,
		description:"挖掘环绕着你的法力. 探索时每秒恢复 +1 法力."});

	upgradeList.push({name: "时间扭曲 1级",
		id: "timewarp1",
		exceliaCost: 10,
		required: "",
		shown: true,
		purchased: false,
		description:"放置模式太慢了吗? 让它以两倍速运行!"});

	upgradeList.push({name: "祝福 1级",
		id: "blessings1",
		exceliaCost: 100,
		required: "",
		shown: true,
		purchased: false,
		description:"当你死亡时保留 10% 技能点."});

	upgradeList.push({name: "快速休息 1级",
		id: "fastresting1",
		exceliaCost: 100,
		required: "",
		shown: true,
		purchased: false,
		description:"恢复速度变为普通的两倍."});

	upgradeList.push({name: "自动射击",
		id: "autoshoot",
		exceliaCost: 250,
		required: "",
		shown: true,
		purchased: false,
		description:"每次战斗开始时发射一发火球术,并且不占用回合!"});	

	upgradeList.push({name: "战斗治疗",
		id: "battlehealing",
		exceliaCost: 250,
		required: "",
		shown: true,
		purchased: false,
		description:"在战斗中当你生命值低于 50% 时自动释放治愈术."});

	upgradeList.push({name: "乙太调谐 2级",
		id: "aetheric2",
		exceliaCost: 350,
		required: "aetheric1",
		shown: false,
		purchased: false,
		description:"加深你与法力之间的联系. 探索时每秒恢复 +2 法力."});

	upgradeList.push({name: "快速休息 2级",
		id: "fastresting2",
		exceliaCost: 500,
		required: "fastresting1",
		shown: false,
		purchased: false,
		description:"恢复速度变为普通的四倍."});

	upgradeList.push({name: "时间扭曲 2级",
		id: "timewarp2",
		exceliaCost: 500,
		required: "timewarp1",
		shown: false,
		purchased: false,
		description:"变换到下一档! 有了这个, 让放置模式以五倍速运行!"});

	upgradeList.push({name: "快速探索 1级",
		id: "fasterexploration1",
		exceliaCost: 1000,
		required: "",
		shown: true,
		purchased: false,
		description:"楼层探索速度加倍."});

	upgradeList.push({name: "肌肉记忆 1级",
		id: "musclememory1",
		exceliaCost: 1000,
		required: "",
		shown: true,
		purchased: false,
		description:"死亡时损失属性降低 1%."});

	upgradeList.push({name: "壁垒铸造",
		id: "barriercast",
		exceliaCost: 2000,
		required: "",
		shown: true,
		purchased: false,
		description:"当屏障消失后自动施放屏障术. 你需要先学会屏障术."});

	upgradeList.push({name: "祝福 2级",
		id: "blessings2",
		exceliaCost: 2000,
		required: "blessings1",
		shown: false,
		purchased: false,
		description:"有了这个, 当你死亡时保留 20% 技能点!"})

	upgradeList.push({name: "双倍技能 1级",
		id: "doubleexcelia1",
		exceliaCost: 2000,
		required: "",
		shown: true,
		purchased: false,
		description:"杀死怪物获取技能点数量翻倍."});

	upgradeList.push({name: "快速升级 1级",
		id: "fasterleveling1",
		exceliaCost: 2000,
		required: "",
		shown: true,
		purchased: false,
		description:"属性经验值获取的速度翻倍."});

	upgradeList.push({name: "时间扭曲 3级",
		id: "timewarp3",
		exceliaCost: 2000,
		required: "timewarp2",
		shown: false,
		purchased: false,
		description:"使放置模式加快! 你几乎看不到发生了什么"});

	upgradeList.push({name: "快速休息 3级",
		id: "fastresting3",
		exceliaCost: 2500,
		required: "fastresting2",
		shown: false,
		purchased: false,
		description:"恢复速度变为普通的八倍."});

	upgradeList.push({name: "老练法师",
		id: "adeptmage",
		exceliaCost: 5000,
		required: "",
		shown: true,
		purchased: false,
		description:"法术升级速度翻倍."});

	upgradeList.push({name: "祝福 3级",
		id: "blessings3",
		exceliaCost: 5000,
		required: "blessings2",
		shown: false,
		purchased: false,
		description:"当你死亡时保留 30% 技能点."});

	upgradeList.push({name: "快速探索 1级",
		id: "fasterexploration2",
		exceliaCost: 5000,
		required: "fasterexploration1",
		shown: false,
		purchased: false,
		description:"楼层探索速度加倍."});

	upgradeList.push({name: "肌肉记忆 2级",
		id: "musclememory2",
		exceliaCost: 5000,
		required: "musclememory1",
		shown: false,
		purchased: false,
		description:"死亡时损失属性降低 1%."});

	upgradeList.push({name: "双倍技能 2级",
		id: "doubleexcelia2",
		exceliaCost: 10000,
		required: "doubleexcelia1",
		shown: false,
		purchased: false,
		description:"杀死怪物获取技能点数量翻倍."});

	upgradeList.push({name: "快速升级 2级",
		id: "fasterleveling2",
		exceliaCost: 15000,
		required: "fasterleveling1",
		shown: false,
		purchased: false,
		description:"属性经验值获取的速度翻倍."});

	upgradeList.push({name: "快速探索 1级",
		id: "fasterexploration3",
		exceliaCost: 20000,
		required: "fasterexploration2",
		shown: false,
		purchased: false,
		description:"楼层探索速度加倍."});

	upgradeList.push({name: "快速升级 3级",
		id: "fasterleveling3",
		exceliaCost: 50000,
		required: "fasterleveling2",
		shown: false,
		purchased: false,
		description:"属性经验值获取的速度翻倍."});

	var self = this;
	//Save Method
	self.save = function() {
		var upgradesSave = {
      		savedExcelia: excelia,
      		savedUpgradeList: upgradeList
		};
		localStorage.setItem("upgradesSave",JSON.stringify(upgradesSave));
	};

	//Load Method
	self.load = function() {
		var upgradesSave = JSON.parse(localStorage.getItem("upgradesSave"));
		if (upgradesSave) {
			if (upgradesSave.savedExcelia !== undefined) {
				excelia = upgradesSave.savedExcelia;
			}
			if (upgradesSave.savedUpgradeList !== undefined) {
				loadUpgradeList(upgradesSave.savedUpgradeList);
			}
		}
	};

	var loadUpgradeList = function(savedUpgradeList) {
		var success = false;
		for (var i = 0; i < savedUpgradeList.length; i++) {
			if (i == upgradeList.length) {
				break;
			}
			for (var j = 0; j < upgradeList.length; j++) {
				if (upgradeList[j].id == savedUpgradeList[i].id) {
					success = true;
					break;
				}
			}
			if (success) {
				if (savedUpgradeList[i].shown !== undefined) {
					upgradeList[j].shown = savedUpgradeList[i].shown;
				}
				if (savedUpgradeList[i].purchased !== undefined) {
					upgradeList[j].purchased = savedUpgradeList[i].purchased;
				}
			}
			success=false;
		}
	};

	//Getters
	self.getExcelia = function() {
		return excelia;
	};

	//Setters
	self.setExcelia = function(number) {
		excelia = number;
		self.loadExcelia();
	};

	//Other Methods
	self.loadExcelia = function() {
		document.getElementById("excelia").innerHTML = Math.round(100*excelia)/100;
	};

	self.loadTimeUpgrades = function() {
		for (var i = 0; i < upgradeList.length; i++) {
			if (upgradeList[i].id == "timewarp1" && upgradeList[i].purchased === true) {
				document.getElementById("speed2").innerHTML = '<button class="btn btn-primary" onClick="system.gameSpeed(500)">x2</button>';
			}
			else if (upgradeList[i].id == "timewarp2" && upgradeList[i].purchased === true) {
				document.getElementById("speed5").innerHTML = '<button class="btn btn-primary" onClick="system.gameSpeed(200)">x5</button>';
			}
			else if (upgradeList[i].id == "timewarp3" && upgradeList[i].purchased === true) {
				document.getElementById("speed10").innerHTML = '<button class="btn btn-primary" onClick="system.gameSpeed(100)">x10</button>';
			}
		}
	};

	self.gainExcelia = function(monster) {
		var gain = buffs.getExceliaMultiplier() * (monster.strength + monster.constitution + monster.dexterity)/15;
		self.updateExcelia(gain);
		self.updateUpgrades();
	};

	self.updateExcelia = function(moreExcelia) {
		excelia += moreExcelia;
		self.loadExcelia();
	};

	self.updateUpgrades = function() {
		document.getElementById("upgrades").innerHTML = '';
		for (var i = 0; i < upgradeList.length; i++) {
			if (!upgradeList[i].purchased && self.isUpgradePurchased(upgradeList[i].required)) {
				upgradeList[i].shown = true;
				document.getElementById("upgrades").innerHTML += '<div class="row"><div class="col-xs-7"><button class="btn btn-primary btn-block" data-toggle="tooltip" data-placement="top" title="' + upgradeList[i].description + '" onClick="upgrades.buyUpgrade(\'' + upgradeList[i].id + '\')">' + upgradeList[i].name + '</button></div><div class="col-xs-5"><p>(花费: ' + upgradeList[i].exceliaCost + ')</p></div></div><div class="row" style="height: 5px;"></div>';
			}
		}
		$(document).ready(function(){
			$('[data-toggle="tooltip"]').tooltip(); 
		});
	};

	self.isUpgradePurchased = function(upgradeId) {
		if (upgradeId === "") {
			return true;
		}
		else {
			for (var i = 0; i < upgradeList.length; i++) {
				if (upgradeList[i].id == upgradeId) {
					if (upgradeList[i].purchased) {
						return true;
					}
					else {
						return false;
					}
				}
			}
			return false;
		}
	};

	self.buyUpgrade = function(upgradeId) {
		for (var i = 0; i < upgradeList.length; i++) {
			if (upgradeList[i].id == upgradeId) {
				break;
			}
		}
		if (excelia >= upgradeList[i].exceliaCost) {
			self.updateExcelia(-upgradeList[i].exceliaCost);
			upgradeList[i].purchased = true;
			activateUpgrade(upgradeList[i]);
			self.updateUpgrades();
		}
		buffs.updatePermanentBuffs();
		buffs.updateToggleableBuffs();
	};

	var activateUpgrade = function(upgrade) {
		if (upgrade.id == "timewarp1" || upgrade.id == "timewarp2" || upgrade.id == "timewarp3") {
			self.loadTimeUpgrades();
		}
		else if (upgrade.id == "aetheric1" || upgrade.id == "aetheric2") {
			buffs.setManaPerSecond(buffs.getManaPerSecond() + 1);
		}
		else if (upgrade.id == "battleHealing") {
			buffs.setCastCureInBattle(true);
		}
		else if (upgrade.id == "doubleexcelia1" || upgrade.id == "doubleexcelia2") {
			buffs.setExceliaMultiplier(buffs.getExceliaMultiplier() * 2);
		}
		else if (upgrade.id == "adeptmage") {
			buffs.setSpellLevelingMultiplier(buffs.getSpellLevelingMultiplier() * 2);
		}
		else if (upgrade.id == "blessings1" || upgrade.id == "blessings2" || upgrade.id == "blessings3") {
			buffs.setExceliaSavedOnDeath(buffs.getExceliaSavedOnDeath() + 10);
		}
		else if (upgrade.id == "autoshoot") {
			buffs.setCastFireballInBattle(true);
		}
		else if (upgrade.id == "fastresting1" || upgrade.id == "fastresting2" || upgrade.id == "fastresting3") {
			buffs.setRestingMultiplier(buffs.getRestingMultiplier() * 2);
		}
		else if (upgrade.id == "musclememory1" || upgrade.id == "musclememory2") {
			buffs.setDeathPenaltyReduction(buffs.getDeathPenaltyReduction() + 1);
		}
		else if (upgrade.id == "barriercast") {
			buffs.setAutoBarrierCast(true);
		}
		else if (upgrade.id == "fasterleveling1" || upgrade.id == "fasterleveling2" || upgrade.id == "fasterleveling3") {
			buffs.setLevelingSpeedMultiplier(buffs.getLevelingSpeedMultiplier() * 2);
		}
		else if (upgrade.id == "fasterexploration1" || upgrade.id == "fasterexploration2" || upgrade.id == "fasterexploration3") {
			buffs.setExplorationSpeedMultiplier(buffs.getExplorationSpeedMultiplier() * 2);
		}
	};
};

var upgrades = new Upgrades();