Template.addNewMedia.helpers({
  'selectMediaUrl': function(){
        return Session.get('browsedMediaUrl');
  },
  'selectMediaName': function(){
    return Session.get('browsedMediaName');
  },
  'selectMediaFullName': function(){
    return Session.get('browsedMediaNameWithType');
  },
  'selectMediaType': function(){
    return Session.get('browsedMediaType');
  },
  'selectMediaSize': function(){
    return Session.get('browsedMediaSize');
  },
  'showSelectedMedia': function(){
    return Media.findOne(Session.get('currentMediaId'));
  }
});

Template.addNewMedia.rendered = function(){
  var page = Session.get('mediaDetail');
  if(page!="edit"){
    $("#editPage").hide();
  }
};

Template.addNewMedia.events({
    'change #mediaName': function (event, template) {
        FS.Utility.eachFile(event, function (file) {
          var img = event.target.files[0]
          Session.set('browsedMediaNameWithType', img.name);
          Session.set('browsedMediaType', img.type);
          Session.set('browsedMediaSize', img.size + " Bytes");        
            Images.insert(file, function (err, fileObj) {
                if (err) {
                    console.log('error')
                } else {                 
                  $("#editPage").show();
                  Session.set('mediaDetail', "add");

                  var url = "/cfs/files/images/" + fileObj._id;
                  var name = $('#mediaName').val();
                  var splitName = name.split(".", 1);

                  Meteor.setTimeout(function(){Session.set('browsedMediaUrl', url)}, 1000);
                  Session.set('browsedMediaName', splitName);
                }
            });
        });
    },
    'click #publish':function(){
      var url = $('#mediaUrl').val();
      var name = $('#filename').val();
      var nametype = $('#fullimagename').text();
      var description = $('#description').val();
      var alternative = $('#alternative').val();
      var caption = $('#caption').val();
      var type = $('#filetype').text();
      var size = $('#filesize').text();

      Meteor.call('insertMediaData', url, name, nametype, type, size, caption, alternative, description, getUserName(), getCurrentDate());
      Router.go("/admin/media");
    },
    'click #update': function(){
      var url = $('#mediaUrl').val();
      var name = $('#filename').val();
      var nametype = $('#fullimagename').text();
      var description = $('#description').val();
      var alternative = $('#alternative').val();
      var caption = $('#caption').val();
      var type = $('#filetype').text();
      var size = $('#filesize').text();
      Meteor.call('updateMediaData', Session.get('currentMediaId'), url, name, nametype, type, size, caption, alternative, description);
      Router.go("/admin/media");
    }
});


Meteor.subscribe('Media');

Template.media.events({
   'click #addNewMedia': function () {
        $(location).attr('href','media/add');
   },
   'click #delete': function() {
        Meteor.call('removeMediaData',this._id);
   },
   'click #edit': function() {
        Session.set('currentMediaId',this._id);
        Session.set('browsedMediaUrl',this.url);
        Session.set('browsedMediaName',this.name);
        Session.set('browsedMediaNameWithType',this.fullName);
        Session.set('browsedMediaType',this.type);
        Session.set('browsedMediaSize',this.size);
        Session.set('mediaDetail','edit');
   }
});

Template.media.helpers({
   'mediaList': function() {
       return Media.find();
   }
});