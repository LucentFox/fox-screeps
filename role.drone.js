var jobLogic = require('creep.jobs');
var roomLogic = require('room.logic');

const roleName = "drone";

var roleDrone = {
    /** @param {Creep} creep **/
    populate: function(){
        var drones = _.filter(Game.creeps, (creep) => creep.memory.role === roleName);
        
        if(drones.length < 12) {
            var newName = roleName + Game.time;
            var retval = 0;
            
            for(var name in Game.spawns){
                var spawn = Game.spawns[name];
                var roomInfo = roomLogic.getRoomInfo(spawn.room);

                if(spawn.room.energyCapacityAvailable >= 800)
                {
                    var retval = spawn.spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: roleName}});
                }
                else if(spawn.room.energyCapacityAvailable >= 600)
                {
                    var retval = spawn.spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: roleName}});
                }
                else if(spawn.room.energyCapacityAvailable >= 550)
                {
                    var retval = spawn.spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: roleName}});
                }
                else{
                    var retval = spawn.spawnCreep([WORK,CARRY,MOVE,MOVE], newName, {memory: {role: roleName}});
                }
            }
        }

    },
    activate: function(creep) {
        var roomInfo = roomLogic.getRoomInfo(creep.room);

        //items that always happen
        jobLogic.updateStatus(creep);
        jobLogic.pave(creep);

        //if we need charging go for sources based on ones that decay first
        if(!creep.memory.charged){
            jobLogic.gatherDropped(creep) || 
            jobLogic.gatherTombstone(creep) || 
            jobLogic.gatherRuins(creep) || 
            jobLogic.withdraw(creep) || 
            jobLogic.gatherSource(creep)
        }

        //if we're all charged up, let's do some stuff
        if(creep.memory.charged){
            jobLogic.deposit(creep) ||
            jobLogic.build(creep) ||
            jobLogic.repair(creep) ||
            jobLogic.upgrade(creep)
        }
	}
};

module.exports = roleDrone;