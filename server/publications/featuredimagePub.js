Meteor.publish('featuredimage', function () {
  return featuredimage.find();
});

Meteor.methods({
    'insertFeaturedImage': function (featuredImageUrl, selectPostId) {
         featuredimage.insert({url: featuredImageUrl,postId: selectPostId});
    },
});