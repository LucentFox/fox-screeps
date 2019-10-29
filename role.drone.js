var jobLogic = require('creep.jobs');
var roomLogic = require('room.logic');

const roleName = "drone";
const optimalPopulation = {overload: 1, 1:12, 2:12, 3:10, 4:3};
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
    populate: function(){
        roomLogic.spawnCreeps(roleName, optimalPopulation, creepBuilds);
    },
    activate: function(creep) {
        var roomInfo = roomLogic.getRoomInfo(creep.room);

        //items that always happen
        jobLogic.updateStatus(creep);
        jobLogic.pave(creep);

        //if we need charging go for sources based on ones that decay first
        if(!creep.memory.charged){
            if(jobLogic.gatherDropped(creep) || jobLogic.gatherTombstone(creep) || jobLogic.gatherRuins(creep)) {return;}
            

            if(roomInfo.containerAvailable < 150) { creep.memory.harvesting = true; }
            if(roomInfo.containerAvailable > 600) { creep.memory.harvesting = false; }
            if(creep.memory.harvesting ? jobLogic.gatherSource(creep) : jobLogic.withdraw(creep)){return;};
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