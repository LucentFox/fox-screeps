var towerManager = {
    run: function(){
        for(var structure in Game.structures){
            if(Game.structures[structure].structureType === STRUCTURE_TOWER){
                var tower = Game.structures[structure];
                var hostiles = tower.room.find(FIND_HOSTILE_CREEPS);
                if(hostiles.length > 0){
                    tower.attack(hostiles[0]);
                }
            }
        };
    }
}

module.exports = towerManager;