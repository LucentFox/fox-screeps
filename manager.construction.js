var constructionLogic = require('logic.construction');

var constructionManager = {
    run: function() {
        //automatically construct extensions
        for(var name in Game.spawns){
            var spawn = Game.spawns[name];
            var roomLevel = spawn.room.controller.level;

            //constructionLogic.reset(spawn);
            
            var extensionMap = constructionLogic.getExtensionMap(spawn.pos, roomLevel);
            constructionLogic.buildMap(spawn.room, extensionMap, STRUCTURE_EXTENSION);

            var roadMap = constructionLogic.getRoadMap(spawn.pos, roomLevel);
            constructionLogic.buildMap(spawn.room, roadMap, STRUCTURE_ROAD);
        }
    }
}

module.exports = constructionManager;