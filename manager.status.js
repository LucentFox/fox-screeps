var statusManager = {
    run: function() {

        for(var name in Game.spawns){
            var spawn = Game.spawns[name];

            spawn.room.visual.text("⚡: " +  spawn.room.energyAvailable, 5 , 5, {align: "left"});
            spawn.room.visual.text("🔋: " + spawn.room.energyCapacityAvailable, 5, 6, {align: "left"});
            spawn.room.visual.text("🐜: " + _.filter(Game.creeps, function(item){return true;}).length, 5, 7, {align: "left"});
        }
    }
}
module.exports = statusManager;