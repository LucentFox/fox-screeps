var roomLogic = {
    getRoomInfo: function(room) {
        var roomInfo = {
            roomLevel: room.controller ? room.controller.level : 0,
            energyAvailable: room.energyAvailable,
            energyCapacity: room.energyCapacityAvailable,
            constructionSites: room.find(FIND_CONSTRUCTION_SITES).length,
            containerAvailable: _.sum(room.find(FIND_STRUCTURES,{filter:{structureType: STRUCTURE_CONTAINER}}), (structure) => {return structure.store.getUsedCapacity(RESOURCE_ENERGY)}),
            containerCapacity: _.sum(room.find(FIND_STRUCTURES,{filter:{structureType: STRUCTURE_CONTAINER}}), (structure) => {return structure.store.getCapacity(RESOURCE_ENERGY)})
        }
        
        return roomInfo;
    },
    spawnGlobalCreeps: function(roleName, optimalPopulation, creepBuilds, enableAdaptivePopulation){
        for(var name in Game.spawns){
            var spawn = Game.spawns[name];
            var roomInfo = roomLogic.getRoomInfo(spawn.room);
            var youngCreepsInRole = _.filter(Game.creeps, (creep) => (creep.memory.role === roleName && creep.ticksToLive > 150));
            
            if(youngCreepsInRole.length < optimalPopulation[roomInfo.roomLevel] || (enableAdaptivePopulation && roomInfo.containerAvailable >= 3500)) {
                var newName = roleName + Game.time;
                var retval = 0;
                var retval = spawn.spawnCreep(creepBuilds[roomInfo.energyCapacity], newName, {memory: {role: roleName}});
                }
            }
    },
    spawnRoomCreeps: function(roleName, optimalPopulation, creepBuilds, enableAdaptivePopulation){
        for(var name in Game.spawns){
            var spawn = Game.spawns[name];
            var roomInfo = roomLogic.getRoomInfo(spawn.room);
            var youngCreepsInRole = spawn.room.find(FIND_MY_CREEPS, {filter: (creep) => creep.memory.role === roleName && creep.ticksToLive > 150});
            
            if(youngCreepsInRole.length < optimalPopulation[roomInfo.roomLevel] || (enableAdaptivePopulation && roomInfo.containerAvailable >= 3500)) {
                console.log(spawn.room.name, ":", roleName, ":", youngCreepsInRole.length,"/",optimalPopulation[roomInfo.roomLevel]);
                var newName = roleName + Game.time;
                var retval = 0;
                var retval = spawn.spawnCreep(creepBuilds[roomInfo.energyCapacity], newName, {memory: {role: roleName}});
                }
            }
    },
    bootstrapCreeps: function(roleName, build){
        if(Object.keys(Game.creeps).length <= 2){
            console.log("no creeps starting over...");
            var newName = roleName + Game.time;
            for(var name in Game.spawns){
                var spawn = Game.spawns[name];
                spawn.spawnCreep(build, newName, {memory: {role: roleName}});
            }
        }
    }
}

module.exports = roomLogic;