var select_data = [];

Template.addNewMedia.helpers({
    'selectMediaUrl': function () {
        return Session.get('browsedMediaUrl');
    },
    'selectMediaName': function () {
        return Session.get('browsedMediaName');
    },
    'selectMediaFullName': function () {
        return Session.get('browsedMediaNameWithType');
    },
    'selectMediaType': function () {
        return Session.get('browsedMediaType');
    },
    'selectMediaSize': function () {
        return Session.get('browsedMediaSize');
    },
    'showSelectedMedia': function () {
        return Media.findOne(Session.get('currentMediaId'));
    },
    // 'errormsg': function () {
    //     return Session.get('errorMessage');
    // }
});

Template.addNewMedia.rendered = function () {
    var page = Session.get('mediaDetail');
    if (page != "edit") {
        $("#editPage").hide();
    }
    Session.set('errorMessage', '');
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

                    Meteor.setTimeout(function () {
                        Session.set('browsedMediaUrl', url)
                    }, 1000);
                    Session.set('browsedMediaName', splitName);
                }
            });
        });
    },
    'click #publish': function () {
        if (!$('#filename').val()) {
            Session.set('errorMessage', 'Media Title is required');
        } else {
            Session.set('errorMessage', '');
            var url = $('#mediaUrl').val();
            var name = $('#filename').val();
            var nametype = $('#fullimagename').text();
            var description = (!$('#description').val()) ? "-" : $('#description').val();
            var alternative = (!$('#alternative').val()) ? "-" : $('#alternative').val();
            var caption = (!$('#caption').val()) ? "-" : $('#caption').val();
            var type = $('#filetype').text();
            var size = $('#filesize').text();
            var currentUserId = Meteor.userId();

            Meteor.call('insertMediaData', url, name, nametype, type, size, caption, alternative, description, currentUserId, getCurrentDate());
            Router.go("/admin/media");
        }
    },
    'click #update': function () {
        if (!$('#filename').val()) {
            Session.set('errorMessage', 'Media Title is required');
        } else {
            Session.set('errorMessage', '');
            var url = $('#mediaUrl').val();
            var name = $('#filename').val();
            var nametype = $('#fullimagename').text();
            var description = (!$('#description').val()) ? "-" : $('#description').val();
            var alternative = (!$('#alternative').val()) ? "-" : $('#alternative').val();
            var caption = (!$('#caption').val()) ? "-" : $('#caption').val();
            var type = $('#filetype').text();
            var size = $('#filesize').text();
            Meteor.call('updateMediaData', Session.get('currentMediaId'), url, name, nametype, type, size, caption, alternative, description);
            Router.go("/admin/media");
        }
    }
});


Meteor.subscribe('Media');

Template.media.events({
    'click #addNewMedia': function () {
        // Session.set('mediaDetail', '');
        $(location).attr('href', 'media/add');
        // Router.go('/admin/media/add');
    },
     'click .menuitem': function (event) {            
       $('#dropdownMenu1').text( $(event.target).text());
       if($('#dropdownMenu1').text() != "Bulk Actions") {
        $('#applybtn').fadeIn(500);
       } else {
        $('#applybtn').fadeOut(500);
       }           
    },    
    'click #allMedia': function (event) {
        event.preventDefault();
        Meteor.call('showAllMedia');
        Meteor._reload.reload();
    },
    'click #searchMedia': function (event) {
        event.preventDefault();
        Meteor.call('searchMedia', $('#queryString').val());
        Meteor._reload.reload();
    },
    'click #delete': function () {
        Meteor.call('removeMediaData', this._id);
    },
    'click #edit': function () {
        Session.set('currentMediaId', this._id);
        Session.set('browsedMediaUrl', this.url);
        Session.set('browsedMediaName', this.name);
        Session.set('browsedMediaNameWithType', this.fullName);
        Session.set('browsedMediaType', this.type);
        Session.set('browsedMediaSize', this.size);
        Session.set('mediaDetail', 'edit');
        Session.set('errorMessage', '');
    },
    'click #delete': function () {
        Meteor.call('removeMediaData', this._id);
    },
    'click .checkbox': function (event) {
        var selectcheck = event.target.checked;
        if (selectcheck == true) {
            select_data.push(this._id);
        } else {
            var index = select_data.indexOf(this._id);
            select_data.splice(index, 1);
        }
    },
    'click #checkboxMediaAll': function(event){
        var selectcheck = event.target.checked;
        if(selectcheck == true){
            $('.checkbox:checkbox').prop('checked',true);
        }else{
            $('.checkbox:checkbox').prop('checked',false);
        }
        $(".checkbox:checkbox").each(function() {
           if(this.checked){
                select_data.push(this.value);
           }else{
                var index = select_data.indexOf(this.value);
                select_data.splice(index, 1);
           }
       });
    },
    'click #apply': function () {
        Meteor.call('removeSelectMediaData', select_data, $('#dropdownMenu1').text());
    },
    // 'click #filter': function (event) {
    //     var date = $('#filterdate').val();
    //     Meteor.call('selectDateFilter', date);
    //     Meteor._reload.reload();
    // },
    'change #filterdate' : function() {
        var date = $('#filterdate').val();
        Meteor.call('selectDateFilter', date);
        Meteor._reload.reload();
    }    

});

Template.media.helpers({
    'mediaList': function () {
        return Media.find();
    },
    'mediaListCount': function() {
        return Media.find().count();
    }
});

Template.adminHeader.events({
    'click #subNavBarmediaadd': function () {
        $("#editPage").hide();
        Session.set('mediaDetail', '');
    }
});

Template.media.rendered = function(){
    Session.set('errorMessage', '');
    $('#applybtn').hide();
  $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false,
      hover: false,
      gutter: 0,
      belowOrigin: true,
      alignment: 'left'
    }
  );       
};