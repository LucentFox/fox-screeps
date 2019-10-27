var brain = require('brain');

var roleDrone = {

    /** @param {Creep} creep **/
    run: function(creep) {

        creep.say('⭐');
        brain.recharge(creep);

        //if we're all charged up, let's do some stuff
        if(creep.memory.charged){
            
            //if we low on avaialble energy in the room, then let's stock up a bit to build new units
            if(creep.room.energyAvailable < 800 && brain.deposit(creep)) {
                return;
            };

            //check to see if anything needs repairing
            if(brain.repair(creep)){
                return;
            }

            //once we have enough base energy, focus on building
            if(brain.build(creep)){
                return;
            };

            //once we're done building, let's top off our stores
            if(brain.deposit(creep)){
                return;
            };

            brain.upgrade(creep);
        }
	}
};

module.exports = roleDrone;