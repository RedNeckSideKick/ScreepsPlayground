var workerGeneric = require('creepType.worker.generic');

var worker =
{
    run: function(creep)
    {
        var subType = creep.memory.creepSubtype;

        switch (subType)
        {
            case 'generic':
                workerGeneric.run(creep);
                break;

            default:    //  Uh oh, what are you doing here
                console.log('A creep with an invalid or no subtype was detected: ' + creep);
                break;
        }
    }
}

module.exports = worker;
