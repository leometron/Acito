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
  },
  'selectMediaFullName': function(){
    return Session.get('currentMediaFullName');
  },
  'selectMediaType': function(){
    return Session.get('currentMediaType');
  },
  'selectMediaSize': function(){
    return Session.get('currentMediaSize');
  }
});

Template.addNewMedia.rendered = function(){
  $("#editPage").hide();
};

Template.addNewMedia.events({
    'change #mediaName': function (event, template) {
        FS.Utility.eachFile(event, function (file) {
          var img = event.target.files[0]
          
          var medianame = img.name;
          var mediatype = img.type;
          var mediasize = img.size + " Bytes";

          Session.set('currentMediaFullName', medianame);
          Session.set('currentMediaType', mediatype);
          Session.set('currentMediaSize', mediasize);

            Images.insert(file, function (err, fileObj) {
                if (err) {
                    console.log('error')
                } else {
                  $("#editPage").show();

                  var url = "/cfs/files/images/" + fileObj._id;
                  var name = $('#mediaName').val();
                  var splitName = name.split(".", 1);

                  Meteor.setTimeout(function(){Session.set('currentMediaUrl', url)}, 1000);
                  Session.set('currentMediaName', splitName);
                  Session.set('currentMediaNameType', name);
                    // Meteor.call('insertMediaData', url, name, description);
                }
            });
        });
    },
    'click #update':function(){
      var url = Session.get('currentMediaUrl');
      var name = Session.get('currentMediaName');
      var nametype = Session.get('currentMediaNameType');
      var description = $('#description').val();
      var alternative = $('#alternative').val();
      var caption = $('#caption').val();
      
      Meteor.call('insertMediaData', url, name, nametype, caption, alternative, description, Meteor.users.findOne(Meteor.userId()).username);
      Router.go("/admin/media");
    }
});


Meteor.subscribe('Media');

Template.media.events({
   'click #addNewMedia': function () {
        $(location).attr('href','media/add');
   },
   // 'click #delete': function() {
   //      alert("click delete button");
   //      var url = Session.get('currentMediaUrl');
   //      Meteor.call('removeMediaData',url);
   // },
   // 'click #edit': function() {
   //      alert("click edit button");
   //      $(location).attr('href','media/add');   
   // }
});

Template.media.helpers({
   'mediaList': function() {
       return Media.find();
   }
});