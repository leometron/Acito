Meteor.publish('Posts', function () {
  return Posts.find();
});

//Define all the methods interact with the POSTS object
Meteor.methods({
    'insertPostData': function(content,category_id){
      var currentUserId = Meteor.userId();
      Posts  .insert({
          content: content,
          category_id: category_id,
          createdBy: currentUserId
      });
    },
    'removePostData': function(selectedPosts){
      var currentUserId = Meteor.userId();
      Media.remove({_id: selectedPages, createdBy: currentUserId});
    }
  });
