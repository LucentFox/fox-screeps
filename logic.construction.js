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
    getExtensionMap: function(centerPosition){
        var x = centerPosition.x;
        var y = centerPosition.y;
        var map = [
            [x-1,y-1],[x+1,y-1],[x+1,y+1],[x-1,y+1],[x,y-2],//level2
            [x,y+2],[x-2,y],[x+2,y],[x-2,y-2],[x+2,y+2],//level3
            [x-2,y+2],[x+2,y-2]
            ];

        return map;
    },
    getRoadMap: function(centerPosition){
        var x = centerPosition.x;
        var y = centerPosition.y;
        var map = [
            [x, y-1],[x, y+1],[x+1, y],[x-1, y], 
            [x-1, y-2],[x+1, y-2],[x-1, y+2],[x+1, y+2],
            [x-2, y-1],[x+2,y-1],[x-2, y+1],[x+2,y+1],
            [x-3,y],[x+3,y],[x,y-3],[x,y+3]
            ];

        return map;
    },
}

module.exports = contructionLogic;