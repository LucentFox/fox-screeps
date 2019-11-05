var roomLogic = require('room.logic');

var statusManager = {
    run: function() {

        for(var name in Game.spawns){
            var spawn = Game.spawns[name];
            var roomInfo = roomLogic.getRoomInfo(spawn.room);

            var x = spawn.pos.x - 10;
            var offsetY = spawn.pos.y + 1;
            var statusText = [
                "💻: " + roomInfo.roomLevel,
                "⚡: " + roomInfo.energyAvailable,
                "🔋: " + roomInfo.energyCapacity,
                "🐜: " + spawn.room.find(FIND_MY_CREEPS).length,
                "🏗: " + roomInfo.constructionSites,
                "⚡:" + roomInfo.containerAvailable,
                "📦:" + roomInfo.containerCapacity
            ];

            for(var y = 0; y < statusText.length; y++)
            {
                spawn.room.visual.text(statusText[y], x , y+offsetY, {align: "left"});
            }
            
        }
    }
}
module.exports = statusManager;