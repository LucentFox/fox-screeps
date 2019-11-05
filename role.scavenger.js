var creepJobs = require('creep.jobs');
var roomLogic = require('room.logic');
var roleDrone = require('role.drone');

const roleName = "scavenger";
const optimalPopulation = {1:0, 2:0, 3:0, 4:0, 5:6, 6:6, 7:6, 8:6};
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

var roleScavenger = {
    populate: function(){
        roomLogic.spawnCreeps(roleName, optimalPopulation, creepBuilds, false, false);
    },
    activate: function(creep) {
        const exit = creep.pos.findClosestByRange(FIND_EXIT_RIGHT);
        if(exit && creep.moveTo(exit, {visualizePathStyle: {stroke: '#ffff00'}}) === 0) {return;};
        
        roleDrone.activate(creep);
    }
};

module.exports = roleScavenger;