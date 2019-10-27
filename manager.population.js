

var populationManager = {
    run: function() {

        var drones = _.filter(Game.creeps, (creep) => creep.memory.role == 'drone' || creep.memory.role == 'specialist');
    
        if(drones.length < 8) {
            var newName = 'drone' + Game.time;
            var retval = 0;

            for(var name in Game.spawns){
                var spawn = Game.spawns[name];

                if(spawn.room.energyCapacityAvailable >= 800)
                {
                    var retval = spawn.spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'drone'}});
                }
                else if(spawn.room.energyCapacityAvailable >= 600)
                {
                    var retval = spawn.spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'drone'}});
                }
                else if(spawn.room.energyCapacityAvailable >= 400)
                {
                    var retval = spawn.spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, {memory: {role: 'drone'}});
                }
                else{
                    var retval = spawn.spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'drone'}});
                }

                if(retval == ERR_NOT_ENOUGH_ENERGY){
                //console.log('Not enough energy: ' + spawn.room.energyAvailable + '/' + spawn.room.energyCapacityAvailable); 
                }
            }
        }
    }
};

module.exports = populationManager;