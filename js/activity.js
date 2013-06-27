define(function (require) {
    var activity = require("sugar-web/activity/activity");
    var icon = require("sugar-web/graphics/icon");
    var asdfssafd=require("sugar-web/graphics/palette");
    var datastore = require("sugar-web/datastore");
    var env=require("sugar-web/env");
    //var foo = require("sugar-web/foo");

    // Manipulate the DOM only when it is ready.
    require(['domReady!'], function (doc) {

        // Initialize the activity.
        activity.setup();
        var activityname=[];
        var actname=document.getElementById("aname");
        var datastoreObject = activity.getDatastoreObject();
        var stopButton = document.getElementById("stop-button");
        var actdescription = document.getElementById("descrip");

        // Colorize the activity icon.
        var activityButton = document.getElementById("activity-button");
        activity.getXOColor(function (error, colors) {
            icon.colorize(activityButton, colors);

            datastoreObject.getMetadata(function (error, metadata) {
                if(metadata.activityName==null)
                 {
                    activityname=(metadata.activity).split('.');
                    actname.value=activityname[2];
                 }
                else
                 {
                    actname.value=metadata.activityName;
                 }   

                if(metadata.description===null)
                 actdescription.value="";
                else
                 actdescription.value=metadata.description;  
            });    
        });

        stopButton.onclick = function () {
            activity.close();
         };


        actname.onblur=function() { 
            env.getEnvironment(function (error, environment) {
                /*
                console.log(environment.bundleId);
                var bId = environment.bundleId;
                var replace = bId.split('.');
                environment.bundleId=bId.replace(replace[2],actname.value);
                console.log(environment.bundleId);
                */
                console.log(actname.value);  
                datastoreObject.setMetadata({
                    "activity": environment.bundleId,
                    "activity_id": environment.activityId,
                    "activityName": actname.value
                });
            
            datastoreObject.save(function () {});
            });
        };

        actdescription.onblur=function() { 
            env.getEnvironment(function (error, environment) {
                //console.log(environment.bundleId);
                //var bId = environment.bundleId;
                //var replace = bId.split('.');
                //environment.bundleId=bId.replace(replace[2],actname.value);
                console.log(actdescription.value);

                datastoreObject.setMetadata({
                    "activity": environment.bundleId,
                    "activity_id": environment.activityId,
                    "description": actdescription.value,
                });
            
            datastoreObject.save(function () {});
            });
        };

    });

});
