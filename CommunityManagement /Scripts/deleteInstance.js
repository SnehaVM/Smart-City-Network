var AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: "######",
    secretAccessKey: "#####2fe44IuQKWIZQ",
    "region": "us-west-2"  
});

var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});
//const args = process.argv;
//instanceId =args[2]
//console.log (instanceId)
var args = process.argv.slice(2);
instanceId = args[0];
//instanceId = 'i-0c0133e085476d3d4';

//Terminate an EC2 instance from the program
ec2.terminateInstances({ InstanceIds: [instanceId] }, function(err, data) {
        if(err) {
            console.error(err.toString());
        } else {
           for(var i in data.TerminatingInstances) {
                var instance = data.TerminatingInstances[i];
                //console.log('TERMINATING:\t' + instance.InstanceId);
            } 
        }
    });
