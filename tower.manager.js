var towerManager = {
    run: function(){
        for(var structure in Game.structures){
            if(Game.structures[structure].structureType === STRUCTURE_TOWER){
                var tower = Game.structures[structure];

                var hostiles = tower.room.find(FIND_HOSTILE_CREEPS);
                if(hostiles.length > 0){
                    tower.attack(hostiles[0]);
                }

                // var containers = tower.room.find(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType === STRUCTURE_CONTAINER;}});
                // for(var i = 0; i < containers.length; i++)
                // {
                //     var container = containers[i];
                //     if(container.hits < container.hitsMax){
                //         tower.repair(container);
                //     }
                // }
            }
        };
    }
}

module.exports = towerManager;