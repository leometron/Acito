Meteor.publish('Media', function () {
    return Media.find();
});


//Define all methods related to Media.
Meteor.methods({
    'insertMediaData': function(mediaUrl,mediaName,mediaDescription){
        console.log(mediaUrl+"........"+mediaName+"........."+mediaDescription);
        //var currentUserId = Meteor.userId();
        Media.insert({
            url: mediaUrl,
            name: "\""+mediaName+"\"",
            // name: mediaName,
            description: mediaDescription
        });
    },
    'removeMediaData': function(selectedFile){
        var currentUserId = Meteor.userId();
        //Write function to delete the file.
        Media.remove({_id: selectedFile, createdBy: currentUserId});
    }
});
