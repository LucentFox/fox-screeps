var roleDrone = require('role.drone');

var creepManager = {
    run: function() {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.spawning) { continue; } //don't try to direct creeps that are spawning.

            if(creep.memory.role == 'drone') {
                roleDrone.activate(creep);
                continue;
            }

            //if creep doesn't have an assigned role then it defaults to a drone;
            roleDrone.run(creep);
        }
    }
}

module.exports = creepManager;