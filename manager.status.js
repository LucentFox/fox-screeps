var roomLogic = require('logic.room');

var statusManager = {
    run: function() {

        for(var name in Game.spawns){
            var spawn = Game.spawns[name];
            var roomInfo = roomLogic.getRoomInfo(spawn.room);

            var x = 5;
            var offsetY = 5;
            var statusText = [
                "💻: " + roomInfo.roomLevel,
                "⚡: " + roomInfo.energyAvailable,
                "🔋: " + roomInfo.energyCapacity,
                "🐜: " + _.filter(Game.creeps, function(item){return true;}).length
            ];

            for(var y = 0; y < statusText.length; y++)
            {
                spawn.room.visual.text(statusText[y], x , y+offsetY, {align: "left"});
            }
            
        }
    }
}
module.exports = statusManager;