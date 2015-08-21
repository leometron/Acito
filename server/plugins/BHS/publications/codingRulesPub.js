Meteor.publish('codingRules', function () {
  return codingRules.find();
});
