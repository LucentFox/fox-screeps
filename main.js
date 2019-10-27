var roleDrone = require('role.drone');
var populationManager = require('manager.population');
var memoryManager = require('manager.memory');
var constructionManager = require('manager.construction');
var statusManager = require('manager.status');

module.exports.loop = function () {

    //TODO: gather information about the current controller level, current resources, and max resources and pass that into each method that may need
    //that information so that it can scale up as needed.

    memoryManager.run();
    statusManager.run();
    constructionManager.run();
    populationManager.run();

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
    
        if(creep.memory.role == 'drone' || creep.memory.role == 'specialist') {
            if(creep.spawning) {return;}
            roleDrone.run(creep);
        }
    }
}