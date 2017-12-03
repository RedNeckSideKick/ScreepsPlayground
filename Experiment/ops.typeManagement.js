var worker = require('creepType.worker');

var typeManagement =
{
    run: function()
    {
        for (var name in Game.creeps)   //  Itterate through all creeps
        {
            var creep = Game.creeps[name];
            var creepType = creep.memory.creepType;

            switch (creepType)
            {
                case 'worker':
                    worker.run(creep);
                    break;

                default:    //  Uh oh, what are you doing here
                    console.log('A creep with an invalid or no type was detected: ' + creep);
                    break;
            }
        }
    }
}

module.exports = typeManagement;
