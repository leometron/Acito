Meteor.publish('featuredimage', function () {
    var currentUser = this._id;
    return featuredimage.find();
});

Meteor.methods({
    'insertFeaturedImage': function (featuredImageUrl, selectPostId, userId) {
        featuredimage.insert({url: featuredImageUrl, postId: selectPostId, userId: userId});
    },
});