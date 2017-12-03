//var findTargets = require('find.target');

var empty = [];

var taskHarvest =
{
    run: function(creep)
    {
        var state = creep.memory.taskState;

        switch (state)
        {
            default:    //  State fell through, go to idle
                creep.memory.taskState = 'idle';
                break;

            case 'idle':    //  Quit being lazy... Get goin'!
                if(creep.carry.energy == 0)
                {   //  Gather energy if we aren't empty
                    creep.memory.taskState = 'gather';
                }
                else
                {   //  Go supply something
                    creep.memory.taskState = 'supply';
                }

            case 'gather':
                var targets = Game.getObjectById(creep.memory.taskTargets);

                if (!targets)
                {
                    //var targets = findTargets.run('energy','closest');    Want to include better finding algorithm in future
                    var targets[0] = creep.pos.findClosestByRange(FIND_SOURCES);
                    creep.memory.taskTargets = targets.id;//targets[0];
                    break;
                }
                else if (!creep.pos.inRangeTo(targets[0], 1))
                {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    break;
                }
                else
                {
                    creep.harvest(targets[0]);
                    if(creep.carry.energy == creep.carryCapacity)
                    {
                        creep.memory.taskState = 'supply'
                        creep.memory.taskTargets = empty;
                        break;
                    }
                    break;
                }
                break;

            case 'supply':
                var targets = Game.getObjectById(creep.memory.taskTargets);

                if (!targets)
                {
                    //var targets = findTargets.run('energy','closest');    Want to include better finding algorithm in future
                    var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                        }
                    });
                    creep.memory.taskTargets = targets.id;//targets[0];
                    break;
                }
                else if (!creep.pos.inRangeTo(targets[0], 1))
                {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    break;
                }
                else
                {
                    creep.transfer(targets[0]);
                    if(creep.carry.energy == 0)
                    {
                        creep.memory.taskState = 'gather'
                        creep.memory.taskTargets = empty;
                        break;
                    }
                    break;
                }
                break;
        }
    }
}


module.exports = taskHarvest;
