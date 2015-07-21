Meteor.publish('Pages', function () {
  return Pages.find();
});



//Define all the methods interact with the PAGES object
Meteor.methods({
    'insertPagesData': function(content,category_id){
      var currentUserId = Meteor.userId();
      Pages.insert({
          content: content,
          category_id: category_id,
          createdBy: currentUserId
      });
    },
    'removePagesData': function(selectedPages){
      var currentUserId = Meteor.userId();
      Media.remove({_id: selectedPages, createdBy: currentUserId});
    }
  });