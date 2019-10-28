var memoryManager = require('manager.memory');
var statusManager = require('manager.status');
var constructionManager = require('manager.construction');
var populationManager = require('manager.population');
var creepManager = require('manager.creep');

module.exports.loop = function () {

    //TODO: gather information about the current controller level, current resources, and max resources and pass that into each method that may need
    //that information so that it can scale up as needed.
    
    memoryManager.run();
    statusManager.run();
    constructionManager.run();
    populationManager.run();
    creepManager.run();
}