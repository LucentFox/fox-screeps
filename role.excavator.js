var creepJobs = require('creep.jobs');
var roomLogic = require('room.logic');

const roleName = "excavator";
const optimalPopulation = {1:0, 2:0, 3:1, 4:1, 5:1, 6:1, 7:1, 8:1};
const creepBuilds = {
    800: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE],
    1300: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE],
    1750: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE],
    1800: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE]
};
var roleDrone = {
    populate: function(){
        roomLogic.spawnCreeps(roleName, optimalPopulation, creepBuilds, false, true);
    },
    activate: function(creep) {

        if(creepJobs.replenish(creep)){return;};

        creepJobs.store(creep);
        if(creep.store.getFreeCapacity() > 10) {
            creepJobs.gatherSource(creep);
        }
	}
};

module.exports = roleDrone;