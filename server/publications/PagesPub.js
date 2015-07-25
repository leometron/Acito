
Meteor.publish('Pages', function () {
    return Pages.find();
});


//Define all the methods interact with the PAGES object
Meteor.methods({

    'insertPagesData': function (title, content) {
        var currentUserId = Meteor.userId();
        Pages.insert ({
            title: title,
            content: content
            //  category_id: category_id,
            //   createdBy: currentUserId
        });

    },

    'updatePagesData' : function (pageTitle, pageComments, selectedPages) {
        Pages.update(selectedPages, {$set: { title : pageTitle, content : pageComments }});
    },

    'removePagesData': function(selectedPages){
        var currentUserId = Meteor.userId();
        Media.remove({_id: selectedPages, createdBy: currentUserId});
    }
});