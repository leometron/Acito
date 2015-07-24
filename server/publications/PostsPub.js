var currentPostId;
Meteor.publish('Posts', function () {
    return Posts.find();
});

//Define all the methods interact with the POSTS object
Meteor.methods({
    'insertPostData': function (title, content,tags) {
        Posts.insert({
            title: title,
            content: content,
            publish: false,
            createdBy: Meteor.userId(),
            // createdAt : new Date(),
            tags: tags
        }, function (err, id) {
            currentPostId = id;
        });
        console.log('successfully saved the post...' + title);
    },
    'publishPostData': function (title, content,tags) {
        Posts.update({_id: currentPostId}, {$set: {_id: currentPostId, title: title, content: content, publish: true,createdBy: Meteor.userId(),tags: tags}});
        console.log('successfully published post...' + title);
    }
//    'removePostData': function(selectedPostId){
//      var currentUserId = Meteor.userId();
//      Posts.remove({_id: selectedPostId, createdBy: currentUserId});
//    }
});
