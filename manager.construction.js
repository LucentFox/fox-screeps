var constructionLogic = require('logic.construction');
var roomLogic = require('room.logic');

var constructionManager = {
    run: function() {
        //automatically construct extensions
        for(var name in Game.spawns){
            var spawn = Game.spawns[name];
            var roomInfo = roomLogic.getRoomInfo(spawn.room);
           
            //constructionLogic.reset(spawn);
            
            var extensionMap = constructionLogic.getExtensionMap(spawn.pos, roomInfo.roomLevel);
            constructionLogic.buildMap(spawn.room, extensionMap, STRUCTURE_EXTENSION);

            constructionLogic.removeRoads(spawn);
            
            // if(roomInfo.energyCapacity >= 550)
            // {
            //     var roadMap = constructionLogic.getRoadMap(spawn.pos, roomInfo.roomLevel);
            //     constructionLogic.buildMap(spawn.room, roadMap, STRUCTURE_ROAD);
            // }
        }
    }
}

module.exports = constructionManager;