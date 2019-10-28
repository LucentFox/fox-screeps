var roleDrone = require('role.drone');
var roleExcavator = require('role.excavator');

var creepManager = {
    run: function() {
        roleDrone.populate();
        roleExcavator.populate();

        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.spawning) { continue; } //don't try to direct creeps that are spawning.
            if(creep.memory.role == 'drone') { roleDrone.activate(creep); continue; }
            if(creep.memory.role == 'excavator') { roleExcavator.activate(creep); continue; }
        }
    }
}

module.exports = creepManager;