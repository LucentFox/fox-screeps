var roomLogic = {
    getRoomInfo: function(room) {
        var roomInfo = {
            roomLevel: room.controller.level,
            energyAvailable: room.energyAvailable,
            energyCapacity: room.energyCapacityAvailable,
            constructionSites: room.find(FIND_CONSTRUCTION_SITES).length,
            containerAvailable: _.sum(room.find(FIND_STRUCTURES,{filter:{structureType: STRUCTURE_CONTAINER}}), (structure) => {return structure.store.getUsedCapacity(RESOURCE_ENERGY)}),
            containerCapacity: _.sum(room.find(FIND_STRUCTURES,{filter:{structureType: STRUCTURE_CONTAINER}}), (structure) => {return structure.store.getCapacity(RESOURCE_ENERGY)})
        }
        
        
        return roomInfo;
    },
    spawnCreeps: function(roleName, optimalPopulation, creepBuilds){
        for(var name in Game.spawns){
            var spawn = Game.spawns[name];
            var roomInfo = roomLogic.getRoomInfo(spawn.room);
            var creepsInRole = _.filter(Game.creeps, (creep) => creep.memory.role === roleName);
            if(creepsInRole.length < optimalPopulation[roomInfo.roomLevel]) {
                var newName = roleName + Game.time;
                var retval = 0;
                var retval = spawn.spawnCreep(creepBuilds[roomInfo.energyCapacity], newName, {memory: {role: roleName}});
                }
            }
    }
}

module.exports = roomLogic;