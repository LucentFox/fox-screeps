var locatorLogic = require('logic.locator');
var levelLogic = require('room.logic');
var creepTasks = require('creep.tasks');

var jobLogic = {
    replenish: function(creep){
        if(creep.ticksToLive < 250 || creep.memory.replenish){

            creep.memory.replenish = true;
            if(creep.ticksToLive >=1450) {creep.memory.replenish = false;}

            var spawns = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType === STRUCTURE_SPAWN && !structure.spawning;}});

            if(spawns.length){
                var spawn = spawns[0];
                creep.moveTo(spawn);
                spawn.renewCreep(creep);
                creep.say('➕');
                return true;
            }
            else{
                return false;
            }
        }
    },

    updateStatus: function(creep) {
        if(typeof creep.memory.charged === 'undefined' || (creep.memory.charged && creep.store[RESOURCE_ENERGY] == 0)) {
            creep.memory.charged = false;
            creep.say('⛏');
        }

        if(!creep.memory.charged && creep.store.getFreeCapacity() == 0) {
            creep.memory.charged = true;
            creep.say('⚡');
        }
    },
   
    gatherDropped: function(creep){
        //gather dropped resources as a priority
        var dropped_resources = creep.room.find(FIND_DROPPED_RESOURCES, {filter: function(resource){
            if(resource.resourceType !== RESOURCE_ENERGY) {return false;}
            if(resource.amount < 30) {return false;} 
            if(resource.pos.findInRange(FIND_HOSTILE_CREEPS, 5).length > 0) {return false;}
            return true; 
        }});
        if(dropped_resources.length){
            if(creep.pickup(dropped_resources[0]) === ERR_NOT_IN_RANGE){
                creep.moveTo(dropped_resources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            creep.say('♻');
            return true;
        }
        return false;
    },

    gatherRuins: function(creep){
        //TODO: Implement
        return false;
    },

    gatherTombstone: function(creep){
        var stones = creep.room.find(FIND_TOMBSTONES, {filter: function(stone){
            if(stone.pos.findInRange(FIND_HOSTILE_CREEPS, 10).length > 0) {return false;}
            if(stone.creep.store[RESOURCE_ENERGY] < 50 && stone.store[RESOURCE_ENERGY] < 50) {return false;}
            return true;
        }});
        
        if(stones.length){
            var tombstone = stones[0];
            if(creep.withdraw(tombstone, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                creep.moveTo(tombstone, {visualizePathStyle: {stroke: '#ff0000'}});
            }
            creep.say('☠');
            return true;
        }
        return false;
    },
    //sources only start to regenerate after first touched, go a bump it so that we get the regen counter started.
    touchSourch: function(creep){
        var source = locatorLogic.findPristineSource(creep);
        if(source) {
            creepTasks.moveHarvest(creep, source);
            creep.say('👇');
            return true;
        }
        return false;
    },
    gatherSource: function(creep) {
            if(creep.memory.optimalSourceId == null || typeof creep.memory.optimalSourceId === 'undefined')
            {
                creep.memory.optimalSourceId = locatorLogic.findOptimalSource(creep);
            }
            var source = Game.getObjectById(creep.memory.optimalSourceId);
            if(!source || source.energy === 0){
                creep.memory.optimalSourceId = locatorLogic.findOptimalSource(creep);
                //since the source is empty, before switching again, just use up what we have.
                creep.memory.charged = true;
                return false;
            }
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                if(creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}}) === ERR_NO_PATH){
                    creep.memory.optimalSourceId = locatorLogic.findOptimalSource(creep);
                };
            }
            creep.say('⛏');
            return true;

    },

    pave: function(creep) {
        var roomInfo = levelLogic.getRoomInfo(creep.room);
        if(roomInfo.roomLevel < 3 || roomInfo.constructionSites >= 5) {return;}
        if(creep.pos.lookFor(LOOK_STRUCTURES).length > 0) {return;}

        var x = creep.pos.x;
        var y = creep.pos.y;
        creep.room.createConstructionSite(x, y, STRUCTURE_ROAD);
    },
    store: function(creep) {
        //creep.say('💰💰');
        var store = locatorLogic.findOptimalBigStore(creep);
        return creepTasks.storeEnergy(creep,store);

    },
    deposit: function(creep) {
        creep.say('💰');
        var store = locatorLogic.findOptimalStore(creep);
        return creepTasks.storeEnergy(creep,store);
    },
    withdraw: function(creep){
        var store = locatorLogic.findAvailableBigStore(creep);

        if(store) {
            creepTasks.withdrawEnergy(creep,store);
            return true;
        }
        else {
            return false;
        }
    },
    build: function(creep){
        
        var site = locatorLogic.findOptimalSite(creep);
        
        if(site && creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
            if(creep.build(site) == ERR_NOT_IN_RANGE) {
                creep.moveTo(site, {visualizePathStyle: {stroke: '#0000ff'}});
            }
            creep.say('🛠');
            return true;
        }
        else {
            return false;
        }
    },

    upgrade: function(creep)
    {
        if(creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
            creep.say('🚀');
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ff00ff'}});
            }
            //every once in a while bump a little closer to allow more creeps to fit in the vicinity
            if(Game.time % 10 === 0){
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ff00ff'}});
            }

            return true;
        }
        else {
            return false;
        }
    },

    repair: function(creep){
        creep.say('🔨');
        var structureToRepair = creep.room.find(FIND_STRUCTURES, {
            filter: function(structure){
                if(structure.structureType === STRUCTURE_ROAD) {return false;}
                if(structure.structureType === STRUCTURE_CONTROLLER) {return false;}
                if(structure.structureType === STRUCTURE_WALL && structure.hits > 20000) {return false;}
                if(structure.hits === structure.hitsMax) {return false;}
                return true;
            } 
        })[0];

        if (structureToRepair && creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
            if(creep.repair(structureToRepair) == ERR_NOT_IN_RANGE){
                creep.moveTo(structureToRepair, {visualizePathStyle: {stroke: '#00ffff'}});
            };
            return true;
        } 
        else {
          return false;
        }
    },
    noop: function(creep){
        creep.say('⏳');
        creep.moveTo(room.controller);
        return true;
    }
};

module.exports = jobLogic;