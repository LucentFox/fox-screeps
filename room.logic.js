var roomLogic = {
    getRoomInfo: function(room) {
        var roomInfo = {
            roomLevel: room.controller.level,
            energyAvailable: room.energyAvailable,
            energyCapacity: room.energyCapacityAvailable,
            constructionSites: room.find(FIND_CONSTRUCTION_SITES).length,
            containerAvailable: _.sum(room.find(FIND_STRUCTURES,{filter:{structureType: STRUCTURE_CONTAINER}}), (structure) => {return structure.store.getUsedCapacity(RESOURCE_ENERGY)}),
            containerCapacity: _.sum(room.find(FIND_STRUCTURES,{filter:{structureType: STRUCTURE_CONTAINER}}), (structure) => {return structure.store.getCapacity(RESOURCE_ENERGY)})
        }
        
        
        return roomInfo;
    }
}

module.exports = roomLogic;