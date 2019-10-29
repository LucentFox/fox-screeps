var contructionLogic = {
    buildMap: function(room, constructionMap, structure){
        _.forEach(constructionMap, (item) => {
            var x = item[0];
            var y = item[1];
            var terrainMap = room.getTerrain();
            
            //Make sure that position to build in is not a wall
            if(terrainMap.get(x,y) !== TERRAIN_MASK_WALL)
            {
                room.createConstructionSite(x, y, structure);
            }
        });
    },
    reset: function(spawn){
        spawn.room.find(FIND_MY_CONSTRUCTION_SITES, {filter: (site) => {site.remove();}});
    },
    removeRoads: function(spawn){
        if(Game.time % 100 > 0) {return};
        
        var structures = spawn.room.find(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType !== STRUCTURE_ROAD}});
        var roads = spawn.room.find(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType === STRUCTURE_ROAD}});
        for(var i = 0; i < structures.length; i++)
        {
            for(var j = 0; j < roads.length; j++)
            {
                if(structures[i].pos.x === roads[j].pos.x && structures[i].pos.y === roads[j].pos.y)
                roads[j].destroy();
            }
        }
    },
    getExtensionMap: function(centerPosition, roomLevel){
        var x = centerPosition.x;
        var y = centerPosition.y;
        var map = [];

        if(roomLevel === 2){
            map = [[x-1,y-1],[x+1,y-1],[x+1,y+1],[x-1,y+1],[x,y-2]];
        }
        
        if(roomLevel === 3){
            map = [[x,y+2],[x-2,y],[x+2,y],[x-2,y-2],[x+2,y+2]];
        }
        
        if(roomLevel === 4){
            map = [
                [x-2,y+2],[x+2,y-2],
                [x-1,y-3],[x+1,y-3],
                [x-1,y+3],[x+1,y+3],
                [x-3,y-1],[x+3,y-1],
                [x-3,y+1],[x+3,y+1]
            ];
        }

        return map;
    },
    getRoadMap: function(centerPosition, roomLevel){
        var x = centerPosition.x;
        var y = centerPosition.y;

        var map = [];

        if(roomLevel === 2){
            map = [
                [x, y-1],[x, y+1],[x+1, y],[x-1, y], 
                [x-1, y-2],[x+1, y-2],[x-1, y+2],[x+1, y+2],
                [x-2, y-1],[x+2,y-1],[x-2, y+1],[x+2,y+1]
            ];
        }
            
        if(roomLevel === 3){
            map = [
                [x,y+2],[x-2,y],[x+2,y],[x-2,y-2],[x+2,y+2],
                [x-3,y],[x+3,y],[x,y-3],[x,y+3]
            ];
        }

        return map;
    },
}

module.exports = contructionLogic;