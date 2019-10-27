var constructionManager = {
    run: function() {
        //automatically construct extensions
        for(var name in Game.spawns){
            var spawn = Game.spawns[name];
            var roomLevel = spawn.room.controller.level;
            var room = spawn.room;

            if(roomLevel >= 2)
            {
                room.createConstructionSite(spawn.pos.x + 4, spawn.pos.y + 4, STRUCTURE_EXTENSION);
                room.createConstructionSite(spawn.pos.x + 4, spawn.pos.y - 4, STRUCTURE_EXTENSION);
                room.createConstructionSite(spawn.pos.x - 4, spawn.pos.y + 4, STRUCTURE_EXTENSION);
                room.createConstructionSite(spawn.pos.x - 4, spawn.pos.y - 4, STRUCTURE_EXTENSION);
            }
            
            if(roomLevel >=3)
            {
                room.createConstructionSite(spawn.pos.x - 3, spawn.pos.y - 4, STRUCTURE_EXTENSION);
                room.createConstructionSite(spawn.pos.x - 4, spawn.pos.y + 3, STRUCTURE_EXTENSION);
                room.createConstructionSite(spawn.pos.x + 3, spawn.pos.y + 4, STRUCTURE_EXTENSION);
                room.createConstructionSite(spawn.pos.x + 4, spawn.pos.y - 3, STRUCTURE_EXTENSION);

                room.createConstructionSite(spawn.pos.x - 4, spawn.pos.y - 3, STRUCTURE_EXTENSION);
                room.createConstructionSite(spawn.pos.x - 3, spawn.pos.y + 4, STRUCTURE_EXTENSION);
                room.createConstructionSite(spawn.pos.x + 4, spawn.pos.y + 3, STRUCTURE_EXTENSION);
                room.createConstructionSite(spawn.pos.x + 3, spawn.pos.y - 4, STRUCTURE_EXTENSION);

            }
        }
    }
}

module.exports = constructionManager;