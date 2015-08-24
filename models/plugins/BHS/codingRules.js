codingRules = new Mongo.Collection('codingRules');

codingRules.attachSchema(
    new SimpleSchema({
    code: {
      type: String
    },
    guideline: {
      type: String
    },
    definition: {
      type: String
    }
  })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  codingRules.allow({
    insert : function () {
      return true;
    },
    update : function () {
      return true;
    },
    remove : function () {
      return true;
    }
  });
}
