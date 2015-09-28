Meteor.publish('rating', function () {
  return rating.find();
});
