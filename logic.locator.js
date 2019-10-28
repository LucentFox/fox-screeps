var locatorLogic = {
    findOptimalSource: function(creep) {
        var safeSources = creep.room.find(FIND_SOURCES, {filter: function(item){ 
            if(item.pos.findInRange(FIND_HOSTILE_CREEPS, 5).length > 0) {return false;}
            return true; 
        }});
    
        var optimalSource = safeSources[Math.floor(Math.random() * safeSources.length)];
    
        return optimalSource ? optimalSource.id : null;
    },
    findOptimalStore: function(creep){
        var store = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && 
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });

        return store;
    },
    findOptimalSite: function(creep){
        return creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
    }
}

module.exports = locatorLogic;