var jobLogic = require('creep.jobs');
var roomLogic = require('room.logic');

const roleName = "scout";
const optimalPopulation = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0};
const creepBuilds = {
    300: [CLAIM,MOVE,MOVE],
    350: [CLAIM,MOVE,MOVE],
    400: [CLAIM,MOVE,MOVE],
    450: [CLAIM,MOVE,MOVE],
    500: [CLAIM,MOVE,MOVE],
    550: [CLAIM,MOVE,MOVE],
    600: [CLAIM,MOVE,MOVE],
    800: [CLAIM,MOVE,MOVE],
    1300: [CLAIM,MOVE,MOVE],
    1750: [CLAIM,MOVE,MOVE],
    1800: [CLAIM,MOVE,MOVE]
};

var roleScout = {
    /** @param {Creep} creep **/
    populate: function(){
        roomLogic.spawnCreeps(roleName, optimalPopulation, creepBuilds, false, false);
    },
    activate: function(creep) {
        creep.say("🧭");
        const exit = creep.pos.findClosestByRange(FIND_EXIT_RIGHT);
        if(exit && creep.moveTo(exit, {visualizePathStyle: {stroke: '#ffff00'}}) === 0) {return;};

        var roomInfo = roomLogic.getRoomInfo(creep.room);
        
        //claim or reserver controller in room
        var controller = creep.room.controller;
        if(controller) {
            creep.say("🏴‍");
            if(creep.claimController(controller) === ERR_NOT_IN_RANGE){
                creep.moveTo(controller, {visualizePathStyle: {stroke: '#00ff00'}});
            };
            // if(creep.reserveController(controller) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(controller, {visualizePathStyle: {stroke: '#ff0000'}});
            // }
        }
        
        
	}
};

module.exports = roleScout;