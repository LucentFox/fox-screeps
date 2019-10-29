var jobLogic = require('creep.jobs');
var roomLogic = require('room.logic');

const roleName = "excavator";

var roleDrone = {
    populate: function(){
        var creepsInRole = _.filter(Game.creeps, (creep) => creep.memory.role === roleName);
        
        if(creepsInRole.length < 2) {
            var newName = roleName + Game.time;
            var retval = 0;
            
            for(var name in Game.spawns){
                var spawn = Game.spawns[name];
                var roomInfo = roomLogic.getRoomInfo(spawn.room);
                if(roomInfo.energyCapacity >= 800) {
                     var retval = spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], newName, {memory: {role: roleName}});
                }
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