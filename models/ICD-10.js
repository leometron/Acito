ICD = new Mongo.Collection('ICD');

ICD.attachSchema(
    new SimpleSchema({
    sectionName: {
      type: String
    },
    sectionId: {
      type: String
    },
    code: {
      type: String
    },
    detail: {
      type: String,
    }
  })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  ICD.allow({
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
