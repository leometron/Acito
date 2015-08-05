Meteor.publish('featuredimage', function () {
  return featuredimage.find();
});
