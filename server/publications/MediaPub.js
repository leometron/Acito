Meteor.publish('Media', function () {
    return Media.find();
});


//Define all methods related to Media.
Meteor.methods({
    'insertMediaData': function(mediaUrl,mediaName,caption,alternative,description,username){
        // console.log(mediaUrl+"..."+mediaName+"..."+caption+"..."+alternative+"..."+description);
        //var currentUserId = Meteor.userId();
        Media.insert({
            url: mediaUrl,
            name: "\""+mediaName+"\"",
            // name: mediaName,
            caption: caption,
            alternative: alternative,
            description: description,
            createdBy: username
        });
    },
    'removeMediaData': function(selectedFile){
        var currentUserId = Meteor.userId();
        //Write function to delete the file.
        Media.remove({_id: selectedFile, createdBy: currentUserId});
    }
});
