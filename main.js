var memoryManager = require('manager.memory');
var statusManager = require('status.manager');
var constructionManager = require('manager.construction');
var roleManager = require('role.manager');

module.exports.loop = function () {
    memoryManager.run();
    statusManager.run();
    constructionManager.run();
    roleManager.run();
}