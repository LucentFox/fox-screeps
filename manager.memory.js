var memoryManager = {
    run: function() {
        //clean up creep memory
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                //console.log('Clearing non-existing creep memory:', name);
            }
        }
    }
}

module.exports = memoryManager;