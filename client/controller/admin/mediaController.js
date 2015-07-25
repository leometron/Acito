/**
 * Created by neem_biju on 7/22/2015.
 */

 // Session.setDefault("currentMediaId"," ");

Template.addNewMedia.helpers({
  'selectMediaUrl': function(){
        return Session.get('currentMediaUrl');
  },
  'selectMediaName': function(){
    return Session.get('currentMediaName');
  }
});

Template.addNewMedia.rendered = function(){
  $("#editPage").hide();
};

Template.addNewMedia.events({
    'change #mediaName': function (event, template) {
        FS.Utility.eachFile(event, function (file) {
            Images.insert(file, function (err, fileObj) {
                if (err) {
                    console.log('error')
                } else {
                  $("#editPage").show();
                  // $('#editPage').show();
                  var url = "/cfs/files/images/" + fileObj._id;
                  Session.set('currentMediaUrl', url);
                  var name = $('#mediaName').val();
                  var splitName = name.split(".", 1);
                  Session.set('currentMediaName', splitName);
                    // Meteor.call('insertMediaData', url, name, description);
                }
            });
        });
    },
    'click #publish':function(){
      var url = Session.get('currentMediaUrl');
      var name = Session.get('currentMediaName');
      var description = $('#description').val();
      Meteor.call('insertMediaData', url, name, description);
      alert("published");
      Router.go("/admin/media");
    }
    // 'click #edit': function(){
    //   $(location).attr('href','add/edit');
    // }
});

// Template.addnew.helpers({
//   categories: function(elementId) {
//     return getFormCategories(dict.get('activeElementId'));
//   }
// })



Meteor.subscribe('Media');

Template.media.events({
   'click #addNewMedia': function () {
        $(location).attr('href','media/add');
   }
});

Template.media.helpers({
   'mediaList': function() {
       return Media.find();
   }
});