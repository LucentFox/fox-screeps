var locatorLogic = {
    findOptimalSource: function(creep) {
        var safeSources = creep.room.find(FIND_SOURCES, {filter: function(item){ 
            if(item.pos.findInRange(FIND_HOSTILE_CREEPS, 5).length > 0) {return false;}
            return true; 
        }});
    
        var optimalSource = safeSources[Math.floor(Math.random() * safeSources.length)];
    
        return optimalSource ? optimalSource.id : null;
    }
}

module.exports = locatorLogic;