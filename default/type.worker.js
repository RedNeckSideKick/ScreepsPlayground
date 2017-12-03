/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('type.worker');
 * mod.thing == 'a thing'; // true
 */
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

//var state = 'idle'; //  Default state

var typeWorker =
{
    /** @param {Creep} creep **/
    run: function(creep)
    {
        var state = creep.memory.state;
        //console.log(state);
        switch (state)
        {
            case 'harvesting':
                var supplyTargets =  creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });

                if (supplyTargets.length == 0)      //  If there are no things to supply
                {
                    creep.memory.state = 'idle';
                    creep.say('Switching to idle mode, awaiting assignment...');
                    break;
                }

                roleHarvester.run(creep);
                break;

            case 'building':
                var supplyTargets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });

                var buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES); //  Locate Structures that require construction

                 if (supplyTargets.length > 0)       //  If there are things to supply
                {
                    creep.memory.state = 'harvesting';
                    creep.say('Switching to harvester mode...');
                    break;
                }
                else if (buildTargets.length == 0)  //  If there are no things to build
                {
                    creep.memory.state = 'idle';
                    creep.say('Switching to idle mode, awaiting assignment...');
                    break;
                }

                roleBuilder.run(creep);
                break;

            case 'upgrading':
                var supplyTargets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });

                var buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES); //  Locate Structures that require construction

                if (supplyTargets.length > 0)       //  If there are things to supply
                {
                    creep.memory.state = 'harvesting';
                    creep.say('Switching to harvester mode...');
                    break;
                }
                else if (buildTargets.length > 0)   //  If there are things to build
                {
                    creep.memory.state = 'building';
                    creep.say('Switching to builder mode...');
                    break;
                }

                roleUpgrader.run(creep);
                break;

            case 'idle':
                var supplyTargets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });

                var buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES); //  Locate Structures that require construction

                if (supplyTargets.length > 0)       //  If there are things to supply
                {
                    creep.memory.state = 'harvesting';
                    creep.say('Switching to harvester mode...');
                    break;
                }
                else if (buildTargets.length > 0)   //  If there are things to build
                {
                    creep.memory.state = 'building';
                    creep.say('Switching to builder mode...');
                    break;
                }
                else                                //  Nothing needs to be done, upgrade controler
                {
                    creep.memory.state = 'upgrading';
                    creep.say('Switching to upgrader mode...');
                    break;
                }

                //console.log('Im in idle');
                break;

            default:
                creep.memory.state = 'idle';
                creep.say('Switching to idle mode, awaiting assignment...');
                //console.log('Im in default');
        }
    }
}

module.exports = typeWorker;
