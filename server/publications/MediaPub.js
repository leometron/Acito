Meteor.publish('Media', function () {
  return Media.find();
});


//Define all methods related to Media.
Meteor.methods({
    'insertMediaData': function(file,file_size){
      var currentUserId = Meteor.userId();
      Media.insert({
          file_name: file,
          file_size: file_size,
          createdBy: currentUserId
      });
    },
    'removeMediaData': function(selectedFile){
      var currentUserId = Meteor.userId();
      //Write function to delete the file.
      Media.remove({_id: selectedFile, createdBy: currentUserId});
    }
  });
