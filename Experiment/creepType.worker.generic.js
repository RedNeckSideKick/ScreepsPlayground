var taskHarvest = require('task.harvest');

var workerGeneric =
{
    run: function(creep)
    {
        taskHarvest.run(creep);
    }
}

module.exports = workerGeneric;
