var jobLogic = require('creep.jobs');
var roomLogic = require('room.logic');

const roleName = "drone";
const optimalPopulation = {1:12, 2:12, 3:10, 4:6};
const creepBuilds = {
    300: [WORK,CARRY,MOVE,MOVE],
    350: [WORK,CARRY,MOVE,MOVE],
    400: [WORK,CARRY,MOVE,MOVE],
    450: [WORK,CARRY,MOVE,MOVE],
    500: [WORK,CARRY,MOVE,MOVE],
    550: [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE],
    600: [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
    800: [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
    1300: [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
};

var roleDrone = {
    /** @param {Creep} creep **/
    populate: function(){
        for(var name in Game.spawns){
            var spawn = Game.spawns[name];
            var roomInfo = roomLogic.getRoomInfo(spawn.room);

            var creepsInRole = _.filter(Game.creeps, (creep) => creep.memory.role === roleName);
            if(creepsInRole.length < optimalPopulation[roomInfo.roomLevel]) {
                var newName = roleName + Game.time;
                var retval = 0;
                var retval = spawn.spawnCreep(creepBuilds[roomInfo.energyAvailable], newName, {memory: {role: roleName}});
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