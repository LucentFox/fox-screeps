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
    }
}
module.exports = creepTasks;