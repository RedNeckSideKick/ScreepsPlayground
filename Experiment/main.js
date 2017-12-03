var memManage = require('ops.memManage');
var typeManagement = require('ops.typeManagement');
var spawnCreeps = require('ops.spawnCreeps');

module.exports.loop = function ()
{
    memManage.run();
    typeManagement.run();
}
