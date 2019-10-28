var roomLogic = {
    getRoomInfo: function(room) {
        var roomInfo = {
            roomLevel: room.controller.level,
            energyAvailable: room.energyAvailable,
            energyCapacity: room.energyCapacityAvailable
        }
        
        
        return roomInfo;
    }
}

module.exports = roomLogic;