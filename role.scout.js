var jobLogic = require('creep.jobs');
var roomLogic = require('room.logic');

const roleName = "scout";

var roleScout = {
    /** @param {Creep} creep **/
    populate: function(){
        var scouts = _.filter(Game.creeps, (creep) => creep.memory.role === roleName);
        
        if(scouts.length < 0) {
            var newName = roleName + Game.time;
            var retval = 0;
            
            for(var name in Game.spawns){
                var spawn = Game.spawns[name];
                var roomInfo = roomLogic.getRoomInfo(spawn.room);
                
                if(roomInfo.roomLevel >= 3) {
                    var retval = spawn.spawnCreep([CLAIM,MOVE,MOVE], newName, {memory: {role: roleName}});
                }
            }
        }

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