Meteor.publish('Media', function () {
    return Media.find();
});

Meteor.methods({
    'insertMediaData': function(mediaUrl,mediaName,mediaFullName,mediaType,mediaSize,caption,alternative,description,username,createdAt){
        Media.insert({
            url: mediaUrl,
            name: mediaName,
            fullName: mediaFullName,
            type: mediaType,
            size: mediaSize,
            caption: caption,
            alternative: alternative,
            description: description,
            createdBy: username,
            createdAt: createdAt
        });
    },
    'updateMediaData': function (mediaId,mediaUrl,mediaName,mediaNameType,mediaType,mediaSize,caption,alternative,description) {
        console.log('entered server');
        Media.update(
            mediaId, 
            {$set: {_id: mediaId,    
            url: mediaUrl,
            name: mediaName,
            fullName: mediaNameType,
            type: mediaType,
            size: mediaSize,
            caption: caption,
            alternative: alternative,
            description: description            
        }});
    },
    'removeMediaData': function(selectedFile){
        Media.remove({
            _id: selectedFile
         });
    },
    'removeSelectMediaData': function(selectedFileAll){
        for(i=0; i<selectedFileAll.length; i++){
            Media.remove({
            _id: selectedFileAll[i]
        });    
        }
    }
});
