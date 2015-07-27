
Meteor.publish('Pages', function () {
    return Pages.find();
});


//Define all the methods interact with the PAGES object
Meteor.methods({

    'insertPagesData': function (title, content) {
        var currentUserId = Meteor.userId();
        Pages.insert ({
            title: title,
            content: content,
            deleted: false,
            published: true

            //  category_id: category_id,
            //   createdBy: currentUserId
        });

    },

     'draftPagesData': function(title, content) {
      Pages.insert ({
        title: title,
        content: content,
        deleted: false,
        published: false

      });

    },

    'binPagesData': function(title, content) {
      Pages.insert ({
        title: title,
        content: content,
        deleted: true,
        published: false

      });
    },

     'deletePagesData' : function(pageTitle, pageComments, selectedPages) {
       Pages.update(selectedPages, {$set: {title : pageTitle, content: pageComments, deleted:true, published: false }});
    },

    'updatePagesData' : function (pageTitle, pageComments, selectedPages) {
        Pages.update(selectedPages, {$set: { title : pageTitle, content : pageComments }});
    },

    'crashPagesData' : function (selectedPages){
        Pages.remove(selectedPages);
    },

    'restorePagesData' : function (selectedPages){
        Pages.update(selectedPages, {$set: { deleted:false }});
    },


    'RePublishPagesData' : function (pageTitle, pageComments, selectedPages){
        Pages.update(selectedPages, {$set: { title : pageTitle, content : pageComments, published: true }});
    }

    // 'removePagesData': function(selectedPages){
    //     var currentUserId = Meteor.userId();
    //     Media.remove({_id: selectedPages, createdBy: currentUserId});
    // }
});