var jobLogic = require('creep.jobs');
var roomLogic = require('room.logic');

const roleName = "excavator";

const optimalPopulation = {1:0, 2:0, 3:2, 4:1};
const creepBuilds = {
    800: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE],
    1300: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE]
};
var roleDrone = {
    populate: function(){
        var creepsInRole = _.filter(Game.creeps, (creep) => creep.memory.role === roleName);
        
        for(var name in Game.spawns){
            var spawn = Game.spawns[name];
            var roomInfo = roomLogic.getRoomInfo(spawn.room);
            
            if(creepsInRole.length < optimalPopulation[roomInfo.roomLevel]) {
                var newName = roleName + Game.time;
                var retval = 0;
                
                var retval = spawn.spawnCreep(creepBuilds[roomInfo.evergyAvailable], newName, {memory: {role: roleName}});
                
            }
        }

    },
    activate: function(creep) {
        jobLogic.store(creep);
        if(creep.store.getFreeCapacity() > 10) {
            jobLogic.gatherSource(creep);
        }
	}
};

module.exports = roleDrone;