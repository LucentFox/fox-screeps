var levelLogic = require('logic.level');

var populationManager = {
    run: function() {
        var drones = _.filter(Game.creeps, (creep) => creep.memory.role == 'drone');
        
        if(drones.length < 12) {
            var newName = 'drone' + Game.time;
            var retval = 0;
            
            for(var name in Game.spawns){
                var spawn = Game.spawns[name];
                var effectiveLevel = levelLogic.getEffectiveLevel(spawn.room);

                if(spawn.room.energyCapacityAvailable >= 800)
                {
                    var retval = spawn.spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'drone'}});
                }
                else if(spawn.room.energyCapacityAvailable >= 600)
                {
                    var retval = spawn.spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'drone'}});
                }
                else if(spawn.room.energyCapacityAvailable >= 550)
                {
                    var retval = spawn.spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: 'drone'}});
                }
                else{
                    var retval = spawn.spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'drone'}});
                }
            }
        }
    }
};

module.exports = populationManager;