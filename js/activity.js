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
        //var datastoreObject = new datastore.DatastoreObject();
        //var en=activity.environment();
        var stopButton = document.getElementById("stop-button");
        var actdescription = document.getElementById("descrip");
        var Title;
        var mdata;
        
        // Colorize the activity icon.
        var activityButton = document.getElementById("activity-button");
        activity.getXOColor(function (error, colors) {
            icon.colorize(activityButton, colors);
                     
        });
       
        datastoreObject.getMetadata(function (error, metadata) {
            
            mdata=metadata;
            console.log(metadata);
            
            abc();
              });
                
             abc();
                
                function abc()
                {
                   
                if((mdata==null)||(mdata.title==null))
                {   
                   
                    env.getEnvironment(function (error, environment) {
                    var defaultTitle = (environment.bundleId).split('.');
                    Title=defaultTitle[2];
                    console.log(defaultTitle[2]);
                    datastoreObject.setMetadata({
                    "activity": environment.bundleId,
                    "activity_id": environment.activityId,
                    "title": Title
                    });
                    datastoreObject.save(function () {});
                    actname.value=Title;
                    });
                 }   
                else 
                {                     
                    if(mdata.title!=null)
                    {actname.value=mdata.title;
                     datastoreObject.setMetadata({
                    "activity": environment.bundleId,
                    "activity_id": environment.activityId,
                    "title": mdata.title
                    });
                    datastoreObject.save(function () {});   
                    }
                        
                    if(mdata.description!=null)
                        actdescription.value=mdata.description;
                    
                }}
           
    
        stopButton.onclick = function () {
            activity.close();
         };


        actname.onblur=function() { 
                          
                console.log(actname.value);  
                datastoreObject.setMetadata({
                    
                    "title": actname.value
                });
            
            datastoreObject.save(function () {});
            

            
        };

        actdescription.onblur=function() { 
            
                console.log(actdescription.value);
                datastoreObject.setMetadata({
                    
                    "description": actdescription.value,
                });
            
            datastoreObject.save(function () {});
           
        };

    });

});
