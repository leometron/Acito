
var searchtext = "";

Meteor.publish('Pages', function () {
    
    var currentUserId = this.userId;

    if(searchtext) {
        return Pages.find({ $text: { $search: searchtext } });
    }
    return Pages.find( {createdBy: currentUserId} );

});


//Define all the methods interact with the PAGES object
Meteor.methods({

    'insertPagesData': function (title, content) {
        var currentUserId = Meteor.userId();
        Pages.insert ({
            title: title,
            content: content,
            deleted: false,
            published: true,
            createdBy: currentUserId

            //  category_id: category_id,
        });

    },

     'draftPagesData': function(title, content) {
        var currentUserId = Meteor.userId();
      Pages.insert ({
        title: title,
        content: content,
        deleted: false,
        published: false,
        createdBy: currentUserId

      });

    },

    'binPagesData': function(title, content) {
        var currentUserId = Meteor.userId();
      Pages.insert ({
        title: title,
        content: content,
        deleted: true,
        published: false,
        createdBy: currentUserId
        
      });
    },

     'deletePagesData' : function(pageTitle, pageComments, selectedPages) {
       Pages.update(selectedPages, {$set: {title : pageTitle, content: pageComments, deleted:true, published: false }});
    },

    'updatePagesData' : function (pageTitle, pageComments, selectedPages) {
        Pages.update(selectedPages, {$set: { title : pageTitle, content : pageComments }});
    },

    'trashPagesData' : function (selectedPages){
        Pages.remove(selectedPages);
    },

    'restorePagesData' : function (selectedPages){
        Pages.update(selectedPages, {$set: { deleted:false }});
    },


    'RePublishPagesData' : function (pageTitle, pageComments, selectedPages){
        Pages.update(selectedPages, {$set: { title : pageTitle, content : pageComments, published: true }});
    },

    'searchData' : function (searchPage) {
        searchtext = searchPage;
    }

    // 'removePagesData': function(selectedPages){
    //     var currentUserId = Meteor.userId();
    //     Media.remove({_id: selectedPages, createdBy: currentUserId});
    // }
});