

Template.featuredImage.events({
    'change #selectFeaturedImage': function (event, template) {
        FS.Utility.eachFile(event, function (file) {
            Images.insert(file, function (err, fileObj) {
                if (err) {
                    console.log('error')
                } else {                 
                  var url = "/cfs/files/images/" + fileObj._id;
                  // Meteor.setTimeout(function(){Session.set('browsedMediaUrl', url)}, 1000);
                  Session.set('selectFeaturedImage', url);
                }
            });
        });
    },
    'click #publishFeaturedImage' : function() {
        Meteor.call('insertFeaturedImage',Session.get('selectFeaturedImage'),$('#pageId').val(),getUserName());
    }
 });


Template.featuredImage.helpers({
  'postList': function() {
    return Posts.find();
  }
});