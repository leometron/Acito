subSection = new Mongo.Collection('subSection');

subSection.attachSchema(
    new SimpleSchema({
    sectionId: {
      type: String
    },
    sectionName: {
      type: String
    },    
    subSectionName: {
      type: String
    }
  })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  subSection.allow({
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
