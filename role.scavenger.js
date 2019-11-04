var creepJobs = require('creep.jobs');
var roomLogic = require('room.logic');

const roleName = "scavenger";
const optimalPopulation = {1:12, 2:12, 3:10, 4:4, 5:8, 6:8, 7:8, 8:8};
const creepBuilds = {
    300: [WORK,CARRY,MOVE,MOVE],
    350: [WORK,CARRY,MOVE,MOVE],
    400: [WORK,CARRY,MOVE,MOVE],
    450: [WORK,CARRY,MOVE,MOVE],
    500: [WORK,CARRY,MOVE,MOVE],
    550: [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE],
    600: [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
    800: [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
    1300: [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
    1750: [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
    1800: [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
};

var roleDrone = {
    populate: function(){
        roomLogic.spawnCreeps(roleName, optimalPopulation, creepBuilds, true);
    },
    activate: function(creep) {
        var roomInfo = roomLogic.getRoomInfo(creep.room);

        const exit = creep.pos.findClosestByRange(FIND_EXIT_RIGHT);
        if(exit && creep.moveTo(exit, {visualizePathStyle: {stroke: '#ffff00'}}) === 0) {return;};

        //items that always happen
        creepJobs.updateStatus(creep);
        creepJobs.pave(creep);

        //if we need charging go for sources based on ones that decay first
        if(!creep.memory.charged){
           creepJobs.gatherSource(creep);
        }

        //if we're all charged up, let's do some stuff
        if(creep.memory.charged){
            creepJobs.deposit(creep) ||
            creepJobs.build(creep) ||
            creepJobs.repair(creep) ||
            creepJobs.upgrade(creep)
        }
    }
};

module.exports = roleDrone;