var jobLogic = require('logic.jobs');
var roomLogic = require('logic.room');

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
                var effectiveLevel = roomLogic.getRoomInfo(spawn.room);

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
                    var retval = spawn.spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: roleName}});
                }
            }
        }

    },
    activate: function(creep) {
        //items that always happen
        jobLogic.updateStatus(creep);
        jobLogic.pave(creep);

        //if we need charging go for sources based on ones that decay first
        if(!creep.memory.charged){
            jobLogic.gatherDropped(creep) || jobLogic.gatherTombstone(creep) || jobLogic.gatherRuins(creep) || jobLogic.gatherSource(creep)
        }

        //if we're all charged up, let's do some stuff
        if(creep.memory.charged){
            
            //if we low on avaialble energy in the room, then let's stock up a bit to build new units
            if(creep.room.energyAvailable < 800 && jobLogic.deposit(creep)) {
                return;
            };

            //check to see if anything needs repairing
            if(jobLogic.repair(creep)){
                return;
            }

            //once we have enough base energy, focus on building
            if(jobLogic.build(creep)){
                return;
            };

            //once we're done building, let's top off our stores
            if(jobLogic.deposit(creep)){
                return;
            };

            //lastly, once we're on top of everything focus on upgrading.
            jobLogic.upgrade(creep);
        }
	}
};

module.exports = roleDrone;