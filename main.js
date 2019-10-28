var memoryManager = require('manager.memory');
var statusManager = require('manager.status');
var constructionManager = require('manager.construction');
var creepManager = require('manager.creep');

module.exports.loop = function () {
    memoryManager.run();
    statusManager.run();
    constructionManager.run();
    creepManager.run();
}