var contructionLogic = {
    buildMap: function(room, constructionMap, structure){
        _.forEach(constructionMap, (item) => {
            room.createConstructionSite(item[0], item[1], structure);
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
            [x-1, y-2],[x+1, y-2],[x-1, y+2],[x+1, y+2]
    
            ];

        return map;
    },
}

module.exports = contructionLogic;