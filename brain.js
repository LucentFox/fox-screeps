function findOptimalSource(creep){
    var safeSources = creep.room.find(FIND_SOURCES, {filter: function(item){ 
        if(item.pos.findInRange(FIND_HOSTILE_CREEPS, 5).length > 0) {return false;}
        return true; 
    }});

    var optimalSource = safeSources[Math.floor(Math.random() * safeSources.length)];

    return optimalSource ? optimalSource.id : null;
}

var brain = {

    recharge: function(creep) {

        if(typeof creep.memory.charged === 'undefined' || (creep.memory.charged && creep.store[RESOURCE_ENERGY] == 0)) {
            creep.memory.charged = false;
            creep.say('🔄');
        }

        if(!creep.memory.charged && creep.store.getFreeCapacity() == 0) {
            creep.memory.charged = true;
            creep.say('⚡');
        }

	    if(!creep.memory.charged) {
            var sourceLabel = creep.memory.optimalSourceId ? creep.memory.optimalSourceId.substring(creep.memory.optimalSourceId.length - 2) : "?"
            creep.say('⛏ (' + sourceLabel + ')');

            //gather dropped resources as a priority
            var dropped_resources = creep.room.find(FIND_DROPPED_RESOURCES, {filter: function(item){ 
                if(item.pos.findInRange(FIND_HOSTILE_CREEPS, 5).length > 0) {return false;}
                return true; 
            }});
            if(dropped_resources.length){
                if(creep.pickup(dropped_resources[0]) === ERR_NOT_IN_RANGE){
                    creep.moveTo(dropped_resources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
                return;
            }
            
            //gather resources from a source
            if(creep.memory.optimalSourceId == null || typeof creep.memory.optimalSourceId === 'undefined')
            {
                creep.memory.optimalSourceId = findOptimalSource(creep);
            }
            
            var source = Game.getObjectById(creep.memory.optimalSourceId);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                if(creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}}) === ERR_NO_PATH){
                    creep.memory.optimalSourceId = findOptimalSource(creep);
                };
            }
	    }
    },

    deposit: function(creep) {
        creep.say('💰');

        var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && 
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if(target) {
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return true;
        }
        else {
            return false;
        }
    },

    build: function(creep){
        creep.say('🛠');

        var site = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        if(site){
            if(creep.build(site) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(site, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return true;
        }
        else {
            return false;
        }
    },

    upgrade: function(creep)
    {
        creep.say('🚀');
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    },

    repair: function(creep){
        creep.say('🔨');
        var structureToRepair = creep.room.find(FIND_STRUCTURES, {
            filter: function(structure){
                if(structure.structureType === STRUCTURE_CONTROLLER) {return false;}
                if(structure.structureType === STRUCTURE_WALL && structure.hits > 20000) {return false;}
                if(structure.hits > (structure.hitsMax * .9)) {return false;}
                return true;
            } 
        })[0];

        if (structureToRepair){
            if(creep.repair(structureToRepair) == ERR_NOT_IN_RANGE){
                creep.moveTo(structureToRepair, {visualizePathStyle: {stroke: '#ffffff'}});
            };
            return true;
        } 
        else {
          return false;
        }
    }
};

module.exports = brain;