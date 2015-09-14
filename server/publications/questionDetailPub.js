Meteor.publish('questionDetail', function () {
  return questionDetail.find();
});
