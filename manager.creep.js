var roleDrone = require('role.drone');

var creepManager = {
    run: function() {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.spawning) { continue; } //don't try to direct creeps that are spawning.

            if(creep.memory.role == 'drone') {
                roleDrone.populate();
                roleDrone.activate(creep);
                continue;
            }

           
        }
    }
}

module.exports = creepManager;