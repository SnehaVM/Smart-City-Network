
var AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: "####",
    secretAccessKey: "#####2fe44IuQKWIZQ",
    "region": "us-west-2"  
});

var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

//List down the EC2 instance details
    ec2.describeInstances({}, function(err, data) {
        if(err) {
            console.error(err.toString());
        } else {
            var currentTime = new Date();
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
//                    console.log('\t'+"Name: "+name+'\t'+ "InstanceId: " + instance.InstanceId+'\t'+"IpAddress: "+instance.PublicIpAddress+'\t'+"URL: " + instance.PublicDnsName+'\t'+"State: " + instance.State.Name);
	if(instance.State.Name!= "terminated"){
//	var dn = instance.PublicDnsName;
//	if(instance.State.Name == "running"{
//	 	dn ="http://" + dn;
//	}
	 console.log(name+";"+instance.InstanceId+";"+instance.PublicIpAddress+";"+instance.PublicDnsName+";" + instance.State.Name);
}
                
 //console.log(instance.PublicDnsName);
                }
            }
        }
        
    });   
     

