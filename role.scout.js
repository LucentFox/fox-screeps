var jobLogic = require('creep.jobs');
var roomLogic = require('room.logic');

const roleName = "scout";

var roleScout = {
    /** @param {Creep} creep **/
    populate: function(){
        var scouts = _.filter(Game.creeps, (creep) => creep.memory.role === roleName);
        
        if(scouts.length < 1) {
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
        var roomInfo = roomLogic.getRoomInfo(creep.room);

        var controller = Game.getObjectById('5982feabb097071b4adc1587');
        
        if(controller && creep.room.name === controller.room.name) {
            creep.claimController(controller);
            if(creep.reserveController(controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller, {visualizePathStyle: {stroke: '#ff0000'}});
            }
        }
        else{
            creep.moveTo(7,49, {visualizePathStyle: {stroke: '#ff0000'}});
        }

        //creep.say("🧭");
        creep.say("🏴‍");
        
	}
};

module.exports = roleScout;