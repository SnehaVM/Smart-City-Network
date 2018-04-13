var AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: "#####",
    secretAccessKey: "#####",
    "region": "us-west-2"  
});

//using Amazon EC2 API
var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

var commands = [
    '#!/usr/bin/env bash',
    'mkdir /home/ubuntu/test',
    'sudo chmod 777 /var/www/html/smartcity/configurations'
//    'sudo rm /var/www/html/smartcity/configurations/ossn.config.site.php'
   // 'sudo mysql -u ossnuser -pabcd ossndb -e "UPDATE ossn_users SET site_name = 'San Jose Police Dpt'";
];

var params = {
   ImageId: 'ami-c8e238b0',
   InstanceType: 't2.micro',
   MinCount: 1,
   MaxCount: 1,
   KeyName: 'osnkey',
   SecurityGroupIds: ['sg-284db554'],
   UserData: new Buffer(commands.join("\n")).toString('base64')
   };

// Create an EC2 instance from the program, on button click
var insId;
var dns;
ec2.runInstances(params, function(err, data) {
   if (err) {
      console.log("Could not create instance", err);
      return;
   }
   else
   {
   insId = data.Instances[0].InstanceId;
   //console.log("Created instance", insId);
   //wait for instance creation
   var sleep = require('sleep');
   sleep.sleep(10);
   ec2.describeInstances({}, function(err, data) {
        if(err) {
            console.error(err.toString());
        } else {
            var currentTime = new Date();
            //console.log(currentTime.toString());
            for(var r=0,rlen=data.Reservations.length; r<rlen; r++) {
                var reservation = data.Reservations[r];
                for(var i=0,ilen=reservation.Instances.length; i<ilen; ++i) {
                    var instance = reservation.Instances[i];

                    var name = '';
                    for(var t=0,tlen=instance.Tags.length; t<tlen; ++t) {
                        if(instance.Tags[t].Key === 'Name') {
                            name = instance.Tags[t].Value;
                        }
                    }
                    if(instance.InstanceId ==insId){
                    //console.log("IP: " + instance.PublicIpAddress);
                  //  console.log(instance.PublicDnsName);
                    //console.log("STATE: " + instance.State.Name);
                    //wait before connect
                   // var sleep = require('sleep');
   		//			sleep.sleep(5);
   					//console.log("STATE After Wait: " + instance.State.Name);
        			//removed
//console.log("Department created successfully!  " + "Url: https://" + instance.PublicDnsName);
console.log(instance.PublicDnsName);
                    }
                    //console.log('\t'+name+'\t'+instance.InstanceId+'\t'+instance.PublicIpAddress+'\t'+instance.InstanceType+'\t'+instance.ImageId+'\t'+instance.State.Name);
//console.log("Department created successfully!" + "Url: " + instance.PublicDnsName);                
}
            }
        }
    });   
  
   }
});


