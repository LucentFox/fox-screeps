var creepTasks = {
    storeEnergy: function(creep, store){
        if(store) {
            if(creep.transfer(store, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(store, {visualizePathStyle: {stroke: '#00ff00'}});
            }
            return true;
        }
        else {
            return false;
        }
    },
    withdrawEnergy: function(creep, container){
        if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(container, {visualizePathStyle: {stroke: '#00ff00'}});
        }
        creep.say('⚡');
    },
    moveHarvest: function(creep, source){
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            if(creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}}) === ERR_NO_PATH){
            };
        }
    }
}
module.exports = creepTasks;