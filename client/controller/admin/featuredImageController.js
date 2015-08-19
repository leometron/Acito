Template.featuredImage.rendered = function () {
    Session.set('errorImage', '');
    Session.set('selectFeaturedImage', '');
}


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
    'click #publishFeaturedImage': function () {
        if (!Session.get('selectFeaturedImage')) {
            Session.set('errorImage', 'Image is required');
        } else if ($('#pageId').val() == "none") {
            Session.set('errorImage', 'post title is required');
        } else {
            Session.set('errorImage', '');
            Session.set('sucessMessage', 'Featured Image Saved');
            Meteor.call('insertFeaturedImage', Session.get('selectFeaturedImage'), $('#pageId').val(), getUserName());
            Meteor.setTimeout(function () {
                Session.set('sucessMessage', ''), $('#pageId').val("none"), Session.set('selectFeaturedImage', ''), $('#selectFeaturedImage').val("")
            }, 2000);
        }
    }
});


Template.featuredImage.helpers({
    'postList': function () {
        return Posts.find();
    },
    'errorimg': function () {
        return Session.get('errorImage');
    },
    'successmsg': function () {
        return Session.get('sucessMessage');
    }
});