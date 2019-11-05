var creepJobs = require('creep.jobs');
var roomLogic = require('room.logic');

const roleName = "drone";
const optimalPopulation = {1:6, 2:6, 3:6, 4:4, 5:4, 6:4, 7:4, 8:4};
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
        roomLogic.spawnCreeps(roleName, optimalPopulation, creepBuilds, true, false);

        roomLogic.bootstrapCreeps(roleName, creepBuilds[300]);
    },
    activate: function(creep) {
        var roomInfo = roomLogic.getRoomInfo(creep.room);

        //items that always happen
        //if(creepJobs.replenish(creep)){return;};

        creepJobs.updateStatus(creep);
        creepJobs.pave(creep);

        //if we need charging go for sources based on ones that decay first
        if(!creep.memory.charged){
            if(creepJobs.gatherDropped(creep) || creepJobs.gatherTombstone(creep) || creepJobs.gatherRuins(creep)) {return;}
            if(creepJobs.touchSourch(creep)) {return;}

            if(roomInfo.containerAvailable < 150) { creep.memory.harvesting = true; }
            if(roomInfo.containerAvailable > 600) { creep.memory.harvesting = false; }
            if(creep.memory.harvesting ? creepJobs.gatherSource(creep) : creepJobs.withdraw(creep)){return;};
            
            if(creepJobs.noop(creep)) {return;};
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